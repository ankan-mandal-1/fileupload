const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer  = require('multer')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true, parameterLimit: 50000 })); 
app.use(express.static(__dirname + "/public"));


//Multer Connection-------------------------------------------------------------
var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'public/upload')
    },
    filename: function(req, file, cb){
      console.log(file);
      let fullName = file.originalname;
      let todot = fullName.indexOf('.');
      let shortName = fullName.substring(0, todot);
      cb(null, shortName + '-' + 'hello' + '.png');
    }
  })
  
  var upload = multer({
    storage: storage
  })
  //Multer Connection END---------------------------------------------------------

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', upload.single('image'), (req, res) => {
    console.log(req.file)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server started ' + port );
})
