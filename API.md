# NoPlace API Documentation

## Authentication

All protected endpoints require JWT token in `Authorization` header:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string@email.com",
  "password": "string"
}

Response: 201 Created
{
  "id": "uuid",
  "username": "string",
  "email": "string@email.com",
  "token": "jwt-token"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "string@email.com",
  "password": "string"
}

Response: 200 OK
{
  "id": "uuid",
  "username": "string",
  "email": "string@email.com",
  "token": "jwt-token"
}
```

### Posts

#### Create Post
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "string",
  "energy": "soft|chaos|sadcore|villain|healing|overthinking",
  "type": "text|photo|audio|poll|rant",
  "is_anonymous": boolean,
  "blur_hash": "optional string"
}

Response: 201 Created
{
  "id": "uuid",
  "user_id": "uuid",
  "content": "string",
  "energy": "string",
  "type": "string",
  "is_anonymous": boolean,
  "views": 0,
  "created_at": "2026-03-03T00:00:00Z"
}
```

#### Get Feed (Random)
```
GET /api/posts/feed
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "content": "string",
    "energy": "string",
    "type": "string",
    "is_anonymous": boolean,
    "views": number,
    "created_at": "2026-03-03T00:00:00Z",
    "user": { ... }
  },
  ...
]
```

#### Get Post
```
GET /api/posts/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "user_id": "uuid",
  "content": "string",
  "energy": "string",
  "type": "string",
  "is_anonymous": boolean,
  "views": number,
  "created_at": "2026-03-03T00:00:00Z",
  "user": { ... }
}
```

#### Delete Post
```
DELETE /api/posts/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Post deleted"
}
```

### Reactions

#### Add/Remove Reaction
```
POST /api/posts/:postId/reactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "relate|tooReal|chaos|mainChar|silentScream"
}

Response: 201 Created or 200 OK (if removing)
{
  "id": "uuid",
  "post_id": "uuid",
  "user_id": "uuid",
  "type": "string",
  "created_at": "2026-03-03T00:00:00Z"
}
```

#### Get Reactions
```
GET /api/posts/:postId/reactions
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "post_id": "uuid",
    "user_id": "uuid",
    "type": "string",
    "created_at": "2026-03-03T00:00:00Z"
  },
  ...
]
```

### Messages

#### Send Message
```
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiver_id": "uuid",
  "content": "string"
}

Response: 201 Created
{
  "id": "uuid",
  "sender_id": "uuid",
  "receiver_id": "uuid",
  "content": "string",
  "is_read": false,
  "created_at": "2026-03-03T00:00:00Z",
  "expires_at": "2026-03-04T00:00:00Z"
}
```

#### Get Inbox
```
GET /api/messages/inbox
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "sender_id": "uuid",
    "receiver_id": "uuid",
    "content": "string",
    "is_read": boolean,
    "created_at": "2026-03-03T00:00:00Z",
    "expires_at": "2026-03-04T00:00:00Z"
  },
  ...
]
```

#### Get Conversation
```
GET /api/messages/:userId
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "sender_id": "uuid",
    "receiver_id": "uuid",
    "content": "string",
    "is_read": boolean,
    "created_at": "2026-03-03T00:00:00Z",
    "expires_at": "2026-03-04T00:00:00Z"
  },
  ...
]
```

### User

#### Get Profile
```
GET /api/user/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "username": "string",
  "email": "string@email.com",
  "aura_type": "string",
  "energy_badge": "string",
  "journal_streak": number,
  "is_anonymous": boolean,
  "is_active": boolean,
  "created_at": "2026-03-03T00:00:00Z",
  "updated_at": "2026-03-03T00:00:00Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

Not yet implemented. Coming in production.

## CORS

Enabled for all origins in development. Restrict in production.
