from typing import Dict, List, Any
from src.utils.types import Person

class MatchAlgorithm:
    def __init__(self, group_size:int=2, questions_config:Dict[str, Dict[str, Any]]=None):
        self.group_size = group_size
        self.questions_config = questions_config or {}

    def build_score_matrix(self, people: List[Person]) -> Dict[tuple, float]:
        '''
        Build a score matrix for all pairs of people.

        Base: Computes scores for each unique pair.
        '''
        scores = {}

        for i in range(len(people)):
            for j in range(i + 1, len(people)):
                person1 = people[i]
                person2 = people[j]
                score = self.score(person1, person2)
                scores[(person1.id, person2.id)] = score

        return scores

    def score(self, person1:Person, person2:Person) -> float:
        '''
        Calculate and return a compatibility score between two people.
        
        Base: Compatibility score is calculated based on weighted answers and maximizing/minimizing similarity.
              Maximum score is 1.00, minimum is 0.00.
              Weight of all questions should sum to 1.00, and each question's weight contributes proportionally (0.01 to 1.00).
              Questions can either maximize similarity (same answers) or minimize similarity (different answers).
              Question types - multiple choice, scale (1-5), boolean.
        '''
        score = 0.0

        for question, config in self.questions_config.items():
            p1_ans = person1.get_answer(question)
            p2_ans = person2.get_answer(question)
            if p1_ans is None or p2_ans is None:
                continue

            weight = config.get("weight", 0.10)
            want_similar = config.get("want_similar", True)
            q_type = config.get("type", "scale")

            similarity = 0.00
            if q_type == "multiple_choice":
                # treat as boolean, where same = 1.00, different = 0.00
                similarity = 1.00 if p1_ans == p2_ans else 0.00
            elif q_type == "boolean":
                similarity = 1.00 if p1_ans == p2_ans else 0.00
            elif q_type == "scale":
                difference = abs(p1_ans - p2_ans)
                similarity = 1.00 - (difference / 4.00)  # assuming scale is 1-5

            if want_similar:
                score += weight * similarity
            else:
                score += weight * (1.00 - similarity)

        return score
    
    def match(self, people:List[Person]) -> List[List[Person]]:
        '''
        Match people into groups based on compatibility scores.
        
        Base: Greedy matching algorithm
              Group highest scoring pairs first.
              Then fill in remaining people by pairing them with the next best match repeatedly.
        '''
        groups = []

        if len(people) < self.group_size:
            return [people]
        
        scores = self.build_score_matrix(people)
        sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True) 
        unmatched = people.copy()

        while len(unmatched) >= self.group_size:
            if len(unmatched) == self.group_size:
                groups.append(unmatched)
                break
            
            group = []
            # 1. Start group with highest scoring pair
            # - From unmatched people, find highest scoring pair
            # - If found an unmatched pair, create new group with them and remove from unmatched
            # - Else, create groups from whoever are left based on size
            for (p1_id, p2_id), _ in sorted_scores:
                p1 = next((p for p in unmatched if p.id == p1_id), None)
                p2 = next((p for p in unmatched if p.id == p2_id), None)
                if p1 and p2:
                    group.extend([p1, p2])
                    break
            if len(group) == 0:
                group = unmatched[:self.group_size]
                unmatched = unmatched[self.group_size:]
                continue

            # 2. Fill in reamining spots in group
            # - Find next best match for all people in existing group members
            while len(group) < self.group_size:
                best_person = None
                best_score = -1.00

                for person in unmatched:
                    if person in group:
                        continue

                    current_score = sum(
                        scores.get((min(member.id, person.id), max(member.id, person.id)), 0.00)
                        for member in group
                    )

                    if current_score > best_score:
                        best_score = current_score
                        best_person = person

                group.append(best_person)

            # 3. Remove grouped people from unmatched
            for person in group:
                unmatched.remove(person)
                

        return groups