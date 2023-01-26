const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const conn = mongoose.connection;
const grid = require('gridfs-stream');
const upload = require('../utils/upload');
let gsk, gridbucket;
conn.once('open',() =>{
    gridbucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gsk = grid(conn.db, mongoose.mongo)
    gsk.collection('fs')
})
const url = "http://localhost:8000"

router.post("/image", upload.single('file'),async(req,res,next) =>{
try{
    if(!req.file){
        return res.status(404).json("Image not found")
    }else{
        const imageURL = `${url}/file/${req.file.filename}`
        res.status(200).json(imageURL)
    }
}catch(err){
        return res.status(500).json(err.message)
    }
})

router.get("/getImage/:filename", async(req,res,next) =>{
    try{
        const file = await gsk.files.findOne({filename:req.params.filename});
        const readStream = gridbucket.openDownloadStream(file._id);
        readStream.pipe(res)
    }catch(err){
        return res.status(500).json(err.message)
    }
})

module.exports = router;

