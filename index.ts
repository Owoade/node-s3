import express from "express";
import { config } from "dotenv"
import multer from "multer"
import util from "util";
import fs from "fs"
import { getFileStream, uploadFile } from "./s3";
import cors from "cors";


config();

const app = express();

const PORT = process.env.PORT ?? 5000;

const upload = multer({ dest: 'uploads/' });

const unlinkFile = util.promisify(fs.unlink);

app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/images', upload.single('file'), async (req, res) => {

    console.log( req.body )
    const file = req.file
    console.log( file )
  
    
  
    const result = await uploadFile(file!)
    await unlinkFile( file!.path )
    console.log(result)
    const description = req.body.description
    res.send(`File Uploaded`)
  })

app.get("/get/:Key", async (req, res) => {
  const Key = req.params.Key;

  const fileStream =await  getFileStream( Key )

   fileStream.pipe( res )
})

app.listen(PORT, ()=> console.log("The server is running fine and good"));