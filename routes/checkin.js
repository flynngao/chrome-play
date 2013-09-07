
/*
 * GET users listing.
 */

exports.checkin = function(req, res){
  res.render("checkin",{uuid:req.query.uuid});
};