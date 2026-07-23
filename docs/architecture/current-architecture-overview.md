# Current Architecture Overview

## 1. Repositories

- frontend: `social-app-frontend`
- backend: `social-app`

## 2. Stack verified in code

Frontend:

- React
- Vite
- React Router
- Context API
- custom hooks
- CSS Modules
- Material UI
- Axios
- Socket.IO client

Backend:

- Node.js
- Express 5
- MySQL via `mysql2/promise`
- JWT
- bcrypt and bcryptjs
- Socket.IO
- Redis
- Cloudinary
- Multer
- Winston
- express-rate-limit
- Jest + Supertest

Detected but not actively used as architecture foundation:

- `sequelize` dependency is installed in backend package, but no active model/migration layer was found.

## 3. Frontend structure

Top-level frontend map:

```txt
src/
  components/
    auth/
    feed/
    layout/
    messages/
    notifications/
    showcase/
    ui/
    users/
  constants/
  context/
  hooks/
  routes/
  services/
  theme/
```

Observed architectural pattern:

- presentational UI in `components/*/components`
- page composition in `components/*/pages`
- async/business state in `components/*/hooks`
- network access in `components/*/services` plus `src/services/apiClient.js`
- response normalization in `utils/*Adapter`
- reusable texts and config in `src/constants`

Strengths:

- good feature modularity
- low prop drilling through auth/feed-refresh/notification contexts
- constants are genuinely used across modules

Weak spots:

- no frontend testing layer
- auth state is local-storage centric
- no shared query/cache layer such as React Query
- some flows still refetch instead of optimistic mutation management

## 4. Backend structure

Top-level backend map:

```txt
src/
  app.js
  server.js
  cache/
  config/
  controllers/
  middleware/
  monitoring/
  router/
  service/
  sockets/
  utils/
```

Observed architectural pattern:

- routes expose HTTP surface
- controllers perform validation and response orchestration
- services execute SQL and encapsulate domain logic
- middleware handles auth, request id, upload, rate limiting and global errors
- sockets mirror selected realtime workflows

Strengths:

- architecture by layers is clear enough
- auth/recovery/google modules are more disciplined than older code
- global error handler and `AppError` exist

Weak spots:

- authorization rules are not enforced consistently
- SQL is spread across controllers and services with no migration discipline
- some older controllers still mix direct query logic and orchestration
- cache and monitoring are minimal

## 5. HTTP and socket flow

### Auth flow

```txt
User
  -> Login/Register/Google/Forgot Password form
  -> frontend auth hook
  -> auth service
  -> Axios apiClient
  -> backend route/controller
  -> DB + auth helper service
  -> JSON response
  -> AuthContext + localStorage update
```

### Feed flow

```txt
User
  -> FeedPage
  -> useFeed
  -> feedService
  -> GET /api/follows/feed or /api/posts/allpost
  -> followsService/postsService
  -> MySQL
  -> posts payload
  -> PostList/PostCard render
```

### Messaging realtime flow

```txt
User action
  -> useMessages / messagesSocketService
  -> socket.io /messages
  -> authenticateSocket
  -> membership validation
  -> message insert
  -> optional notification create
  -> emit messages:new to room
  -> frontend merges message into thread and conversation list
```

### Notifications flow

```txt
Backend domain event
  -> createNotification()
  -> insert notifications row
  -> emit notification:new + notification:count
  -> NotificationContext receives socket event
  -> panel badge and list update
```

## 6. Route surface

Backend router files reviewed: `9`  
Declared backend endpoints reviewed: `42`

Key route groups:

- `/api/auth`
- `/api/posts`
- `/api/comments`
- `/api/reactions`
- `/api/follows`
- `/api/image`
- `/api/conversations`
- `/api/notifications`
- `/api/monitoring`

Frontend route groups:

- `/`
- `/showcase`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/feed`
- `/messages`
- `/profile`
- `/profile/:userId`

## 7. Data model inferred from code

Tables found:

- `users`
- `posts`
- `comments`
- `follows`
- `post_reactions`
- `comment_reactions`
- `notifications`
- `refresh_tokens`
- `password_reset_tokens`
- `conversations`
- `conversation_users`
- `messages`
- `user_projects`

Main relationships:

```txt
users
  -> posts
  -> comments
  -> follows (follower_id, followed_id)
  -> notifications
  -> refresh_tokens
  -> password_reset_tokens
  -> user_projects

posts
  -> comments
  -> post_reactions

comments
  -> comment_reactions
  -> optional parent_comment_id

conversations
  -> conversation_users
  -> messages
```

Missing from a maintainable DB workflow:

- migrations
- versioned SQL scripts actually present in repo
- index documentation

## 8. Security and contract notes

Healthy areas:

- auth middleware exists
- rate limiting exists
- request ids exist
- helmet exists
- CORS is centralized
- socket auth exists

Risk areas:

- some endpoints trust path user ids instead of authenticated user id
- resource ownership checks are incomplete
- notification controllers use inconsistent `AppError` properties
- refresh-token lifecycle is incomplete

## 9. Observability and performance

Frontend:

- local observability buffer: `src/services/observability.js`
- web vitals observers: `src/services/webVitals.js`
- lazy route loading and deferred sidebars

Backend:

- minimal counters at `/api/monitoring/metrics`
- Winston file logger
- Redis-backed or memory-backed rate limit
- Redis-based cache helper with an implementation defect in `getCache()`

## 10. Summary architecture judgement

The project has a credible full-stack architecture for a personal social product and portfolio. The main structural issue is not lack of modules; it is uneven maturity between newer modules and older CRUD endpoints. The next architectural move should be contract hardening and security normalization, not feature expansion.
