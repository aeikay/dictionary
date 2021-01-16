var express = require('express');
var router = express.Router();
const https = require('https')
const bodyParser = require('body-parser')
const app = express();


var body = " ";
app.use(bodyParser.urlencoded({extended:true}))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

router.post('/result',(req,res)=>{
  var api_key = "j1f49w7h0vfaxdwb3d51lj3cy57emtxtdpi27b8emr0t3yatc";
    var word  = req.body.word;
    var query = " ";
    var url   = "https://api.wordnik.com/v4/word.json/"+ word + "/definitions?limit=200&sourceDictionary=wordnet&includeRelated=false&useCanonical=false&includeTags=false&api_key=" + api_key;

    https.get(url,(response)=>{
    response.on("data",(chunk)=>{
        body+=chunk;
    })
    response.on('end',()=>{
        var wordnikData = JSON.parse(body);
        var meaning = wordnikData[0].text;
        var example = " 4";
        console.log(wordnikData[6].exampleUses[0].text);
        for(var i=0;i<7;i++){
          //  if(wordnikData[i].text!=[]){
          //    meaning = wordnikData[i].text;
          //  }
             example = wordnikData[6].exampleUses[0].text
          
        }
        // var example = wordnikData[0].exampleUses[0].text;
          res.render('result',{meaning,word,example})

    }) 
})
})

router.get('/pronounce',(req,res)=>{
  res.render('pronounce')
})
module.exports = router;
