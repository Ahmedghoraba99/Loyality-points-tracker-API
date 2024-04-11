This is a NodeJS api for a simple loyality tracking point system, to start:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server dev: `npm run startDev`
4. Start the server prod: `npm start`

To run the tests, run `npm test`.

## API Endpoints

### /api/users

#### POST

Create a new user.

Request body:

```json
{
  "name": "John Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

Response body:

```json
{
  "id": 1,
  "name": "John Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

#### GET

Get all users.

Response body:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "phone": "01010101010",
    "vip": true,
    "Points": 10
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "phone": "01010101011",
    "vip": false,
    "Points": 0
  }
]
```

### /api/users/{id/phone}

#### GET

Get a user by id or phone.

Response body:

```json
{
  "id": 1,
  "name": "John Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

#### PUT

Update a user by id or phone.

Request body:

```json
{
  "name": "Johnn Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

Response body:

```json
{
  "id": 1,
  "name": "Johnn Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

#### DELETE

Delete a user by id or phone.

Response body:

```json
{
  "id": 1,
  "name": "John Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 10
}
```

### /api/addPoints

#### PUT

Add points to a user by id or phone.

Request body:

```json
{
  "id": 1,
  "phone": "01010101010",
  "points": 10
}
```

Response body:

```json
{
  "idOrPhone": "1",
  "points": 10
}
```

OR use phone:

```json
{
  "idOrPhone": "01212121212",
  "points": 10
}
```

### /api/deductPoints

#### PUT

Deduct points from a user by id or phone.

Request body: same as the function above.
Responese:

```json
{
  "id": 1,
  "name": "Johnn Doe",
  "phone": "01010101010",
  "vip": true,
  "Points": 505
}
```
