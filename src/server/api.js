import express from 'express';
import { getConnection } from './dbconfig';
import { getUserModel } from './models/user';
import { getPostModel } from './models/post';

export function getRouter() {
  var router = express.Router();

  router.route('/users').get(getUsers);
  router.route('/users/add').post(addUser);
  router.route('/users/:id').get(getUser);
  router.route('/posts').get(getPosts);
  router.route('/posts/add').post(addPost);
  router.route('/posts/:id').get(getPost);

  return router;
}

function getDocuments(req, res, next, model) {
  var conn = getConnection();
  conn.on('error', function(err) {
    next(`Could not connect to the database: ${err.errmsg}`);
  });
  conn.once('open', function() {
    var Model = model();
    Model.find(function (err, items) {
        if (err) {
          next(err);
        } else {
          res.send(items);
        }
        conn.close();
    });
  });
}

function addDocument(req, res, next, model) {
  var conn = getConnection();
  conn.on('error', function(err) {
    next(`Could not connect to the database: ${err.errmsg}`);
  });
  conn.once('open', function() {
    var Model = model();
    var data = req.body;
    var instance = new Model(data);
    instance.save(function(err, _inst) {
      if (err) {
        next(err);
      } else {
        res.send(_inst);
      }
      conn.close();
    });
  });
}

function updateDocument(req, res, next, model) {
  var conn = getConnection();
  conn.on('error', function(err) {
    next(`Could not connect to the database: ${err.errmsg}`);
  });
  conn.once('open', function() {
    var Model = model();
    var data = req.body;
    if (!data || !data.id) {
      next('No id provided.');
      conn.close();
    } else {
      if (data.set) {
        Model.update({ _id: data.id }, { $set: data.set }, function(err, _inst) {
          if (err) {
            next(err);
          } else {
            res.send(_inst);
          }
          conn.close();
        });
      } else {
        conn.close();
      }
    }
  });
}

function getDocument(req, res, next, model) {
  var conn = getConnection();
  conn.on('error', (err) => {
    next(`Could not connect to the database: ${err.errmsg}`);
  });
  conn.once('open', () => {
    var Model = model();
    var id = req.params.id;
    Model.findById(id, (err, _inst) => {
      if (err) {
        next(`Could not find the document for the passed id[${id}]`);
      } else {
        res.send(_inst);
      }
      conn.close();
    });
  });
}

function getUsers(req, res, next) {
  getDocuments(req, res, next, getUserModel);
}

function addUser(req, res, next) {
  addDocument(req, res, next, getUserModel);
}

function getUser(req, res, next) {
  getDocument(req, res, next, getUserModel);
}

function getPosts(req, res, next) {
  getDocuments(req, res, next, getPostModel);
}

function updatePost(req, res, next) {
  updateDocument(req, res, next, getPostModel);
}

function addPost(req, res, next) {
  addDocument(req, res, next, getPostModel);
}

function getPost(req, res, next) {
  getDocument(req, res, next, getPostModel);
}
