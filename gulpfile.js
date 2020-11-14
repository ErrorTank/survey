const gulp = require("gulp");
const spawn = require('child_process').spawn;
const nodemon = require("gulp-nodemon");
const rimraf = require('rimraf');


const stylusCompiler = {
    watch: (desk, done) => {
        return require("./compile-stylus").createCompiler(desk, done).watch();
    },
    compile: (desk, done) => {
        return require("./compile-stylus").createCompiler(desk, done).compile();
    }
};

const startServer = async (env) => {
    return nodemon({
        script: './server/index.js',
        ext: 'js',
        ignore: [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "client/*",
            "public/*",
            "webpack.config.js",
            "webpack.prod.config.js",
            "build/*",
            "dist/*"
        ],
        env,
        stdout: true,
        exec: "babel-node"
    })
};

gulp.task("dev", (done) => {
    return startServer({'NODE_ENV': 'development'}).then(() => {
        rimraf('./build/**/*', () => {
            console.log("Delete old build successfully!");
            stylusCompiler.watch("build", done).then(() => {
                // spawn("node", ["./scripts/copy-assets", "dev"], {stdio: "inherit"})
                if (!/^win/.test(process.platform)) { // linux
                    return spawn("webpack", ["--watch", "-p"], {stdio: "inherit"});
                } else {
                    return spawn('cmd', ['/s', "/c", "webpack", "--w", "-p"], {stdio: "inherit"});
                }
            }).catch(err => console.log(err));
        });

    })



});



gulp.task("build-prod", (done) => {
    return new Promise(res => {
        rimraf('./dist/**/*', () => {
            console.log("Delete old build successfully!");
            return stylusCompiler.compile("dist", done).then(() => {
                // spawn("node", ["./scripts/copy-assets", "prod"], {stdio: "inherit"})

                if (!/^win/.test(process.platform)) { // linux

                    spawn("webpack", [ "--config" , " ./webpack.prod.config.js"], {stdio: "inherit"});
                } else {

                    spawn('cmd', ['/s', "/c", "webpack",  "--config" , "./webpack.prod.config.js"], {stdio: "inherit"});
                }
                res()
            }).catch(err => {
                console.log(err);
                res()
            });
        });
    })


});

