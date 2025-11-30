import uuid


class Person:
    def __init__(self, answers:dict):
        self.id = uuid.uuid4()
        self.answers = answers

    def get_answer(self, key:str, default=None):
        return self.answers.get(key, default)
    
    def __repr__(self):
        return f"Person(id={self.id}, attributes={self.answers})"