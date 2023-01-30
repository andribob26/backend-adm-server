require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const { Client } = require("pg");
const app = express();
const authRouter = require("./routes/auth-router.js");
const userRouter = require("./routes/user-router.js");
const bahanBakuRouter = require("./routes/bahanbaku-router.js");
const pembelianRouter = require("./routes/pembelian-router.js");
const produkRouter = require("./routes/produk-router.js");
const produksiRouter = require("./routes/produksi-router.js");
const pengirimanRouter = require("./routes/pengiriman-router.js");

const port = process.env.PORT || 2000;

const conObject = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
};
const client = new Client(conObject);
client.connect();

const store = new (require("connect-pg-simple")(session))({
  conObject,
});

app.use(
  cors({
    origin: "https://frontend-adm-app.vercel.app",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'MyCoolWebAppCookieName',
    cookie: {
      secure: false,
      httpOnly: false,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "hallo coy",
  });
});

app.use(authRouter);
app.use(userRouter);
app.use(bahanBakuRouter);
app.use(pembelianRouter);
app.use(produkRouter);
app.use(produksiRouter);
app.use(pengirimanRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("====================================");
    console.log(`server berjalan di port http://localhost:${port}`);
    console.log("====================================");
  }
});
