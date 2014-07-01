var bcrypt = require('bcrypt');

module.exports = {

  _config: {},

  'new': function (req, res){


    res.view('session/new');
  },

  'create': function (req, res, next){
      //Validacion usuario y conrtraseña vacias
      if(!req.param('email') || !req.param('password')){

        var usernamePasswordRequireError = [{name: "usernamePasswordRequireError", massage: "You must enter both a username and password." }];

        req.session.flash = {
          err: usernamePasswordRequireError
        }

        res.redirect('/session/new');
        return;

      }

    //Validar usuario correcto
    //findOneByEmail() es una funcion dinamica para buscar en el modelo esto actua de manera particular por atributo
    User.findOneByEmail(req.param('email'), function foundUser (err, user){

      if (err) return next(err);

        //if no user is found...
      if(!user){
          var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' not found.' }];
          req.session.flash = {
            err: noAccountError
          }
          res.redirect('/session/new');
          return;
      }

      //Compare password from the form params to the encrypted password of the user found
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
        if (err) return next(err);

        //if password from de the form doesn't match the password from the database ...
        if (!valid){
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination' }];
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }

        //log User in
        req.session.authenticated = true;
        req.session.User = user;


        //Redirect to profile

        res.redirect('/user/show/' + user.id);
      });
    });
  },

  destroy: function(req, res, next){
    req.session.destroy();

    res.redirect('/session/new');
  }





};
