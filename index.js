const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("libros2");
  }
});

app.get("/api/libros", function (req, res) {
  db.collection("libros")
    .find()
    .toArray(function (err, datos) {
      if (err != null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.get("/api/libros/:titulo", function (req, res) {
  const titulo = req.params.titulo;
  db.collection("libros")
    .find({ titulo: titulo })
    .toArray(function (err, datos) {
      if (err != null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.post("/api/nuevoLibro/:titulo", function (req, res) {
  let libro = {
    titulo: req.params.titulo,
    estado: "Sin leer",
  };

  db.collection("libros").insertOne(libro, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.put("/api/editarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;
  console.log(titulo);

  db.collection("libros").updateOne(
    { titulo: titulo },
    { $set: { estado: "Leído" } },
    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

app.delete("/api/borrarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;

  db.collection("libros").deleteOne({ titulo: titulo }, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.listen(3000);
