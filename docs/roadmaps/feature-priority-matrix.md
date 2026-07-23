# Feature Priority Matrix

Scoring model used for future work:

- `Priority score = ((Impacto + Valor profesional + Valor para usuario) * 1.5) / (Esfuerzo + Riesgo)`
- scale for each dimension: `1` to `5`
- relative size: `XS`, `S`, `M`, `L`, `XL`

Notes:

- rows include current state plus proposed future phase
- implemented items use `-` where prioritization is not relevant
- evidence paths are real code paths from the audited repos

| Funcionalidad | Estado actual | Evidencia | Frontend | Backend | DB | Socket | Impacto | Esfuerzo | Riesgo | Valor recruiter | Prioridad | Fase propuesta |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---|---|
| Refresh token flow completo | Implementada parcialmente | `social-app/src/controllers/userController.js`, `social-app-frontend/src/services/authStorage.js` | update auth/session hooks | new refresh/revoke endpoints | reuse `refresh_tokens` | no | 5 | 3 | 4 | 5 | Alta | Phase 0 |
| Ownership checks para posts/comments/reactions/avatar | Implementada con errores o riesgos | `social-app/src/controllers/postsController.js`, `commentsController.js`, `reactionsController.js`, `userController.js` | none | controller hardening | no new tables | no | 5 | 2 | 5 | 5 | Critica | Phase 0 |
| SQL artifacts o migrations reales | Documentada pero no encontrada en el codigo | backend README, no `*.sql` found | none | docs + migration discipline | yes | no | 5 | 3 | 4 | 5 | Alta | Phase 0 |
| Avatar upload end-to-end | Implementada con errores o riesgos | `social-app/src/router/imageRouter.js`, no frontend consumer | add avatar UI/service | fix handler/ownership | no | no | 3 | 2 | 3 | 4 | Media | Phase 0 |
| Error contract normalization | Implementada parcialmente | `social-app/src/middleware/errorHandler.js`, `notificationControllers.js` | minor error mapping updates | controller/AppError cleanup | no | no | 4 | 2 | 3 | 4 | Alta | Phase 0 |
| Edit post | No implementada | no endpoint/UI | form/edit state | patch endpoint | no | no | 4 | 3 | 2 | 4 | Alta | Phase 1 |
| Saved posts | No implementada | no table/route/UI | list + bookmark controls | CRUD endpoints | new table | no | 4 | 3 | 2 | 4 | Alta | Phase 1 |
| Pinned posts | No implementada | no field/route/UI | pin controls in profile/feed | patch endpoint | likely field or join table | no | 3 | 2 | 2 | 4 | Media | Phase 1 |
| Hashtags | No implementada | no parser/index/UI | render/search/filter UI | parse/query endpoints | new table/indexes | no | 4 | 3 | 3 | 4 | Alta | Phase 1 |
| Mentions | No implementada | only notification type exists | parser/highlight UI | parse/store/notify | likely relation table | optional | 4 | 4 | 3 | 5 | Alta | Phase 1 |
| Link previews | No implementada | no service/UI | preview cards | metadata fetch/proxy | optional cache table | no | 3 | 3 | 3 | 4 | Media | Phase 1 |
| Comment edit/delete | No implementada | no routes/UI | actions in comment list | endpoints + ownership | no | no | 3 | 2 | 2 | 3 | Media | Phase 1 |
| Comment reactions in frontend | Existe solamente en backend | `social-app/src/controllers/reactionsController.js` | new hook/UI | existing endpoints | existing tables | no | 3 | 2 | 2 | 3 | Media | Phase 1 |
| Message read state | No implementada | no `read_at` usage | unread UI/badges | endpoints/query updates | new column/index | optional | 4 | 3 | 3 | 4 | Alta | Phase 2 |
| Typing indicators | No implementada | no events | transient UI | none/minor | no | yes | 3 | 2 | 2 | 4 | Media | Phase 2 |
| Conversation mute | No implementada | no prefs model | settings UI | preference endpoints | new table/field | no | 2 | 2 | 2 | 3 | Baja | Phase 2 |
| Message attachments | No implementada | text-only messages | upload UI | file pipeline | media linkage | yes optional | 4 | 4 | 4 | 5 | Media | Phase 2 |
| Notification navigation targets | No implementada | `NotificationItem.jsx` has no links | clickable routing | enrich payload/query | maybe none | no | 4 | 2 | 2 | 4 | Alta | Phase 2 |
| Grouped notifications | No implementada | no grouping | grouped panel UI | aggregate query logic | no | optional | 3 | 3 | 3 | 4 | Media | Phase 2 |
| Notification preferences | No implementada | no prefs table | settings UI | CRUD prefs | new table | no | 3 | 3 | 2 | 4 | Media | Phase 2 |
| Public profile without auth | Implementada parcialmente | public page is still protected | route/public access review | profile auth review | no | no | 3 | 2 | 3 | 4 | Media | Phase 2 |
| Privacy settings | No implementada | no model | settings UI | auth/filter rules | new fields | optional | 4 | 4 | 4 | 4 | Media | Phase 3 |
| User blocking | No implementada | no table/route/UI | settings + chat/feed enforcement | block rules | new table | yes effects | 5 | 4 | 4 | 5 | Alta | Phase 3 |
| Content reports | No implementada | no routes/UI | report actions | moderation endpoints | new tables | no | 4 | 3 | 3 | 5 | Alta | Phase 3 |
| Moderation queue | No implementada | no admin surface | internal UI | admin endpoints | new tables/views | no | 3 | 4 | 4 | 5 | Media | Phase 3 |
| Feed mode selector (global/following) | Implementada parcialmente | service exists, no visible switch | small UI change | existing endpoints | no | no | 3 | 1 | 1 | 3 | Alta | Phase 3 |
| Search posts | No implementada | no endpoint/UI | search page/panel | query endpoints | indexes | no | 3 | 3 | 3 | 4 | Media | Phase 3 |
| Trends/topics | No implementada | no index/query/UI | discovery UI | aggregate queries | new indexes/tables | no | 3 | 4 | 3 | 4 | Media | Phase 4 |
| Transparent recommendations | No implementada | no recommendation reason fields | explanation UI | scoring metadata | maybe cache table | no | 4 | 4 | 4 | 5 | Media | Phase 4 |
| Onboarding/interests | No implementada | no interest model | onboarding flow | save preferences | new tables | no | 4 | 4 | 3 | 4 | Media | Phase 4 |
| Weekly prompt/challenge | No implementada | roadmap only | feed/card UI | content scheduling | optional tables | no | 3 | 2 | 2 | 4 | Media | Phase 4 |
| Profile progress | No implementada | no scoring model | progress UI | score endpoint | maybe none | no | 3 | 2 | 2 | 4 | Media | Phase 4 |
| Showcase 2.0 with DB diagram and API map | Implementada parcialmente | `/showcase` already exists | extend showcase sections | expose sanitized architecture data | diagram artifacts | no | 3 | 2 | 1 | 5 | Alta | Phase 5 |
| Demo credentials strategy | No implementada | showcase avoids public credentials | showcase UX | maybe demo seed docs | optional seed data | no | 2 | 2 | 2 | 4 | Baja | Phase 5 |
| Frontend unit/component tests | No implementada | no `*.test.*` files | test infra + core tests | none | no | no | 5 | 4 | 3 | 5 | Alta | Phase 6 |
| Backend HTTP integration coverage for social modules | No implementada | no post/comment/message/notification suites | none | new tests | test DB fixtures | no | 5 | 3 | 2 | 5 | Alta | Phase 6 |
| Real CI in `.github/workflows` | Implementada con errores o riesgos | workflow misplaced under `src/github/workflows` | lint/build job | test job | no | no | 4 | 2 | 1 | 5 | Alta | Phase 6 |
| DB indexes review | Implementada parcialmente | schema not versioned, heavy queries exist | none | query review | yes | no | 4 | 3 | 3 | 4 | Alta | Phase 6 |
| Structured health/readiness endpoints | Implementada parcialmente | `/` and `/api/monitoring/metrics` only | none | new monitoring routes | no | no | 3 | 2 | 2 | 4 | Media | Phase 6 |
| Feed virtualization | No implementada | no virtualization lib | list virtualization | none | no | no | 3 | 3 | 2 | 4 | Media | Phase 6 |
| Public collaborative posts | No implementada | roadmap only | composer/UI state | collaboration endpoints | new tables | optional | 4 | 5 | 4 | 5 | Media | Phase 7 |
| Reputation system | No implementada | roadmap only | score/badge UI | scoring services | new tables | optional | 4 | 5 | 4 | 5 | Media | Phase 7 |
| Skill evidence from projects/posts | No implementada | partial data basis exists (`user_projects`, `post_type`) | profile UI | aggregation endpoints | maybe joins/table | no | 4 | 4 | 3 | 5 | Alta | Phase 7 |
| Transparent collaborator search | No implementada | no collaborator discovery UI | search/filter UI | recommendation endpoints | indexes | no | 4 | 4 | 3 | 5 | Alta | Phase 7 |
| AI-assisted post improvement | No implementada | no AI integration | composer assist UI | AI service gateway | logs/quota tables optional | optional | 3 | 5 | 5 | 5 | Media | Phase 7 |

## Priority readout

Immediate high-value backlog:

1. ownership + auth hardening
2. missing SQL artifacts or migrations
3. refresh-token contract completion
4. edit/save/pin post set
5. notification navigation and grouping
6. frontend tests + real CI

Best portfolio multipliers after hardening:

1. collaborator-oriented search/discovery
2. skill evidence linked to projects and posts
3. showcase 2.0 with sanitized architecture and DB visualization
