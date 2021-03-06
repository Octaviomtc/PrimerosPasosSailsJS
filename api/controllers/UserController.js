/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  'new': function (req, res){
    res.view();
  },

  'create': function (req, res, next){
    User.create( req.params.all(), function userCreated(err, user){


      if (err) {
        //si los parametros no se cumplen redirecciona
        console.log(err);
        req.session.flash = {
            err: err //retorna los errores
        }


        return res.redirect('/user/new');
      }
      return res.redirect('/user/show/'+user.id);//Si todo sale bien retorna a un view con el usuario agregado
      // res.json(user);
    });
  },

  'show': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next("user desn't exist");
      res.view({
        user: user
      });
    });

  },

  'index': function (req, res, next) {
    User.find(function foundUsers (err, users){
      if (err) return next(err);

      res.view({
        users: users
      });
    });

  },

  'edit': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next("user doesn't exist");

      res.view({
        user: user
      });
    });

  },

  'update': function (req, res, next) {
    User.update(req.param('id'), req.params.all(), function userUpdated (err){
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });

  },

  'destroy': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);

      if (!user) return next("user doesn't exist");

      User.destroy(req.param('id'), function userDestroyed(err){
        if(err) return next(err);
      });

      res.redirect('/user');
    });

  }

};
