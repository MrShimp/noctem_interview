var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function(req, res, next){
  var score = parseInt(req.body.question1)+parseInt(req.body.question2) + parseInt(req.body.question3)+ parseInt(req.body.question4)+parseInt(req.body.question5)+parseInt(req.body.question6)+parseInt(req.body.question7);
  console.log(score);
  var file ={
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,
    question5: req.body.question5,
    question6: req.body.question6,
    question7: req.body.question7,
    username: req.body.username,
    score: score
  };

  const uri = "mongodb+srv://root:root@cluster0-cxkce.gcp.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    if (err) throw err;
    console.log("connect success");
    const collection = client.db("interview").collection("interview");

    collection.insertOne(file, function(err, res) {
      if (err) throw err;
      console.log("insert success");
      client.close();
    });

    // perform actions on the collection object
  });

  res.render('result', { score:  score} );
});

module.exports = router;
