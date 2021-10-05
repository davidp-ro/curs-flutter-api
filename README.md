# curs-flutter-api

REST API used to teach a Flutter course, deployed on heroku [here](https://curs-flutter.herokuapp.com).

# Endpoints

- `GET /sneakers` &times; https://curs-flutter.herokuapp.com/sneakers &times; Get a list of sneakers:

```json
{
  "status": "ok / fail",
  "error": "null / an error",
  "data": [
    ...,
    {
      "id": "sneaker_id",
      "brand": "Sneaker Brand, ie: adidas (all lowercase, no spaces)",
      "name": "The sneaker's model / display name",
      "price": "The sneaker's price",
      "image": "image_link"
    },
    ...
  ]
}
```

- `GET /sneaker/[id]` &times; https://curs-flutter.herokuapp.com/sneaker/[id] &times; Get more info of a sneaker (by it's ID)

```json
{
  "status": "ok / fail",
  "error": "null / an error",
  "data": {
    "id": "sneaker_id",
    "brand": "Sneaker Brand, ie: adidas (all lowercase, no spaces)",
    "name": "The sneaker's model / display name",
    "price": "The sneaker's price",
    "image": "image_link",
    "desc": "Brand's description for this sneaker",
    "url": "Official page link"
  }
}
```

- `POST /sneaker` &times; https://curs-flutter.herokuapp.com/sneaker &times; Add a sneaker (if enabled in .env)

```json
Request Body:

{
  "brand": "Sneaker Brand, ie: adidas (all lowercase, no spaces)",
  "name": "The sneaker's model / display name",
  "price": "The sneaker's price",
  "desc": "Brand's description for this sneaker",
  "url": "Official page link"
}

Response:

{
  "status": "ok / fail",
  "error": "null / an error",
  "data": "The newly added sneaker's ID"
}
```

- _Note: `data` will be null if there's an error!_

# Populating .ENV

```
ADMIN_SDK_CREDS=<admin sdk credentials (b64 encoded)>
PORT=<port where to run the api>
ALLOW_ADDING=<allow POST /sneaker>
```

# License

MIT - [View](LICENSE)

_**All images / products referenced in this project are the porperties of their
respective owners.**_
