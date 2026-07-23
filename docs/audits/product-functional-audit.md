# Product Functional Audit

## 1. Executive summary

Audit date: 2026-07-23  
Scope:

- frontend repo: `social-app-frontend`
- backend repo: `social-app`

Operational verification executed during the audit:

- frontend: `npm run lint` -> OK
- frontend: `npm run build` -> OK
- backend: `npm test -- --runInBand` -> OK (`13` suites, `49` tests)

Current product state:

- The social core exists and is usable: auth, feed, comments, post reactions, follows, direct messages, notifications, profile editing, public-profile-like route inside the authenticated shell, password recovery, Google Sign-In, showcase route.
- Several features are present only as a first iteration and are not yet product-complete.
- The largest current risks are backend authorization gaps, inconsistent error contracts, missing SQL artifacts promised by README, and missing CI/frontend test coverage.

Primary recommendation:

- Do not open new product work before a hardening phase focused on authorization, endpoint consistency, avatar upload, notification error handling, missing SQL artifacts, and refresh/session strategy.

## 2. General product status

Strengths:

- Clear feature-based frontend structure with centralized constants: `social-app-frontend/src/components`, `social-app-frontend/src/constants`
- Layered backend structure with routers/controllers/services: `social-app/src/router`, `social-app/src/controllers`, `social-app/src/service`
- Working realtime base for messages and notifications via Socket.IO
- Observable progress on product differentiation: `/showcase`, `post_type`, `user_projects`, suggestion enrichment, basic web vitals instrumentation

Current blockers:

- Sensitive backend endpoints trust route params instead of authenticated user in multiple places
- Deletion of posts is authenticated but not ownership-protected
- Avatar upload handler uses `db` without initialization
- Notification controllers instantiate `AppError` with `statusCode` instead of `status`
- Refresh tokens are created and stored, but there is no refresh endpoint or frontend consumption
- README references SQL scripts that are not present in the repository

## 3. Functional audit matrix

Status vocabulary used exactly as requested:

- `Implementada y funcional`
- `Implementada parcialmente`
- `Implementada con errores o riesgos`
- `Existe solamente en frontend`
- `Existe solamente en backend`
- `Documentada pero no encontrada en el codigo`
- `No implementada`
- `No fue posible verificar`

### 3.1 Auth and users

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Registro | Implementada y funcional | `social-app/src/router/user.js`, `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/auth/hooks/useRegister.js` | Backend crea usuario y frontend consume el flujo. |
| Login tradicional | Implementada y funcional | `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/auth/hooks/useLogin.js` | Devuelve `accessToken` y `refreshToken`; frontend persiste solo access token. |
| Logout | Implementada y funcional | `social-app-frontend/src/context/AuthContext.jsx`, `social-app-frontend/src/services/authStorage.js` | Solo cliente; limpia storage local. |
| Persistencia de sesion | Implementada y funcional | `social-app-frontend/src/services/authStorage.js`, `social-app-frontend/src/context/AuthContext.jsx` | Basada en `localStorage`. |
| JWT access token | Implementada y funcional | `social-app/src/middleware/auth.js`, `social-app/src/utils/token.js`, `social-app-frontend/src/services/apiClient.js` | Interceptor agrega `Authorization`. |
| Refresh tokens | Implementada parcialmente | `social-app/src/controllers/userController.js`, `social-app/src/service/authSessionService.js` | Se crean y almacenan en `refresh_tokens`, pero no hay endpoint de refresh/revoke ni uso en frontend. |
| Login con Google | Implementada y funcional | `social-app/src/router/user.js`, `social-app/src/service/googleAuthService.js`, `social-app-frontend/src/components/auth/components/GoogleAuthSection.jsx` | Requiere configuracion env correcta. |
| Proteccion de rutas | Implementada y funcional | `social-app-frontend/src/routes/ProtectedRoute.jsx`, `social-app-frontend/src/routes/PublicRoute.jsx` | `/feed`, `/messages`, `/profile`, `/profile/:id` viven bajo `ProtectedRoute`. |
| Perfil propio | Implementada y funcional | `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/users/hooks/useOwnProfile.js` | Incluye proyectos y resumen por `post_type`. |
| Perfil publico | Implementada parcialmente | `social-app-frontend/src/components/users/pages/PublicProfilePage.jsx`, `social-app/src/router/user.js` | Existe experiencia visual de perfil ajeno, pero requiere sesion activa en frontend y backend. |
| Edicion de perfil | Implementada y funcional | `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/users/components/ProfileEditForm.jsx` | Usuario, bio y ubicacion. |
| Avatar | Implementada con errores o riesgos | `social-app/src/router/imageRouter.js`, `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/users/components/ProfileHeader.jsx` | Backend tiene endpoint dedicado, pero el frontend no lo consume y `setImage` usa `db` no inicializado. |
| Biografia | Implementada y funcional | `social-app/src/controllers/userController.js`, `social-app-frontend/src/components/users/components/ProfileHeader.jsx` | Parte del perfil editable. |
| Busqueda de usuarios | Implementada y funcional | `social-app/src/service/usersService.js`, `social-app-frontend/src/components/users/hooks/useUserSearch.js` | Con debounce en cliente. |
| Navegacion al perfil desde publicaciones | Implementada y funcional | `social-app-frontend/src/components/feed/components/PostCard.jsx` | Link hacia `ROUTES.USER_PROFILE(ownerId)`. |
| Navegacion al perfil desde comentarios | Implementada parcialmente | `social-app-frontend/src/components/feed/components/PostComments.jsx` | Se muestra autor, pero no hay link al perfil desde comentario. |
| Recuperacion de contrasena | Implementada y funcional | `social-app/src/controllers/userController.js`, `social-app/src/service/passwordRecoveryService.js`, `social-app-frontend/src/components/auth/hooks/useForgotPassword.js` | Hay flujo completo y tests. |
| Verificacion de correo | Implementada parcialmente | `social-app/src/service/googleAuthService.js` | Solo existe chequeo de `email_verified` para Google; no hay verificacion de email para cuentas locales. |
| Eliminacion o desactivacion de cuenta | No implementada | busqueda sin resultados en `social-app/src` y `social-app-frontend/src` | No hay ruta, servicio ni UI. |
| Configuracion de privacidad | No implementada | busqueda sin resultados en `social-app/src` y `social-app-frontend/src` | No hay perfiles privados ni ajustes. |

### 3.2 Posts

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Crear publicaciones de texto | Implementada y funcional | `social-app/src/controllers/postsController.js`, `social-app-frontend/src/components/feed/hooks/useCreatePostForm.js` | Texto o imagen. |
| Crear publicaciones con imagen | Implementada y funcional | `social-app/src/utils/utils.js`, `social-app/src/middleware/upload.js`, `social-app-frontend/src/components/feed/services/feedService.js` | Usa `multipart/form-data` y Cloudinary. |
| Eliminar publicaciones | Implementada con errores o riesgos | `social-app/src/controllers/postsController.js`, `social-app/src/service/postsService.js`, `social-app-frontend/src/components/feed/components/PostCard.jsx` | Backend elimina por `post_id` sin validar ownership. |
| Editar publicaciones | No implementada | sin endpoints ni UI | No hay `PATCH/PUT` ni formulario de edicion. |
| Listar feed | Implementada y funcional | `social-app/src/controllers/followscontroller.js`, `social-app-frontend/src/components/feed/hooks/useFeed.js` | Feed principal actual usa seguidos + propio. |
| Paginacion | Implementada y funcional | `social-app/src/utils/pagination.js`, `social-app-frontend/src/components/feed/hooks/useFeed.js` | `page`, `limit`, `total`, `totalPages`. |
| Feed global | Implementada parcialmente | `social-app/src/router/postsRouter.js`, `social-app-frontend/src/components/feed/services/feedService.js` | Hay endpoint y servicio `allpost`, pero la UI principal no lo expone como modo visible. |
| Publicaciones del perfil propio | Implementada y funcional | `social-app/src/controllers/postsController.js`, `social-app-frontend/src/components/users/hooks/useOwnProfile.js` | Soporta paginacion y filtro por `post_type`. |
| Publicaciones de perfiles publicos | Implementada y funcional | `social-app/src/controllers/postsController.js`, `social-app-frontend/src/components/users/hooks/usePublicProfile.js` | Mismo endpoint `postByUserId/:id`. |
| Tipos de publicacion | Implementada y funcional | `social-app/src/utils/postTypes.js`, `social-app/src/controllers/postsController.js`, `social-app-frontend/src/constants/feed.constants.js` | `personal_update`, `project`, `question`, `learning`, `help`, `collaboration`, `launch`. |
| Filtros por intencion | Implementada y funcional | `social-app/src/controllers/postsController.js`, `social-app/src/controllers/followscontroller.js`, `social-app-frontend/src/components/feed/components/FeedIntentFilter.jsx` | Tambien en perfiles. |
| Publicaciones fijadas | No implementada | sin tabla/campo/ruta/UI | Solo mencionadas en roadmap/showcase. |
| Guardar publicaciones | No implementada | sin tabla/ruta/UI | Solo roadmap. |
| Compartir o repostear | No implementada | sin ruta/UI | Solo tipo de notificacion `REPOST`; no hay flujo funcional. |
| Borradores | No implementada | sin storage/ruta/UI | No hay soporte local ni backend. |
| Vista previa de enlaces | No implementada | sin parser/render | No existe enriquecimiento de links. |
| Hashtags | No implementada | busqueda sin resultados funcionales | Solo aparecen como roadmap en `showcase.constants.js`. |
| Temas o categorias | Implementada parcialmente | `post_type` funciona como categoria de intencion | No hay taxonomia abierta adicional a `post_type`. |
| Menciones de usuarios | No implementada | sin parser/ruta/UI | Solo tipo de notificacion `MENTION_USER`. |
| Privacidad por publicacion | No implementada | sin campo/ruta/UI | No hay visibilidad por post. |
| Publicaciones colaborativas | No implementada | sin tabla/ruta/UI | Solo roadmap. |

### 3.3 Comments and reactions

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Crear comentarios | Implementada con errores o riesgos | `social-app/src/router/commentsRouter.js`, `social-app/src/controllers/commentsController.js`, `social-app-frontend/src/components/feed/hooks/usePostComments.js` | Backend toma `userId` desde URL y no lo ata al usuario autenticado. |
| Eliminar comentarios | No implementada | sin ruta ni UI | No existe delete. |
| Editar comentarios | No implementada | sin ruta ni UI | No existe edit. |
| Mostrar correctamente el autor | Implementada y funcional | `social-app/src/service/commentService.js`, `social-app-frontend/src/components/feed/components/PostComments.jsx` | Query junta `users`; frontend agrega fallback. |
| Respuestas anidadas | Implementada parcialmente | `social-app/src/service/commentService.js`, `social-app/src/controllers/commentsController.js` | Existe `parent_comment_id`, pero frontend renderiza lista plana. |
| Reacciones en publicaciones | Implementada y funcional | `social-app/src/controllers/reactionsController.js`, `social-app-frontend/src/components/feed/hooks/usePostReactions.js` | Toggle + resumen + reaccion actual. |
| Reacciones en comentarios | Existe solamente en backend | `social-app/src/controllers/reactionsController.js`, `social-app/src/router/reactionsRouter.js` | No hay consumo ni UI en frontend. |
| Contadores de reacciones | Implementada y funcional | `social-app/src/controllers/reactionsController.js`, `social-app-frontend/src/components/feed/components/PostReactions.jsx` | Agrupadas por `reaction_type`. |
| Actualizaciones optimistas | Implementada parcialmente | `social-app-frontend/src/components/feed/hooks/usePostComments.js`, `social-app-frontend/src/components/feed/hooks/usePostReactions.js` | Reacciones y comentarios hacen refetch; no hay rollback optimista real. |
| Sincronizacion frontend/backend | Implementada parcialmente | misma evidencia | Funciona, pero depende de refetch inmediato. |
| Reacciones con significado util | Implementada parcialmente | `social-app-frontend/src/constants/feed.constants.js`, `social-app/src/controllers/reactionsController.js` | Existen `LIKE`, `LOVE`, `WOW`, etc.; no incluyen todavia semanticas tipo "Me ayudo" o "Quiero colaborar". |

### 3.4 Follows and connections

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Seguir usuarios | Implementada y funcional | `social-app/src/controllers/followscontroller.js`, `social-app-frontend/src/components/users/hooks/useFollowAction.js` | Emite notificacion. |
| Dejar de seguir usuarios | Implementada y funcional | misma evidencia | Persistente luego de recarga. |
| Estado de seguimiento | Implementada y funcional | `social-app/src/controllers/followscontroller.js`, `social-app-frontend/src/components/users/services/userFollowService.js` | `GET /users/:id/status`. |
| Seguidores/seguidos visibles | Implementada parcialmente | `social-app/src/service/followsService.js` | Hay `followers_count` en sugerencias, pero no hay vistas dedicadas de seguidores/seguidos. |
| Contadores | Implementada parcialmente | `followers_count` en sugerencias, `postsCount` en perfil | Faltan contadores completos de follow/following en perfil. |
| Persistencia tras recarga | Implementada y funcional | `useFollowAction`, `getFollowStatus` | Estado recalculado desde backend. |
| Usuarios sugeridos | Implementada y funcional | `social-app/src/service/followsService.js`, `social-app-frontend/src/components/users/hooks/useUserSuggestions.js` | Enriquecidos con proyectos e intencion dominante. |
| Bloquear usuarios | No implementada | sin tabla/ruta/UI | No existe. |
| Silenciar usuarios | No implementada | sin tabla/ruta/UI | No existe. |
| Solicitudes de seguimiento | No implementada | sin privacidad/follow requests | No existe soporte de perfiles privados. |
| Recomendaciones basadas en intereses | No implementada | sin onboarding/interests model | Las sugerencias usan follows/proyectos/posts, no intereses explicitos. |

### 3.5 Messaging

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Crear conversaciones | Implementada y funcional | `social-app/src/controllers/conversationController.js`, `social-app-frontend/src/components/messages/hooks/useConversationLauncher.js` | Se crea o reutiliza una conversacion 1:1. |
| Listar conversaciones | Implementada y funcional | `social-app/src/service/conversationsService.js`, `social-app-frontend/src/components/messages/hooks/useMessages.js` | Con ultimo mensaje y participante. |
| Enviar mensajes | Implementada y funcional | `social-app/src/sockets/message.socket.js`, `social-app-frontend/src/components/messages/services/messagesSocketService.js` | Realtime principal por socket. |
| Recibir mensajes | Implementada y funcional | misma evidencia | Escucha `messages:new`. |
| Socket.IO | Implementada y funcional | `social-app/src/server.js`, `social-app/src/sockets/message.socket.js`, `social-app-frontend/src/components/messages/services/messagesSocketService.js` | Namespace `/messages`. |
| Salas por conversacion | Implementada y funcional | `socket.join(\`conv:${conversationId}\`)` | Membership validada. |
| Reconexion | Implementada parcialmente | `social-app-frontend/src/components/messages/services/messagesSocketService.js` | Hay reconnection con intentos fijos; no hay estrategia avanzada ni UI de replay. |
| Estados de conexion/desconexion | Implementada y funcional | `social-app-frontend/src/components/messages/hooks/useMessages.js`, `MessagesPage.jsx` | Muestra estado en composer. |
| Gestion de errores | Implementada parcialmente | `useMessages`, `message.socket.js` | Hay errores socket y REST, pero sin cola local ni retry por mensaje. |
| Reintentos | Implementada parcialmente | reconnection automatica del socket | No hay resend manual ni retry por mensaje fallido. |
| Indicador de escritura | No implementada | sin eventos ni UI | No existe `typing`. |
| Mensajes leidos/no leidos | No implementada | sin `read_at`, sin badge por conversacion | No existe. |
| Contadores de mensajes pendientes | No implementada | sin campo/query/UI | No existe unread por conversacion. |
| Envio de imagenes o archivos | No implementada | contenido solo texto | `messages` solo guarda `content`. |
| Bloqueo dentro del chat | No implementada | sin modelo de bloqueo | No existe. |
| Eliminacion de mensajes | No implementada | sin endpoint | No existe. |
| Silenciar conversaciones | No implementada | sin preferencia/ruta | No existe. |

### 3.6 Notifications

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Nuevo seguidor | Implementada y funcional | `social-app/src/controllers/followscontroller.js`, `social-app/src/service/notificationService.js` | Evita auto-notificacion. |
| Comentarios | Implementada y funcional | `social-app/src/controllers/commentsController.js` | Notifica al owner del post. |
| Reacciones a publicaciones | Implementada y funcional | `social-app/src/controllers/reactionsController.js` | Notifica al owner del post. |
| Reacciones a comentarios | Implementada parcialmente | `NOTIFICATION_TYPES.REACTION_COMMENT` existe | No hay emision real desde `toggleReactionComment`. |
| Notificaciones de mensajes | Implementada y funcional | `social-app/src/sockets/message.socket.js` | Se crea notificacion al receptor. |
| Badge de no leidas | Implementada y funcional | `social-app-frontend/src/context/NotificationContext.jsx`, `NotificationToggleButton.jsx` | Realtime + historial. |
| Panel de notificaciones | Implementada y funcional | `NotificationPanel.jsx`, `NotificationItem.jsx` | Dialog lateral. |
| Marcar como leida | Implementada y funcional | frontend y backend | `PATCH /notifications/:id/seen`. |
| Marcar todas como leidas | Implementada y funcional | frontend y backend | `PATCH /notifications/seen-all`. |
| Persistencia de historial | Implementada y funcional | `social-app/src/service/notificationService.js` | Query sobre tabla `notifications`. |
| Actualizacion realtime | Implementada y funcional | `social-app/src/sockets/notificationSocket.js`, frontend socket service | Namespace `/notifications`. |
| Evitar auto-notificaciones | Implementada y funcional | `social-app/src/service/notificationService.js` | Devuelve `null` si actor == receptor. |
| Notificaciones agrupadas | No implementada | sin agregacion por actor/tipo | No existe grouping. |
| Preferencias de notificaciones | No implementada | sin tabla/ruta/UI | No existe. |
| Silenciar categorias | No implementada | sin tabla/ruta/UI | No existe. |
| Duplicados | Implementada parcialmente | `NotificationContext.jsx` dedupea por `id` | No hay dedupe server-side. |
| Navegacion al contenido desde la notificacion | No implementada | `NotificationItem.jsx` solo permite marcar leida | No hay links a post/comentario/mensaje. |

### 3.7 Feed and discovery

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Feed de seguidos | Implementada y funcional | `social-app/src/service/followsService.js`, `FeedPage.jsx` | Incluye posts propios y seguidos. |
| Orden cronologico | Implementada y funcional | queries `ORDER BY created_at DESC` | En feed y posts por usuario. |
| Feed recomendado | No implementada | sin ranking/recommendation engine | No existe. |
| Tendencias | No implementada | sin endpoint/UI | No existe. |
| Filtros | Implementada parcialmente | `post_type` filter en feed y perfil | No hay filtros por media/popularidad/tema. |
| Busqueda de publicaciones | No implementada | sin endpoint/UI | No existe. |
| Busqueda por hashtags | No implementada | sin parser/index | No existe. |
| Busqueda por temas | No implementada | sin taxonomia aparte | No existe. |
| Seccion de descubrimiento | Implementada parcialmente | sugerencias de usuarios en sidebar y empty state | No hay pagina de discovery separada. |
| Feed segun intencion | Implementada y funcional | `postType` filter | Existe controlado por usuario. |
| Explicacion de por que se recomienda | No implementada | sin metadata de recommendation reason | No existe. |
| Recomendaciones transparentes | No implementada | sin UI explicativa | No existe. |

### 3.8 UX, security, testing and observability

| Functionalidad | Estado actual | Evidencia | Notas |
|---|---|---|---|
| Responsive design | Implementada y funcional | `MainLayout.module.css`, `AuthPage.module.css`, `MessagesPage.module.css` | Desktop/tablet/mobile. |
| Bottom navigation | Implementada y funcional | `MainLayout.module.css`, `MainLayout.jsx` | Nav inferior en `< 820px`. |
| Skeletons | Implementada y funcional | `PostListSkeleton.jsx`, `ProfilePageSkeleton.jsx`, `ConversationsListSkeleton.jsx` | Cobertura buena. |
| Estados vacios | Implementada y funcional | feed, mensajes, sugerencias, notificaciones, proyectos | Consistentes. |
| Estados de error | Implementada y funcional | `Alert` en multiples vistas | Falta estandarizacion global. |
| Feedback visual | Implementada parcialmente | Alerts y helper text | No hay sistema unificado de toasts. |
| Accesibilidad | Implementada parcialmente | `aria-*`, `role=status`, loaders, labels | Buena base, sin auditoria completa de teclado/contraste en todos los flujos. |
| Modo oscuro | Implementada y funcional | `src/theme/muiTheme.js`, `src/App.css` | Tema oscuro base. |
| Composer de publicaciones | Implementada y funcional | `PostComposer.jsx`, `useCreatePostForm.js` | Incluye tipo de post e imagen. |
| Prevencion de doble envio | Implementada parcialmente | botones deshabilitados por `loading` | No en todos los flows hay dedupe fuerte backend. |
| Confirmaciones destructivas | No implementada | delete post/project sin confirm dialog | Falta UX segura. |
| Rate limiting | Implementada y funcional | `social-app/src/middleware/rateLimit.js` | Global, auth, read, recovery. |
| CORS | Implementada y funcional | `social-app/src/config/cors.js` | Lista de origins + preview Vercel. |
| Helmet | Implementada y funcional | `social-app/src/app.js` | Con CSP basica. |
| Sanitizacion | Implementada parcialmente | normalizacion puntual en proyectos/password reset/google auth | No hay sanitizacion sistematica de texto libre en posts/comments. |
| Autorizacion por propiedad de recursos | Implementada con errores o riesgos | `postsController.js`, `commentsController.js`, `reactionsController.js`, `userController.js` | Varios endpoints sensibles no atan el recurso al usuario autenticado. |
| Manejo de archivos | Implementada y funcional | `upload.js`, `utils.js`, `cloudinary.js` | Limite 10MB, mime whitelist. |
| Logs estructurados | Implementada parcialmente | `config/logger.js`, `observability.js` | Backend usa Winston, frontend guarda eventos en memoria; no hay pipeline externo. |
| Health check / metrics | Implementada parcialmente | `GET /`, `/api/monitoring/metrics`, `monitoring/metrics.js` | No hay health estructurado ni readiness. |
| Tests backend auth | Implementada y funcional | `test/auth.test.js`, `test/forgotPasswordController.test.js`, `test/googleAuth*.test.js` | Buena base en auth. |
| Tests backend posts/comments/reactions | No implementada | no hay suites dedicadas | Solo helpers y auth. |
| Tests backend follows | Implementada parcialmente | `test/followsService.test.js`, `test/auth.test.js` | Cubre sugerencias helper y rate limit/auth, no flujo HTTP follow/unfollow completo. |
| Tests backend mensajes/notificaciones | No implementada | no hay suites dedicadas | No existen. |
| Tests frontend | No implementada | no hay archivos `*.test.*` en `src` | Cobertura cero. |
| Tests E2E | No implementada | sin Playwright/Cypress | No existe. |
| CI/CD validacion | Implementada con errores o riesgos | `social-app/src/github/workflows/deploy.yml` | Workflow fuera de `.github/workflows`; no hay CI real detectada. |
| Lazy loading | Implementada y funcional | `AppRoutes.jsx`, `MainLayout.jsx`, `useDeferredFeature.js` | Lazy routes y sidebars diferidos. |
| Code splitting | Implementada y funcional | `vite.config.js`, build output | Se observan chunks separados. |
| Cache/Redis | Implementada parcialmente | `cacheHelpers.js`, `config/redis.js` | Redis es opcional; `getCache` no devuelve valor en produccion cuando hay hit. |
| Observabilidad frontend | Implementada y funcional | `services/webVitals.js`, `services/observability.js` | Web vitals e in-memory event buffer. |

## 4. Frontend audit

What is solid:

- Feature organization is coherent and reusable.
- Constants are centralized and heavily reused.
- Route shell, auth context, feed refresh context and notification context are separated reasonably well.
- Hooks own most async state, keeping JSX mostly presentational.

Main frontend gaps:

- No frontend tests.
- No refresh-token/session renewal flow.
- No avatar upload UI despite backend endpoint existence.
- Notifications cannot navigate to the related content.
- Realtime is limited to message delivery and notification arrival; no read state, typing, attachment or retry queue UX.
- Public profile is not actually public outside authenticated navigation.

## 5. Backend audit

What is solid:

- Router/controller/service split exists and is understandable.
- Password recovery and Google auth are better structured than the older modules.
- CORS, Helmet, rate limit, Redis fallback and Cloudinary integration are present.
- Realtime membership validation exists for message rooms.

Main backend gaps:

- Ownership/authorization is inconsistent across older endpoints.
- Error contract is not uniformly enforced.
- SQL is embedded directly in controllers/services without migration discipline.
- README claims manual SQL files that are absent from the repository.
- There is no refresh endpoint despite refresh token persistence.

## 6. Database audit

Tables identified from code and docs:

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

Expected but not found as real tables:

- generic `reactions` table
- `uploads` or `media` table

Relationships detected:

- `users -> posts`
- `users -> comments`
- `users -> follows` as follower/followed
- `users -> notifications`
- `users -> refresh_tokens`
- `users -> password_reset_tokens`
- `users -> user_projects`
- `conversations -> conversation_users`
- `conversations -> messages`
- `posts -> comments`
- `posts -> post_reactions`
- `comments -> comment_reactions`

Schema and migration findings:

- No migration framework detected.
- Backend package includes `sequelize`, but no active Sequelize models or migrations were found in source.
- README references manual SQL files for:
  - `password-reset-tokens.sql`
  - `post-intent-types.sql`
  - `user-profile-projects.sql`
  - `google-auth-users.sql`
- Those files were not found in the repository during this audit.

Performance/data risks:

- No explicit index definitions are versioned in repo for `follows`, `post_reactions`, `comment_reactions`, `notifications`, `password_reset_tokens`, `conversation_users`, `messages`, `user_projects`.
- Suggestion query in `followsService.js` is relatively heavy and aggregates projects plus post intent metadata.
- Conversation list uses correlated subqueries for `last_message` and `last_message_at`.

Environment differences visible from code:

- test DB is hardcoded as `social_app_test` in `config/db.js`
- production/dev DB is env-driven
- Redis, mail provider and CORS origins vary by environment

## 7. Socket.IO audit

Namespaces verified:

- `/messages`
- `/notifications`

Implemented:

- socket auth with JWT: `social-app/src/sockets/socketAuth.js`
- room subscription by conversation: `message.socket.js`
- room subscription by user: `notificationSocket.js`
- frontend reconnection config for both namespaces

Not implemented:

- typing indicators
- read receipts
- delivery acknowledgements beyond `messages:sent`
- presence roster
- attachment events
- moderation/blocking hooks in socket flows

## 8. UX/UI audit

Positive:

- cohesive dark UI
- sticky sidebars on larger screens
- bottom navigation on mobile
- skeletons and empty states are stronger than average for a portfolio app
- consistent use of MUI for controls and alerts

Gaps:

- no confirmation UX for destructive actions
- comment author is visible but comment items are not navigable
- no toast system
- notification items are static and not actionable
- no avatar upload UI

## 9. Security audit

Critical or high risk findings:

1. `social-app/src/controllers/postsController.js`
   - `POST /api/posts/CreatePost/:id` trusts `req.params.id`
   - any authenticated caller can attempt post creation on behalf of another user

2. `social-app/src/controllers/commentsController.js`
   - `POST /api/comments/addComment/:id/:postId` trusts the URL `:id`
   - comment authorship can be spoofed

3. `social-app/src/controllers/reactionsController.js`
   - `toggleReaction` and `toggleReactionComment` trust `:userId`
   - reactions can be spoofed for another user

4. `social-app/src/controllers/postsController.js`
   - `DELETE /api/posts/removePost/:id` checks auth but not post ownership

5. `social-app/src/controllers/userController.js`
   - `setImage` does not verify ownership and also references `db` without initialization

6. `social-app/src/router/notificationRouter.js`
   - `POST /api/notifications/notification` is not protected by `auth`

Medium risk:

- inconsistent `AppError` usage in notification controllers
- no server-side sanitization policy for free text posts/comments
- refresh-token storage exists without lifecycle endpoints

## 10. Testing audit

Backend:

- strong concentration on auth, password recovery, google auth, helper utilities
- no dedicated HTTP integration coverage for posts, comments, reactions, messaging or notifications

Frontend:

- zero automated tests found

CI/CD:

- no valid GitHub Actions path detected for automated checks

## 11. Documentation audit

Documentation quality is mixed.

Reliable:

- both READMEs describe the broad architecture
- local planning/changelog under `.codex-local` are detailed and useful

Mismatch:

- backend README references SQL files that are missing
- backend README implies deploy workflow, but the only workflow file is misplaced under `src/github/workflows`
- showcase content mentions some roadmap items not yet implemented

## 12. Main risks and debt

Critical:

- broken authorization on older endpoints
- missing SQL artifacts despite documented dependency
- avatar upload bug

Important:

- no frontend test safety net
- no true refresh flow
- no actionable notifications
- no moderation/privacy layer

## 13. Immediate recommendations

1. Start with a hardening phase, not a feature phase.
2. Fix ownership and identity trust issues before expanding social features.
3. Reconstruct and version the missing SQL scripts or replace them with migrations.
4. Define a real refresh-token contract or remove refresh-token persistence.
5. Add frontend tests and a real CI path before opening broader roadmap work.

## 14. Recommended next phase

Recommended next phase: `Phase 0 - security and contract hardening`

Why this first:

- it removes the highest-risk backend issues
- it stabilizes the contracts that every later feature depends on
- it improves portfolio quality immediately because the current issues are architectural, not cosmetic
