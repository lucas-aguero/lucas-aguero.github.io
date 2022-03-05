import express from "express";
import morgan from "morgan";

import routerProductos from "./router/products.js";
import routerCarrito from "./router/cart.js";
import routerFavourites from "./router/favourites.js";
import routerUpload from "./router/upload.js";

import config from "./config.js";
import Mongo_DB from "./model/DB_mongo.js";

const production = process.env.NODE_ENV == "production"; 

Mongo_DB.conectarDB();

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/api/favourites", routerFavourites);
app.use("/upload", routerUpload);

console.log("----------------------------------------");
console.log("process.env.PORT: ", process.env.PORT);
console.log("process.env.TIPO: ", process.env.TIPO);
console.log("process.env.CNX: ", process.env.CNX);
console.log("----------------------------------------");

process.on("SIGINT", () => {
  console.log("Control-C detectado!");

  process.exit(0);
});

process.on("exit", (code) => {
  console.log("Salida con código", code);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.message);

  process.exit(1);
});

const PORT = config.PORT;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
);
server.on("error", (error) =>
  console.log(`Error en servidor express: ${error.message}`)
);
