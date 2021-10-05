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

/**
 * Initialize firebase (firstly checks if it's not already initialized)
 */
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
 * Get a FieldPath query ready to use in a select
 * 
 * Shorthand for `new admin.firestore.FieldPath(s)`
 *
 * @param {string} s Firebase field
 * @returns {admin.firestore.FieldPath} generated query
 */
function getQuery(s) {
  return new admin.firestore.FieldPath(s);
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

    db.select(
      getQuery("brand"),
      getQuery("name"),
      getQuery("price"),
      getQuery("image")
    )
      .get()
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
  static getSneakerWithID(req, res) {
    initFirebase();

    if (!req.params.id) {
      res.status(500).json(errResponse("Missing ID"));
      return;
    }

    const db = admin.firestore().collection("sneakers");
    db.doc(req.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          res.status(200).json(
            okResponse({
              id: doc.id,
              ...doc.data(),
            })
          );
        } else {
          res.status(500).json(errResponse("Invalid ID"));
        }
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
      desc: req.body.desc,
      url: req.body.url,
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
