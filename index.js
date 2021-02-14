//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://adm-rachana:test123@cluster0.s8kdv.mongodb.net/memeDB", {useNewUrlParser: true, useUnifiedTopology: true});

const memesSchema = {
  name: String,
  caption: String,
  url: String
};

const Meme = mongoose.model("Meme", memesSchema);



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.get("/view", function(req, res) {

  Meme.find({}, function(err, memes){

    res.render("view", {
      memes: memes
    });

    //res.send("Yayy!");

  });

});

app.post("/", function(req, res) {

  const meme = new Meme({
    name: req.body.fName,
    caption: req.body.caption,
    url: req.body.url
  });

  meme.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });

  //res.send("Meme submitted successfully!!");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000.");
});
