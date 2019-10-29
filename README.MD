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

### GET /
* RES: `{ words }`
> all words

### GET /?lean={num}
* RES: `{ words }`
> random to lean

### POST /
* REQ: `{ eng, rus }`
> create

### DELETE /
* REQ: `{ _id }`
>delete

### PUT /
* REQ `{ _id, result : true/false }`
> set statistic