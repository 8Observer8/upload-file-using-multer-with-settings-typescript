import * as express from "express";
import * as multer from "multer";
import * as path from "path";

class App
{
    public constructor()
    {
        let app = express();
        let indexDir = path.join(__dirname, "../public");
        app.use(express.static(indexDir));

        const storageConfig = multer.diskStorage({
            destination: (req, file, cb) =>
            {
                cb(null, "uploads");
            },
            filename: (req, file, cb) =>
            {
                cb(null, file.originalname + " - " + Date.now());
            }
        });

        const fileFilter = (
            req: express.Request,
            file: Express.Multer.File,
            cb: (error: Error, acceptFile: boolean) => void) =>
        {
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg")
            {
                cb(null, true);
            }
            else
            {
                cb(null, false);
            }
        };

        // app.use(multer({ dest: "uploads" }).single("filedata"));
        let upload = multer({ storage: storageConfig, fileFilter: fileFilter });
        // app.post("/upload", (req: express.Request, res: express.Response) =>
        app.post("/upload", upload.single("filedata"), (req: express.Request, res: express.Response) =>
        {
            let fileData = req.file;
            console.log(fileData);
            if (!fileData)
            {
                res.send("Failed to load a file");
            }
            else
            {
                res.send("File uploaded");
            }
        });
        let port = process.env.PORT || 3000;
        app.listen(port, () =>
        {
            console.log("Server listen on port: ", port);
        });
    }
}

new App();
