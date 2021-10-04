// @ts-check

const admin = require("firebase-admin");

const ALLOW_ADDING = process.env.ALLOW_ADDING || false;

/**
 * Get a 'fail' response
 *
 * @param {any} err Error message
 * @returns JSON object
 */
function errResponse(err) {
  return {
    status: "fail",
    error: err,
    data: null,
  };
}

/**
 * Get an 'ok' response
 *
 * @param {any} data Data to send
 * @returns JSON object
 */
function okResponse(data) {
  return {
    status: "ok",
    error: null,
    data: data,
  };
}

function initFirebase() {
  if (admin.apps.length == 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(
          Buffer.from(process.env.ADMIN_SDK_CREDS, "base64").toString("ascii")
        )
      ),
    });
  }
}

/**
 * @param {string} brand Sneaker brand
 * @param {string} name Sneaker name
 * @returns string, URL Formatted link
 */
function getImageLink(brand, name) {
  const _name = name.replace(/ /g, "-");
  return `https://firebasestorage.googleapis.com/v0/b/curs-flutter.appspot.com/o/${brand}%2F${_name}.jpg?alt=media`;
}

module.exports = class Handlers {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAllSneakers(req, res) {
    initFirebase();

    let sneakers = [];
    const db = admin.firestore().collection("sneakers");
    db.get()
      .then((doc) => {
        doc.docs.map((doc) => {
          sneakers.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        res.status(200).json(okResponse(sneakers));
      })
      .catch((reason) => {
        res.status(500).json(errResponse(reason));
        return;
      });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getSneakerWithID(req, res) {}

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static addSneaker(req, res) {
    if (ALLOW_ADDING !== "true") {
      res.status(500).json(errResponse("Method disabled"));
      return;
    }

    initFirebase();

    const db = admin.firestore().collection("sneakers");
    db.add({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      image: getImageLink(req.body.brand, req.body.name),
    })
      .then((doc) => {
        res.status(200).json(okResponse(doc.id));
      })
      .catch((reason) => {
        res.status(500).json(errResponse(reason));
        return;
      });
  }
};
