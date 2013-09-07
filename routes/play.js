
/*
 * GET home page.
 */
var uuid = require('uuid');


exports.index = function(req, res){
  console.log(uuid.v1());
  res.render('play', { title: 'Express',uuid: uuid.v1()});
};
