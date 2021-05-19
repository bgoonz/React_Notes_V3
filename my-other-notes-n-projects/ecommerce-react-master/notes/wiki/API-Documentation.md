# **Stand in Content Below: Need to Replace**

The Bluebird API is organized around REST. Our API has predictable resource
oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded
responses, and uses standard HTTP response codes and verbs.

API routes are not user-facing and should only be used by developers.

Resources:

- [Users](#users)
- [Chirps](#chirps)
- [Likes](#likes)

---

## Users

Endpoints for the `Users` resource:

- [Log In](#log-in) - `POST /api/session`
- [Sign Up](#sign-up) - `POST /api/users`
- [Log Out](#log-out) - `DELETE /api/session`
- [Retrieve Single User](#retrieve-single-user) - `GET /api/users/:id`

---

### Log In

Logs in an existing user

#### `POST /api/session`

#### Body Parameters

| Parameter    | Type     | Description                                  | Notes    |
| :----------- | :------- | :------------------------------------------- | :------- |
| `credential` | `string` | `username` or `email` of the user logging in | required |
| `password`   | `string` | `password` of the user logging in            | required |

#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an error otherwise.

---

### Sign Up

Creates a new user

#### `POST /api/users`

#### Body Parameters

| Parameter         | Type     | Description                         | Notes                        |
| :---------------- | :------- | :---------------------------------- | :--------------------------- |
| `username`        | `string` | Desired `username` of the new user  | required                     |
| `email`           | `string` | Desired `email` of the new user     | required                     |
| `password`        | `string` | Desired `password` of the new user  | required                     |
| `confirmPassword` | `string` | Repeated `password` of the new user | required, same as `password` |

#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an error otherwise.

---

### Log Out

Logs out the current user, **requires authentication with a cookie**

#### `DELETE /api/session`

#### Returns

Returns a [success message](#success-message) and remove the HTTP-only auth
cookie if successful, and returns an error otherwise.

---

### Retrieve Single User

#### `GET /api/users/:id`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns a [user object](#user-object) if successful, and returns an error
otherwise.

---

## Chirps

Endpoints for the `Chirps` resource:

- [Retrieve All Chirps](#retrieve-all-chirps) - `GET /api/chirps`
- [Retrieve a Single Chirp](#retrieve-a-single-chirp) - `GET /api/chirps/:id`
- [Create a Chirp](#create-a-chirp) - `POST /api/chirps`
- [Edit a Chirp](#edit-a-chirp) - `PUT /api/chirps/:id`
- [Delete a Chirp](#delete-a-chirp) - `DELETE /api/chirps/:id`

---

### Retrieve All Chirps

Retrieves all the chirps

#### `GET /api/chirps`

#### Query Parameters

Filters

| Parameter | Type     | Description                                                           | Notes                               |
| :-------- | :------- | :-------------------------------------------------------------------- | :---------------------------------- |
| `limit`   | `number` | `limit` of how many chirps can be retrieved at one time               | optional, default of 20, max of 100 |
| `cursor`  | `number` | a `cursor` for use in pagination, starting point of the list returned | optional                            |

#### Returns

Returns an array of [chirp object](#chirp-object)s if successful, and returns
an error otherwise

---

### Retrieve a Single Chirp

Retrieves a single chirp with the specified id

#### `GET /api/chirps/:id`

#### Path Parameters

| Parameter | Type | Description                   | Notes    |
| :-------- | :--- | :---------------------------- | :------- |
| `id`      | `ID` | `id` of the chirp to retrieve | required |

#### Returns

Returns a [chirp object](#chirp-object) if successful, and returns an error
otherwise.

---

### Create a Chirp

Creates a new chirp for the current user, **requires authentication with a
cookie**

#### `POST /api/chirps`

#### Body Parameters

| Parameter |        Type        | Description                               | Notes    |
| :-------- | :----------------: | :---------------------------------------- | :------- |
| `body`    | non-empty `string` | message `body` of the chirp being created | required |

#### Returns

Returns the created [chirp object](#chirp-object) if successful, and returns an
error otherwise.

---

### Edit a Chirp

Edits an existing chirp of the current user, **requires authentication with a
cookie**

#### `PUT /api/chirps/:id`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the chirp to edit | required |

#### Body Parameters

| Parameter |        Type        | Description                              | Notes    |
| :-------- | :----------------: | :--------------------------------------- | :------- |
| `body`    | non-empty `string` | message `body` of the chirp being edited | required |

#### Returns

Returns the edited [chirp object](#chirp-object) if successful, and returns an
error otherwise.

---

### Delete a Chirp

Deletes an existing chirp of the current user, **requires authentication with a
cookie**

#### `DELETE /api/chirps/:id`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the chirp to edit | required |

#### Returns

Returns a [success message](#success-message) if successful, and returns an
error otherwise.

---

## Likes

Endpoints for the `Likes` resource:

- [Like a Chirp](#like-a-chirp) - `POST /api/chirps/:id/likes`
- [Unlike a Chirp](#unlike-a-chirp) - `DELETE /api/chirps/:id/likes`

---

### Like a Chirp

Creates a like between the current user and the specified chirp that the user
has not liked yet and did not create, **requires authentication with a cookie**

#### `POST /api/chirps/:id/likes`

#### Path Parameters

| Parameter | Type | Description               | Notes    |
| :-------- | :--- | :------------------------ | :------- |
| `id`      | `ID` | `id` of the chirp to like | required |

#### Returns

Returns the chirp liked as a [chirp object](#chirp-object) with the `liked` key
set to `true` if successful, and returns an error otherwise.

---

### Unlike a Chirp

Deletes a like between the current user and the specified chirp that the user
has liked and did not create, **requires authentication with a cookie**

#### `DELETE /api/chirps/:id/likes`

#### Path Parameters

| Parameter | Type | Description                 | Notes    |
| :-------- | :--- | :-------------------------- | :------- |
| `id`      | `ID` | `id` of the chirp to unlike | required |

#### Returns

Returns the chirp unliked as a [chirp object](#chirp-object) with the `liked`
key set to `false` if successful, and returns an error otherwise.

---

## Objects

### Current User Object

```json
{
  "id": 1,
  "username": "zagreus",
  "email": "zagreus@bluebird.com"
}
```

### User Object

```json
{
  "id": 1,
  "username": "zagreus"
}
```

### Success Message

```json
{
  "message": "success"
}
```

### Chirp Object

```json
{
  "id": 41,
  "body": "Hello World!",
  "authorId": 1,
  "createdAt": "2020-10-18T20:26:34.256Z",
  "updatedAt": "2020-10-18T20:26:34.256Z",
  "Author": {
    "id": 1,
    "username": "zagreus"
  },
  "numLikes": 24,
  "liked": false
}
```
