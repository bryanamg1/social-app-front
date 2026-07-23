# Product Evolution Roadmap

## 1. Planning principle

The roadmap below intentionally does **not** preserve the original conceptual order from the prompt.

Reason:

- the project already shipped parts of "Showcase", "Identity" and "Quality"
- the highest remaining risk is not missing features, but contract/security inconsistency
- later product differentiation will be unreliable until the current backend surface is hardened

Recommended order therefore starts with hardening, then completes the social core, then expands discovery/differentiation.

## 2. Recommended phases

## Phase 0 - Security and contract hardening

Objective:

- remove critical authorization risks
- normalize endpoint contracts
- restore missing DB artifacts

Problems solved:

- spoofable authorship and reactions
- post deletion without ownership checks
- broken avatar upload handler
- refresh-token dead-end
- README/schema drift

Included:

- backend ownership checks for posts, comments, reactions, avatar upload
- protect or remove unsafe `POST /api/notifications/notification`
- normalize `AppError` usage in notification controllers
- decide refresh strategy: implement refresh endpoint and client flow, or remove refresh persistence
- recreate/version missing SQL scripts or move to migrations

Excluded:

- new social features
- UI redesign
- new recommendation logic

Probable modules:

- backend: `src/controllers/postsController.js`, `commentsController.js`, `reactionsController.js`, `userController.js`, `notificationControllers.js`, `router/*.js`, `service/authSessionService.js`
- frontend: `src/services/apiClient.js`, auth hooks/services if refresh is implemented

DB changes:

- likely no schema redesign beyond missing artifacts and maybe refresh cleanup

Validation:

- backend auth/authorization integration tests
- frontend auth regression smoke

Relative size:

- `M`

Portfolio value:

- very high, because it upgrades the project from demo-grade to defensible engineering

## Phase 1 - Complete the social core

Objective:

- complete the expected social product basics around posts and comments

Included:

- edit post
- saved posts
- pinned posts
- comment delete/edit
- comment reactions in frontend
- feed mode selector: global vs following

Excluded:

- privacy
- moderation
- advanced recommendation

Dependencies:

- Phase 0 complete

Modules likely affected:

- frontend feed/profile components, hooks and constants
- backend posts/comments/reactions routes and services

DB:

- saved posts storage
- pin metadata

Tests:

- backend integration tests for new CRUD
- first frontend component tests around composer/post card/actions

Relative size:

- `L`

Visible recruiter result:

- more complete X-like baseline and stronger CRUD depth

## Phase 2 - Messaging and notification maturity

Objective:

- make direct messaging and notifications feel product-ready

Included:

- message read state
- typing indicators
- notification deep-links
- grouped notifications
- notification preferences
- public profile access review outside authenticated shell

Excluded:

- file attachments if Phase 2 scope must stay moderate

Dependencies:

- Phase 0

Modules likely affected:

- frontend: `messages`, `notifications`, routes, constants
- backend: conversations/messages services, notification service/socket
- DB: read-state fields and preferences table if chosen

Socket changes:

- add typing events
- optional read-state events

Relative size:

- `L`

Visible recruiter result:

- stronger realtime story beyond simple chat delivery

## Phase 3 - Trust, privacy and moderation

Objective:

- add platform trust controls before growth-oriented discovery

Included:

- block users
- privacy settings
- content reports
- moderation queue foundations

Excluded:

- full admin product polish

Dependencies:

- Phase 0
- ideally Phase 2 for notification side-effects

Modules likely affected:

- backend auth/follows/messages/feed filters
- frontend settings, profile and reporting UI
- DB: block/report/privacy preference tables

Relative size:

- `L`

Visible recruiter result:

- demonstrates security/product judgment, not only feature shipping

## Phase 4 - Discovery and engagement

Objective:

- move from a basic social graph to intentional discovery

Included:

- search posts
- trends/topics
- onboarding goals and interests
- profile progress
- weekly prompts/challenges
- transparent recommendation reasons

Excluded:

- AI assistance

Dependencies:

- Phases 0 and 3 strongly recommended

Relative size:

- `L`

Visible recruiter result:

- shows product thinking and ranking/discovery design

## Phase 5 - Showcase 2.0

Objective:

- convert the existing `/showcase` into a stronger recruiter-grade artifact

Problem solved:

- current showcase is already useful, but it still lacks DB diagram, endpoint map, explicit risk log and sanitized architecture assets

Included:

- current architecture diagram
- DB relationship diagram
- endpoint inventory
- deploy topology
- testing/quality evidence
- solved-issues case studies
- roadmap + changelog integration

Excluded:

- public demo credentials until a safe seed/demo strategy exists

Dependencies:

- Phase 0 because architecture claims should be defensible

Modules likely affected:

- frontend showcase feature
- docs assets

Relative size:

- `S`

Visible recruiter result:

- immediate portfolio lift

## Phase 6 - Professional quality system

Objective:

- add safety rails and measurable engineering quality

Included:

- frontend unit/component tests
- backend integration coverage for social modules
- real CI under `.github/workflows`
- DB index review
- health/readiness endpoints
- optional feed virtualization and further performance passes

Excluded:

- net-new social features

Dependencies:

- none strict, but Phase 0 first

Relative size:

- `L`

Visible recruiter result:

- turns the app from a strong demo into a maintainable engineering sample

## Phase 7 - Differentiation layer

Objective:

- build the product identity that differentiates Social App from a generic X clone

Included:

- skill evidence linked to projects/posts
- collaborator-oriented discovery
- public collaborative posts
- reputation signals
- optional AI-assisted post improvement

Excluded:

- anything that still depends on unresolved Phase 0/6 quality issues

Dependencies:

- Phases 0, 4 and 6 are strongly recommended first

Relative size:

- `XL`

Visible recruiter result:

- unique product narrative with stronger full-stack depth

## 3. Acceptance criteria by phase

Phase 0 is complete when:

- route param spoofing paths are closed
- post delete validates ownership
- avatar upload works end-to-end
- notification error handlers use the standard error contract
- README/schema drift is removed
- refresh strategy is explicit and tested

Phase 1 is complete when:

- users can edit, save and pin posts
- comments support edit/delete
- all new CRUD has backend tests

Phase 2 is complete when:

- messaging has at least read state or typing
- notifications are actionable
- realtime error states are clearer

Phase 3 is complete when:

- a user can block/report and the feed/chat respect those rules

Phase 4 is complete when:

- discovery and onboarding are explainable and measurable

Phase 5 is complete when:

- `/showcase` is genuinely recruiter-ready and technically trustworthy

Phase 6 is complete when:

- frontend tests exist
- backend social flows have real integration coverage
- CI runs automatically from the correct path

Phase 7 is complete when:

- the app demonstrates a differentiated social product, not just a cloned baseline

## 4. Recommended immediate next move

Start with `Phase 0 - Security and contract hardening`.

This is the most defensible next step for both user value and professional value.
