# Admin scripts

## Email match results (US-2.021)

`send-match-emails.mjs` emails every matched participant their result through [Resend](https://resend.com). Each person gets **one** email listing all of their matches with each match's name, email, Instagram (if given) and compatibility score (if given).

It needs only Node 20.12+ and no npm packages.

### Input: matched-pairs CSV

The script reads the pairs CSV exported by the admin match run (US-3.011). Column order doesn't matter, and extra columns are ignored.

| Column | Required | Notes |
|:---|:---:|:---|
| `a_name`, `a_email` | yes | First person in the pair |
| `b_name`, `b_email` | yes | Second person in the pair |
| `a_instagram`, `b_instagram` | no | A leading `@` is optional |
| `score` | no | Compatibility percentage, 0–100 (e.g. `91.5`) |

If any row is invalid (missing field, bad email, self-match, non-numeric score), the script sends **nothing** and lists the bad lines.

See [`match-emails/sample-pairs.csv`](match-emails/sample-pairs.csv) for an example.

### Setup

```sh
cp scripts/.env.example scripts/.env   # then fill in RESEND_API_KEY and MATCH_EMAIL_FROM
```

| Variable | Required | Description |
|:---|:---:|:---|
| `RESEND_API_KEY` | yes | Resend API key with sending access |
| `MATCH_EMAIL_FROM` | yes | Sender, e.g. `My Flock <matches@yourdomain.com>`. The domain must be verified in Resend. |
| `MATCH_EMAIL_REPLY_TO` | no | Reply-to address |

`scripts/.env` is gitignored. These keys are server-side secrets, so never put them in a `VITE_*` variable.

Without a verified domain you can use `MATCH_EMAIL_FROM=My Flock <onboarding@resend.dev>`. In that mode Resend only delivers to your own Resend account's email and to its test inboxes such as `delivered@resend.dev`, which the sample CSV uses.

### Run

```sh
# Dry run (default): prints every email, sends nothing
node scripts/send-match-emails.mjs path/to/pairs.csv

# Send for real
node scripts/send-match-emails.mjs path/to/pairs.csv --send
```

- Sends are spaced out to stay under Resend's rate limit, and a `429` response is retried.
- A failure for one recipient doesn't stop the others. Failures are listed at the end, and the script exits with code 1.
- Each email has an idempotency key based on the recipient and their matches. If you re-run the same CSV within 24 hours, for example after fixing a failure, Resend won't send duplicates to people who already got their email.

### Tests

```sh
node --test scripts/
```
