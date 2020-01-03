"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var path = require("path");
var App = /** @class */ (function () {
    function App() {
        var app = express();
        var indexDir = path.join(__dirname, "../public");
        app.use(express.static(indexDir));
        var storageConfig = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads");
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname + " - " + Date.now());
            }
        });
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        // app.use(multer({ dest: "uploads" }).single("filedata"));
        var upload = multer({ storage: storageConfig, fileFilter: fileFilter });
        // app.post("/upload", (req: express.Request, res: express.Response) =>
        app.post("/upload", upload.single("filedata"), function (req, res) {
            var fileData = req.file;
            console.log(fileData);
            if (!fileData) {
                res.send("Failed to load a file");
            }
            else {
                res.send("File uploaded");
            }
        });
        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            console.log("Server listen on port: ", port);
        });
    }
    return App;
}());
new App();
//# sourceMappingURL=App.js.map