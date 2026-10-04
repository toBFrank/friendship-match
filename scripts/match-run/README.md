# Manual match run (US-3.011)

Admin script that runs a match over a set of questionnaire submissions and exports the resulting pairs to CSV. Each participant gets at most one partner. Requires Node 20+ and has no dependencies.

```sh
# from the repo root
node scripts/match-run/run-match.js --input submissions.json --output pairs.csv

# try it with the bundled fake data
node scripts/match-run/run-match.js -i scripts/match-run/sample-participants.json -o pairs.csv
```

Leaving out `--output` writes `match-run-<UTC timestamp>.csv` to the current directory. A summary goes to stdout and lists anyone left unmatched (for example, the odd one out). Skipped records are reported as warnings on stderr.

## Input

The input is a JSON array with one object per submission. Field names match the questionnaire's frontend state (`QuestionnairePage.tsx`, `AccountFormData`):

```json
[
  {
    "id": "optional, defaults to email",
    "firstName": "Avery",
    "lastName": "Test",
    "email": "avery@example.com",
    "instagram": "@avery.test",
    "interests": [1, 3, 11],
    "personalityAnswers": [{ "questionId": 2, "likertValue": 4 }]
  }
]
```

- Emails are trimmed and lowercased. A record with no email is skipped, and so is any later record that repeats an email.
- Extra fields, such as `academic`, are ignored.

## Output

The CSV has these columns: `pair_number, score, user_a_id, user_a_first_name, user_a_last_name, user_a_email, user_a_instagram, user_b_id, …`. Rows are sorted by score, highest first.

- Scores fall between 0 and 1.
- Instagram handles are written without the leading `@`.
- If a text cell starts with `=`, `+`, `-` or `@`, it is prefixed with `'` so the spreadsheet does not run it as a formula.
- The exports contain personal data. `*.csv` is gitignored in this folder, so don't commit exports anywhere else either.

## How pairing works

1. Every pair of participants is scored.
2. Pairs are taken greedily, highest score first, skipping any pair where either person is already matched.
3. Ties are broken by participant id, so the same input always produces the same CSV.

## Known gaps

- **Scoring is a placeholder.** `lib/score.js` gives equal weight to interest overlap (Jaccard similarity) and Likert-answer closeness. The real algorithm is US-6.011 (#10). Replace `scoreParticipants` with it; it only needs to return a number in [0, 1].
- **Input comes from a JSON file, not the database.** There is no `questionnaire_responses` table or submission endpoint yet (US-1.013, #5). Once one exists, add a loader that turns its rows into the shape above.
- **Matches are not saved.** The `match` and `matchEvent` tables (US-2.023, #24) and the events feature (US-3.01) don't exist yet. Until they do, the CSV is the only record of a run.
- **Matching is one-to-one.** The PRD's admin-configurable "1–5 matches per user" belongs to match events (US-3.01).
