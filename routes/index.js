var express = require('express');
var router = express.Router();
var commonHelper = require('../common');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const[rows] = await commonHelper.database.run({sql: 'SELECT 123456789',});
  const row = JSON.stringify(rows[0][0]);
  res.send(row);
  //res.render('index', { title: 'Express' });
});

module.exports = router;
