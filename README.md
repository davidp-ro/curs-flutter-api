# curs-flutter-api

REST API used to teach a Flutter course

# Endpoints

- `GET /sneakers`: Get a list of sneakers:

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

- `GET /sneaker/[id]`: Get a sneaker by it's ID

```json
{
  "status": "ok / fail",
  "error": "null / an error",
  "data": {
    "id": "sneaker_id",
    "brand": "Sneaker Brand, ie: adidas (all lowercase, no spaces)",
    "name": "The sneaker's model / display name",
    "price": "The sneaker's price",
    "image": "image_link"
  }
}
```

- `POST /sneaker`: Add a sneaker (if enabled in .env)

```json
{
  "brand": "Sneaker Brand, ie: adidas (all lowercase, no spaces)",
  "name": "The sneaker's model / display name",
  "price": "The sneaker's price"
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
