const express = require("express");
var fs = require('fs');

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.get("/api/:nimi", (req, res) => {
    var obj = JSON.parse(fs.readFileSync('./text.json', 'utf8'));
    const nimi = String(req.params.nimi);
    console.log(nimi);
    console.log(obj);
    res.json({ message: obj[nimi] });

});

app.post("/api", (req, res) => {
  const nimi = req.body;
  var obj = JSON.parse(fs.readFileSync('./text.json', 'utf8'));
  obj.push(nimi);

  fs.writeFile("/text.json", obj, 'utf8', function (err) {
      if (err) {
          console.log("Virhe kirjoituksessa");
          return console.log(err);
      }
  });

  res.json(obj);
});



app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
