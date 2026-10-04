-- US-3.051: questionnaireTemplate + question tables.
--
-- A template is a named set of questions (e.g. "Standard", "Detailed") that an
-- admin can pick for a match event. Every template covers the four PRD sections:
-- Availability, Academic Background + Interests, Values + Personality, Course Schedule.

create table public.questionnaire_templates (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.questions (
  id            bigint generated always as identity primary key,
  template_id   bigint not null references public.questionnaire_templates (id) on delete cascade,
  -- Stable identifier used by the frontend and by questionnaire responses, e.g. 'academic.program'
  key           text not null,
  section       text not null check (
    section in ('availability', 'academic_interests', 'values_personality', 'course_schedule')
  ),
  -- Display order within the whole template (sections are ordered by their questions)
  position      integer not null check (position > 0),
  prompt        text not null,
  response_type text not null check (
    response_type in ('single_choice', 'multiple_choice', 'scale', 'free_text', 'lookup')
  ),
  -- Type-specific settings: choices, scale bounds/labels, lookup source, selection limits, scoring metadata
  options       jsonb not null default '{}'::jsonb,
  is_required   boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  unique (template_id, key),
  unique (template_id, position)
);

create index questions_template_id_section_idx on public.questions (template_id, section);

-- Templates and questions are public, read-only content. Writes go through the
-- service role (seeds, admin tooling), which bypasses RLS.
alter table public.questionnaire_templates enable row level security;
alter table public.questions enable row level security;

create policy "Questionnaire templates are readable by everyone"
  on public.questionnaire_templates for select
  using (true);

create policy "Questions are readable by everyone"
  on public.questions for select
  using (true);
