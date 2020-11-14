const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "./env/prod.env" : "./env/dev.env"),
});
const http = require("http");
const createExpressServer = require("./express");
const app = createExpressServer();
const createRoutes = require("./routes");
const errorHandlingMiddleware = require("./lib/error/error-handlers");
const dbManager = require("./db/index");
const loadDbInstances = (appDb) => {
    require("./db/model/survey")(appDb);
};

const startServer = () => new Promise((resolve) => {

    const port = process.env.PORT || 4000;
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

