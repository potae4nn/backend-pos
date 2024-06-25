import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import "./config/passport";
import passport from "passport";
import path from "path";
import { Server } from "socket.io";
import http from "http";

// Routers
import product from "./routers/products";
import user from "./routers/user";
import customer from "./routers/customer";
import auth from "./routers/auth";
import category from "./routers/category";
import productunit from "./routers/productunit";
import sale from "./routers/sale";
import invoice from "./routers/invoice";
import pdf from "./routers/pdf";
import bank from "./routers/bank";
dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: "*",
};
const server = http.createServer(app);
const io = new Server(server);

let PORT: string | undefined;
if (process.env.NODE_ENV === "production") {
  PORT = process.env.PORT_PROD;
} else {
  PORT = process.env.PORT_DEV;
}

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/api/product",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  product
);
app.use(
  "/api/user",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  user
);
app.use(
  "/api/customer",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  customer
);
app.use(
  "/api/category",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  category
);
app.use(
  "/api/productunit",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  productunit
);
app.use(
  "/api/sale",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  sale
);
app.use(
  "/api/invoice",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  invoice
);
app.use(
  "/api/pdf",
  cors(corsOptions),
  passport.authenticate("jwt", { session: false }),
  pdf
);

app.use(
  "/api/bank",
  cors(corsOptions),
  // passport.authenticate("jwt", { session: false }),
  bank
);

app.use("/api/auth", cors(corsOptions), auth);
app.use("/api/image/", express.static(__dirname + "/public/images"));

app.set("views", path.join(__dirname, "template"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server ${PORT} ${process.env.NODE_ENV}`);
});

const clients = new Set();

io.on("connection", (socket) => {
  // Add the client to the clients Set
  clients.add(socket);
  socket.on("qrcode", (message) => {
    io.emit("qrcode", message);
  });
  socket.on("totalPrice", (message) => {
    io.emit("totalPrice", message);
  });
  socket.on("cartProduct", (message) => {
    io.emit("cartProduct", message);
  });
  socket.on("disconnect", () => {
    // console.log(`Client disconnected: ${socket.id}`);
    // Remove the client from the clients Set
    clients.delete(socket);
  });
});

server.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${PORT} ${process.env.NODE_ENV} mode`
  );
});
