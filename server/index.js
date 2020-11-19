const path = require("path");
const fs = require("fs")
require("dotenv").config({
    path: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "./env/prod.env" : "./env/dev.env"),
});
const http = require("http");
const https = require("https");
const createExpressServer = require("./express");
const app = createExpressServer();
const createRoutes = require("./routes");
const errorHandlingMiddleware = require("./lib/error/error-handlers");
const dbManager = require("./db/index");
const loadDbInstances = (appDb) => {
    let Survey = require("./db/model/survey")(appDb);
    let Customer = require("./db/model/customer")(appDb);
    let Service = require("./db/model/service")(appDb);
    let Location = require("./db/model/location")(appDb);
    let User = require("./db/model/user")(appDb);
    // Customer.deleteMany({}).then(() => console.log("Delete all customers"))
    // Survey.deleteMany({}).then(() => console.log("Delete all surveys"))
    // Service.deleteMany({}).then(() => console.log("Delete all services"))
    // Location.deleteMany({}).then(() => console.log("Delete all locations"))
    // User.deleteMany({}).then(() => console.log("Delete all users"))
    // Service.insertMany([
    //     {name: "Phun xăm"},
    //     {name: "Điều trị mụn sẹo"},
    //     {name: "Tiểu phẫu"},
    //     {name: "Triệt lông"},
    //     {name: "Chăm sóc da"},
    //     {name: "Giảm béo"},
    // ]).then(() => console.log("Insert temp services"))
    // Location.insertMany([
    //     {name: "Hà Nội"},
    //     {name: "Nha Trang"},
    //     {name: "Sài Gòn"},
    //     {name: "Cần Thơ"},
    // ]).then((data) => {
    //     console.log("Insert Location services")
    //     Promise.all([
    //         new User({
    //             name: "Admin",
    //             role: 0,
    //             username: "admin",
    //             password: "123456"
    //         }).save(),
    //         new User({
    //             name: "Sale",
    //             role: 2,
    //             username: "sale",
    //             password: "123456",
    //             location: data[0]._id
    //         }).save(),
    //         new User({
    //             name: "Sale 2",
    //             role: 2,
    //             username: "sale2",
    //             password: "123456",
    //             location: data[1]._id
    //         }).save(),
    //         new User({
    //             name: "Location Admin",
    //             role: 1,
    //             username: "location_admin",
    //             password: "123456",
    //             location: data[0]._id
    //         }).save(),
    //         new User({
    //             name: "Location Admin 2",
    //             role: 1,
    //             username: "location_admin2",
    //             password: "123456",
    //             location: data[1]._id
    //         }).save()
    //     ])
    // })
};

const startServer = () => new Promise((resolve) => {

    const port = process.env.PORT || 4000;
    let environment = process.env.NODE_ENV;
    // const server = https.createServer(
    //     {
    //         key: fs.readFileSync(
    //             path.join(
    //                 __dirname,
    //                 `./ssl/${environment}/${process.env.SSL_KEY_PATH}`
    //             )
    //         ),
    //         cert: fs.readFileSync(
    //             path.join(
    //                 __dirname,
    //                 `./ssl/${environment}/${process.env.SSL_CRT_PATH}`
    //             )
    //         ),
    //     },
    //     app
    // );
    const server = http.createServer(app);
    app.use("/", createRoutes());
    app.use(errorHandlingMiddleware);
    server.listen(port, () => {
        console.log(`Server running on port: ${port}`);
        resolve()
    });
});
dbManager
    .init()
    .then((dbs) => {
        const appDb = dbs[0];
        loadDbInstances(appDb);
    })
    .then(() => startServer())
    .catch(err => console.log(err));

