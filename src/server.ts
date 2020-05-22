import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

// url-exists to check if image Url is valid or not
var urlExists = require("url-exists");

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get(
    "/filteredimage",
    async (req: express.Request, res: express.Response) => {
      let imageURL = String(req.query.image_url);
      if (!imageURL) {
        res.status(400).send("URL provided is blank.");
      } else {
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (imageURL.match(regex)) {
          urlExists(imageURL, function (err: any, exists: any) {
            if (!exists) {
              res
                .status(400)
                .send("Error 404 for image url: URL provided does not exists.");
            }
          });
        } else {
          res.status(400).send("URL provided is invalid.");
        }
        try {
          let responseImage = await filterImageFromURL(imageURL);
          res.status(200).sendFile(responseImage, async () => {
            await deleteLocalFiles([responseImage]);
          });
        } catch (err) {
          console.error(err);
          res.status(415).send("Something not good. Unsupported Type.");
        }
      }
    }
  );

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
