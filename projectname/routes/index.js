var express = require('express');
var router = express.Router();
var database = require("./database")
/* GET home page. */

router.get('/', function (req, res, next) {
  database.find({}, function (err, data) {
    if (err) {
      console.log(err);
    }

    else {
      console.log(data);
      res.render('index', { data: data });

    }
  })

});

router.post("/submit", function (req, res, next) {
  database.create({
    name: req.body.task
  })
  res.redirect("/")
});



router.get("/delete/:id", function (req, res) {
  var id = req.params.id;
  database.findByIdAndRemove(id, function (err) {
    res.redirect("/")

  })
})

router.get("/edit/:id", function (req, res) {
  var id = req.params.id;
  database.find({}, function (err, data) {
    res.render('update', { actual_data: data, actual_id: id });
  })


})
router.post("/edit/:id", function (req, res) {
  var id = req.params.id;
  database.findByIdAndUpdate(id, { name: req.body.updatedName }, function (err) {
    res.redirect("/")
  })

})

module.exports = router;
