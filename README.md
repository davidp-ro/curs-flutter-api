# curs-flutter-api
REST API used to teach a Flutter course

# Endpoints

- `GET /sneakers`: Get a list of sneakers:
```json
[
  ...,
  {
    "id": "sneaker_id",
    "brand": "Sneaker Brand, ie: Adidas",
    "name": "The sneaker's model / display name",
    "price": "The sneaker's price",
    "image": "image_link"
  },
  ...
]
```

- `GET /sneaker/[id]`: Get a sneaker by it's ID
```json
{
  "id": "sneaker_id",
  "brand": "Sneaker Brand, ie: Adidas",
  "name": "The sneaker's model / display name",
  "price": "The sneaker's price",
  "image": "image_link"
}
```

# Populating .ENV
```
ADMIN_SDK=<admin sdk credential file>
PORT=<port where to run the api>
```

# License
MIT - [View](LICENSE)

_**All images / products referenced in this project are the porperties of their
respective owners.**_
