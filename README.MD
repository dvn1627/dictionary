# API

## /USERS

### POST /register
* REQ: `{ email, password }`
* RES: `{ token }`

### POST /login
* REQ: `{ email, password }`
* RES: `{ token }`

### GET /logout (auth)

## /WORDS (auth)

### GET /all
* RES: `{ words }`

### GET /lean?count={num}
* RES: `{ words }`

### POST /add
* REQ: `{ eng, rus }`

### PUT /lean
* REQ `{ id, result : true/false }`