const express = require("express");
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const { createPagination } = require("express-handlebars-paginate");

app.use(express.static(__dirname + "/html"));
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      createPagination,
      formatDate: (date) => {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      paginateHelper: paginate.createPagination,
      showIndex: (index) => index + 1,
    },
  })
);
app.set("view engine", "hbs");
 //Cau hinh de doc du lieu gui len theo phuong thuc post
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.redirect("/users"));
app.use("/users", require("./routes/userRouter"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
