_**Owner(s):** Franco Bonilla, Tasmiah Jasmine Hasan_  \
_**Published:** 2026/05/14_  \
_**Updated:** N/A_  \
_**Version:** v0.1_

***

# 1. Project Overview INC

## 1.1 Description
Flocker (working name) is a social app built for the purpose of helping university students discover friendships based on personality, interests, ideology, and academic background. What makes Flocker different from existing social apps is that it is meant to operate within a single university campus making friendships using an advanced matching algorithm.
### Goals
| ID | Goal | Status |
|:---:|:---|:---:|
| G1 | Reach 500 students (1% of students) on pilot campus (University of Alberta) within 16 weeks of launch (Sep - Dec, Fall 2026), measured by the count of university-email-verified profiles in user database. |  |
| G2 | Show 10%+ improvement in average loneliness score for active (5+ app sessions) users in the first term of launch, measured by 3-item UCLA Loneliness Scale survey that is shown at onboarding and again at week 12. |  |
| G3 | Build 50+ meaningful and lasting social connections for university students in the first term of launch, measured by unmatching rate, chat activity, self-report of in-person meetings, and completion of tasks together. |  |

## 1.2 Stakeholders
| Stakeholder | Role | Interest |
|:---|:---|:---|
| Owner/Admin | Franco Bonilla, Tasmiah Jasmine Hasan | Defines vision, prioritizes features, owns roadmap. |
| Developer | Franco Bonilla, Tasmiah Jasmine Hasan | Builds and maintains the app. |
| University Student/User | Primary end user | Finds friends and uses platform. |
| Friends Across Campus/Campus Organization | Distribution partners | Shares app with networks. |
| University Admin | Institutional partner/gatekeeper | Allows access, provides policies, endorses app. |
| Investors | Future stakeholders | ROI, scalability to other campuses, monetization. |
| Data Privacy Regulator | Compliance stakeholder | PIPEDA compliance (Canada). |

## 1.3 Assumptions
| ID | Assumption | Risk |
|:---:|:---|:---|
| A1 | App will launch at one campus before expansion. | MVP not built for multi-campuses (Scope Creep). |
| A2 | Users will use university emails. | Safety concerns from fake accounts. |
| A3 | A minimum of 100 users is enough for the matching algorithm to work effectively. | Below 100 users, users will see the same profiles and churn. |
| A4 | MVP will be ready within 3 months of development start. | App not ready for Fall 2026 release. |
| A5 | Users are willing to share the minimum info without feeling surveilled. | Privacy concerns from desired info. |

## 1.4 User Stories (MoSCoW)
| ID | Story | Summary | Priority |
|:---:|:---|:---:|:---:|
| US-1.01 | As a **new user**, I want to **give info about myself**, so that I can **match with compatible people**. | Questionnaire | Must Have |
| US-1.02 | As a **new user**, I want to **create a verified account**, so that I can **save my info and matches within my university**. | Account Creation | Should Have |
| US-1.03 | As a **new user**, I want to **delete my account**, so that I can **remove myself and my info from the app**. | Account Deletion | Should Have |
| US-1.04 | As a **user**, I want to **update my profile**, so that I can **give my matches context on me**. | Profile Details | Could Have |
| US-2.01 | As a **user**, I want to **know when the next match is happening**, so that I can **anticipate it and participate in it**. | Event Anticipation | Would Like But Won't Get |
| US-2.02 | As a **user**, I want to **get matches during an event**, so that I can **see who I am compatible with**. | Receiving Matches | Must Have |
| US-2.03 | As a **user**, I want to **see explicitly what we are compatible in**, so that I can **start a conversation and have trust in the algorithm**. | Compatibility Summary | Could Have |
| US-2.04 | As a **user**, I want to **unmatch with certain people**, so that I can **keep my matches to people that I like**. | Unmatching | Should Have |
| US-3.01 | As an **admin**, I want to **create match events**, so that I can **start matching by event**. | Create Match Events | Must Have |
| US-3.02 | As an **admin**, I want to **edit/delete match events**, so that I can **be adaptable to changes**. | Update Match Events | Must Have |
| US-3.03 | As an **admin**, I want to **see a dashboard of engagement metrics**, so that I can **track data and make decisions based off of it**.  | Analytics Dashboard | Could Have |
| US-3.04 | As an **admin**, I want to **review reported users**, so that I can **choose what happens to them**. | Review Reported Users | Could Have |
| US-3.05 | As an **admin**, I want to **have different questionnaires with varying specificity**, so that I can **start matching immediately without having to think of my own questions**. | Questionnaire Types | Must Have |
| US-3.06 | As an **admin**, I want to **edit the questionnaire and add my own questions**, so that I can **tailor it according to my needs**. | Questionnaire Editing | Would Like But Won't Get |
| US-4.01 | As a **user**, I want to **chat with my matches**, so that I can **we can get to know each other**. | Messaging | Could Have |
| US-4.02 | As a **user**, I want to **have icebreaker prompts in my chats**, so that I can **start a low-pressure conversation**. | Icebreaker Prompts | Would Like But Won't Get |
| US-4.03 | As a **user**, I want to **move our chat to another platform**, so that I can **stay in touch once we've connected**. | Share External Contact | Must Have |
| US-4.04 | As a **user**, I want to **complete tasks with my matches**, so that I can **have specific milestones/ideas to grow our friendship**. | Friendship Tasks | Should Have |
| US-5.01 | As a **user**, I want to **report users that make me uncomfortable**, so that I can **trust the platform to be a safe space**. | Reporting a User | Should Have |
| US-5.02 | As a **user**, I want to **block a match**, so that I can **be unreachable and invisible to them**. | Blocking a User | Should Have |
| US-6.01 | As a **product owner**, I want the **algorithm to be self-reflective**, so that I can **have match quality improve based on data**. | Algorithm Tuning | Could Have |


# 2. Requirements INC

## 2.1 Functional Requirements
### Feature 1: Onboarding & Profile
- US-1.01
  - Questionnaire is divided into clearly labeled sections: Availability, Academic Background + Interests, Values + Personality, Course Schedule
  - Academic Background + Interests must be completed before the user can receive matches
  - User can save progress and return without losing answers
  - Estimated completion time is displayed at the start (target: under 8 minutes)
  - Responses are stored securely and linked to the user's verified account
  - User is notified that answers can be updated later, and that updates affect future match cycles
- US-1.02
  - User registers using a @ualberta.ca email address
  - A verification link is sent to that email within 60 seconds of registration
  - Unverified accounts cannot access any app features beyond the registration screen
  - Verification link expires after 24 hours; user can request a new one
  - If the email domain is not whitelisted, a clear message is shown: "Flocker isn't at your university yet"
  - Each email address can only be associated with one active account
- US-1.03
  - Account deletion is accessible from the settings menu
  - User is shown a confirmation screen clearly stating what will be deleted (profile, matches, chat history)
  - Deletion is permanent and cannot be undone — user must type "DELETE" to confirm
  - All personal data is purged from the database within 30 days of deletion request per PIPEDA requirements
  - Matched users are not notified of the deletion; the chat thread disappears from their view
  - The associated university email is not blocklisted (user can re-register if they choose)
- US-1.04
  - All profile fields (photo, bio, questionnaire answers) are editable from a profile settings screen
  - Bio has a 150-character limit with a live character counter
  - At least 1 photo is required; up to 3 photos can be uploaded
  - Changes to questionnaire answers trigger a re-run of compatibility scoring at the next match cycle
  - User is shown a banner: "Your answers have been updated — new scores apply at the next match event"
  - Photo uploads are moderated for inappropriate content before going live
### Feature 2: Match Events & Discovery
- US-2.01
  - A countdown timer on the home screen shows days/hours/minutes until the next match event
  - Push notification sent 24 hours before and again at the moment of release
  - Users must opt-in to the match when the match event opens
  - Notification preferences are configurable in settings (user can opt out of reminders)
- US-2.02
  - Each match event delivers 1–5 profiles per user (number configurable by admin)
  - Each match card displays: photo, first name, year, major, faculty, and compatibility highlights
  - User has 24 hours to start a conversation or receive a message, otherwise they are unmatched
  - If only one user chats, an extension of 12 hours is added
- US-2.03
  - 2–4 compatibility highlights shown per match (e.g. "Both night owls", "Same faculty", "Both listed hiking")
  - Highlights are generated from all questionnaire dimensions: interests, schedule, personality, values, academic background
  - Exact numerical compatibility score is displayed to users ("99.99% Match", etc. )
  - No highlight references a protected characteristic directly — ideology/values shown only as "Similar values outlook", never the specific belief
  - Highlights appear on the match card and persist as a header in the chat thread
- US-2.04
  - Unmatch option is accessible from the chat thread within 2 taps
  - User is shown a confirmation prompt before unmatching is finalized
  - The unmatched user is not notified; the chat thread disappears from both users' views
  - Unmatched profiles do not reappear in future match events for a minimum of 6 months
  - Unmatching is logged anonymously for analytics (used as a match quality signal for Goal 3)
### Feature 3: Admin Tools
- US-3.01
  - Admin can create a match event by specifying: event name, date/time, and number of matches per user
  - Event is saved and the matching algorithm is queued to run ahead of the release time
  - Admin can track the number of participants
  - Events can be set as recurring (weekly / biweekly / monthly) or one-time
- US-3.02
  - Admin can edit any scheduled (not yet released) event: name, date, time, matches per user
  - Admin can delete a scheduled event; users already notified receive a cancellation push notification
  - Events that have already been released cannot be edited, only future events are modifiable
  - All edits and deletions are logged with a timestamp and the admin's username for audit purposes
  - A confirmation prompt is shown before any deletion: "This will cancel the event and notify affected users"
- US-3.03
  - Dashboard displays: total verified users, DAU/MAU, match acceptance rate, message rate (% of matches with 2+ messages sent), unmatch rate, "We Met" confirmation rate, report volume
  - All metrics are filterable by date range
  - Cohort retention chart shows D1 / D7 / D30 retention by signup week
  - Goal progress bars shown for G1 (verified users), G2 (loneliness score improvement), G3 (meaningful connections)
  - Dashboard accessible only to verified admin accounts
  - Data refreshes every 24 hours; near real-time not required at MVP
- US-3.04
  - Flagged accounts appear in an admin queue, sorted by number of reports (highest first)
  - Admin can view the reported messages and user profile without the reported user being notified
  - Actions available: Warn (in-app message sent to user), Suspend (temporary lockout, duration set by admin), Ban (permanent removal)
  - Three or more reports against one account automatically elevates it to the top of the review queue
  - All admin actions are logged: action taken, timestamp, admin username, reason
  - Banned user's university email is blocklisted to prevent re-registration
- US-3.05
  - At least 2 pre-built templates available at launch: Standard (10–15 questions) and Detailed (20–25 questions)
  - Admin selects the active questionnaire template before a match event is created
  - Each template covers all sections: Availability, Academic Background + Interests, Values + Personality, Course Schedule
  - Template selection is locked once a match event is published, cannot be changed mid-cycle
  - Admin can preview any template before activating it
  - Users are given the option to edit their questionnaire if it was previously submitted for a prior event
- US-3.06
  - Admin can add custom questions to any existing template
  - Admin can reorder, hide, or remove questions from a template
  - Custom questions support multiple response types: multiple choice, scale (1–5), free text
  - Template can be reset
### Feature 4: Messaging & Connection
- US-4.01
  - Supports text messages; no media sharing at MVP
  - User receives a push notification for each new message (configurable in settings)
  - Messages are stored server-side and persist across sessions
  - Chat thread displays the compatibility highlights header from the match card
  - If a user deletes their account, their messages are replaced with "This user is no longer available"
- US-4.02
  - 3 icebreaker suggestions from random question bank
  - Tapping a prompt pre-fills the message input field; user must manually send
  - Prompts can be refreshed once for a new set
  - Prompts disappear automatically after the first message is sent by either user
- US-4.03
  - Contacts for user are visible on their profile
- US-4.04
  - Each chat thread includes a goals tab with 10+ activities to complete (e.g. "Grab coffee at SUB", "Study together at Cameron Library", "Attend a campus event", "User 1 does a favour for User 2", "Do a tedious task together (e.g. groceries)", "Hang out without spending money")
  - Match score increases with activity completion
  - Activities only completed when both users mark it as complete, and attach an image as proof
  - Optional captioning for images
  - Completed activities are logged as a meaningful connection signal for Goal 3 analytics
  - Users can suggest a custom activity (free text, 80-char limit)
### Feature 5: Safety & Reporting
- US-5.01
  - Report option is accessible from any chat thread or profile view within 2 taps
  - Report categories: Inappropriate messages, Fake profile, Harassment, Other
  - Optional free-text description field (300-character limit)
  - Reported user is never notified of the report
  - Reporting user receives an in-app acknowledgement: "We've received your report and will review it within 24 hours"
  - Three or more reports against one account automatically flags it for priority admin review (ties to US-3.04)
- US-5.02
  - Block option is accessible from the profile view
  - Blocking immediately removes the chat thread from both users' views
  - Blocked user cannot appear in future match events for the blocker forever
  - The blocked user receives no notification and sees no indication they have been blocked
  - Block is reversible from settings, but chat history is not restored upon unblocking
  - Every block automatically logs a soft report for admin monitoring purposes
### Feature 6: Match Algorithm
- US-6.01
  - Algorithm should be able to pull data based on match success and current weights
  - Algorithm adjusts with on its own
  - Algorithm has threshold values for every category


## 2.2 Non-Functional Requirements
### Performance: Response times, throughput, transaction rates, etc.
???
### Scalability: Horizontal/vertical scaling needs.
???
### Security: Authentication, authorization, encryption, etc.
???
### Reliability: Expected uptime, disaster recovery, failover systems.
???
### Maintainability: Codebase standards, dependency management.
???


# 3. System Architecture INC

## 3.1 Architecture Diagram
### Presentation Layer
### Business Layer
### Persistence Layer
### Database Layer

## 3.2 Tech Stack
<img width="280" height="442" alt="my-stack-diagram" src="https://github.com/user-attachments/assets/565d9c4d-b8c6-4b65-afb3-9044eccc55ae" /> \
<img width="311" height="174" alt="my-stack" src="https://github.com/user-attachments/assets/fcc81c60-df89-42d3-84ac-d7604b6de43b" />
### Frontend
- TypeScript
- React (JS Library)
- Tailwind (CSS Framework)
- Base UI (Component Library)
### Backend
- Ruby on Rails 8
  - API Mode
    - Active Record (ORM)
  - Devise, devise-jwt (Authentication)
### Database
- PostgreSQL
  - pg_cron (Scheduling algorithm runs)
  - Unlogged tables (caching for messaging)
### Compute/Hosting
- Railway
### Storage
- Cloudflare R2
### Analytics
- PostHog (Product)
- Google Analytics (Web)
### Transactional Email
- Resend
### CI/CD
- GitHub Actions

# 4. Module Design INC

# 5. Database Design INC

# 6. API Design INC

# 7. Security Design INC

# 8. Deployment Architecture INC

# 9. Testing Strategy INC

# 10. Maintenance and Monitoring INC

# 11. Backup and Recovery INC

# 12. Risks and Mitigation INC

# 13. Future Enhancements INC
