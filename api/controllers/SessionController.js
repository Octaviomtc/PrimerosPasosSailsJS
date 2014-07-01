module.exports = {

  _config: {},

  'new': function (req, res){

    var oldDateObj = new Date();
    var newDataObj = new Date(oldDateObj.getTime() + 60000);
    req.session.cookie.expires = new Date(oldDateObj.getTime() + 60000);
    req.session.authenticated = true;
    console.log(req.session);
    res.view('session/new');
  }


};
