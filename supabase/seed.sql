-- US-3.051: Standard questionnaire template (10–15 questions, all 4 sections).
-- Safe to re-run: templates are upserted by slug and questions by (template_id, key).
--
-- Question content mirrors the current questionnaire UI (frontend/src/types/academic.ts,
-- frontend/src/components/ui/LikertScale.tsx, frontend/src/data/sample_personality.ts).

insert into public.questionnaire_templates (slug, name, description)
values (
  'standard',
  'Standard',
  'Quick questionnaire covering availability, academics and interests, personality, and course schedule.'
)
on conflict (slug) do update
  set name        = excluded.name,
      description = excluded.description,
      updated_at  = now();

insert into public.questions (template_id, key, section, position, prompt, response_type, options, is_required)
select t.id, q.key, q.section, q.position, q.prompt, q.response_type, q.options::jsonb, q.is_required
from public.questionnaire_templates t
cross join (values
  -- ── Availability ────────────────────────────────────────────────────────────
  ('availability.days', 'availability', 1,
   'Which days are you usually free to meet up?',
   'multiple_choice',
   '{"choices": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "min_selections": 1}',
   true),
  ('availability.times', 'availability', 2,
   'What times of day work best for you?',
   'multiple_choice',
   '{"choices": ["Morning", "Afternoon", "Evening", "Late night"], "min_selections": 1}',
   true),

  -- ── Academic Background + Interests ─────────────────────────────────────────
  ('academic.university', 'academic_interests', 3,
   'Which university do you attend?',
   'lookup',
   '{"source": "universities"}',
   true),
  ('academic.degree_level', 'academic_interests', 4,
   'What is your degree level?',
   'single_choice',
   '{"choices": ["Undergraduate", "Graduate"]}',
   true),
  ('academic.program', 'academic_interests', 5,
   'What program are you in?',
   'lookup',
   '{"source": "programs", "filter_by": "academic.degree_level"}',
   true),
  ('academic.year', 'academic_interests', 6,
   'What year of study are you in?',
   'single_choice',
   '{"filter_by": "academic.degree_level", "choices": [
      {"value": "1st Year",           "degree_level": "Undergraduate"},
      {"value": "2nd Year",           "degree_level": "Undergraduate"},
      {"value": "3rd Year",           "degree_level": "Undergraduate"},
      {"value": "4th Year",           "degree_level": "Undergraduate"},
      {"value": "5th Year+",          "degree_level": "Undergraduate"},
      {"value": "1st Year (Masters)", "degree_level": "Graduate"},
      {"value": "2nd Year (Masters)", "degree_level": "Graduate"},
      {"value": "1st Year (PhD)",     "degree_level": "Graduate"},
      {"value": "2nd Year (PhD)",     "degree_level": "Graduate"},
      {"value": "3rd Year+ (PhD)",    "degree_level": "Graduate"}
    ]}',
   true),
  ('interests.selected', 'academic_interests', 7,
   'Pick the interests and hobbies that describe you.',
   'lookup',
   '{"source": "interests", "multiple": true, "min_selections": 2, "max_selections": 10}',
   true),

  -- ── Values + Personality (one OCEAN item per trait, 4-point Likert) ────────
  ('personality.openness', 'values_personality', 8,
   'I enjoy trying out new cuisines and regularly eat food from different cultures.',
   'scale',
   '{"min": 1, "max": 4, "labels": ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"], "ocean": "O", "reversed": false}',
   true),
  ('personality.conscientiousness', 'values_personality', 9,
   'I tend to act on impulse without fully thinking things through.',
   'scale',
   '{"min": 1, "max": 4, "labels": ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"], "ocean": "C", "reversed": true}',
   true),
  ('personality.extraversion', 'values_personality', 10,
   'I strike up conversations with strangers easily.',
   'scale',
   '{"min": 1, "max": 4, "labels": ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"], "ocean": "E", "reversed": false}',
   true),
  ('personality.agreeableness', 'values_personality', 11,
   'I would rather use someone than be used.',
   'scale',
   '{"min": 1, "max": 4, "labels": ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"], "ocean": "A", "reversed": true}',
   true),
  ('personality.neuroticism', 'values_personality', 12,
   'I stay calm and composed under pressure.',
   'scale',
   '{"min": 1, "max": 4, "labels": ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"], "ocean": "N", "reversed": true}',
   true),

  -- ── Course Schedule ─────────────────────────────────────────────────────────
  ('schedule.courses', 'course_schedule', 13,
   'Which courses are you taking this term?',
   'lookup',
   '{"source": "courses", "multiple": true, "filter_by": "academic.program"}',
   false)
) as q (key, section, position, prompt, response_type, options, is_required)
where t.slug = 'standard'
on conflict (template_id, key) do update
  set section       = excluded.section,
      position      = excluded.position,
      prompt        = excluded.prompt,
      response_type = excluded.response_type,
      options       = excluded.options,
      is_required   = excluded.is_required,
      updated_at    = now();

-- Sanity check (PRD US-3.05): Standard has 10–15 questions and covers all 4 sections.
do $$
declare
  question_count integer;
  section_count  integer;
begin
  select count(*), count(distinct q.section)
    into question_count, section_count
  from public.questions q
  join public.questionnaire_templates t on t.id = q.template_id
  where t.slug = 'standard';

  if question_count not between 10 and 15 then
    raise exception 'Standard template must have 10-15 questions, found %', question_count;
  end if;
  if section_count <> 4 then
    raise exception 'Standard template must cover all 4 sections, found %', section_count;
  end if;
end $$;
