'use strict';

var todoModel = require('../server/todo/todoModel.js'),
  todoCtrl = require('../server/todo/todoCtrl.js'),
  mongoose = require('mongoose'),
  config = require('../server/config.js')['TEST'],
  userModel = require('../server/user/userModel.js'),
  user,
  tagModel = require('../server/tag/tagModel.js'),
  tag;



describe('todoCtrl.js', function () {

  beforeEach(function (done) {

    function connect() {
      mongoose.connect(config.db.conn, cleanTodos);
    }

    function cleanTodos() {
      todoModel.remove({}, false).exec(cleanUsers);
    }

    function cleanUsers() {
      userModel.remove({}, false).exec(cleanTags);
    }

    function cleanTags() {
      tagModel.remove({}, false).exec(createNewUser);
    }

    function createNewUser() {
      userModel.create({}, findNewUser);
    }

    function findNewUser() {
      userModel.find({}, populateUser);
    }

    function populateUser (err, data) {
      user = data[0];
      createNewTag();
    }

    function createNewTag() {
      tagModel.create({ _owner: user._id, Title: 'example tag', Type: 1 }, findNewTag)
    }

    function findNewTag() {
      tagModel.find({}, function (err, data) {
        tag = data[0];
        done();
      });
    }

    connect();
  });

  afterEach(function () {
    mongoose.connection.close();
  });

  it('works', function () {
    expect(1).toBe(1);
  });

  it('gets todos', function (done) {
    todoModel.create({ id: 123, Title: 'test title' }, function (err, data) {
      todoModel.find({ Title: 'test title' }, function (err, tasks) {
        expect(tasks.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  it('has a valid model', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|d',
      DueDate: new Date(2015, 3, 28),
      Tags: [ tag._id ],
      Contexts: ['hello'],
      Description: 'test description',
      Complete: false
    };

    todoModel.create(source, function (err) {
      expect(err).toBe(null);
      todoModel.findOne({_owner: user._id }, function (err, data) {
        expect(err).toBe(null);
        expect(data._owner).toBeUndefined();
        expect(data.Title).toBe(source.Title);
        expect(data.RepeatFormula).toBe(source.RepeatFormula);
        expect(data.DueDate.toString()).toBe(source.DueDate.toString());
        expect(data.Tags[0]._id).toBe(source.Tags[0]._id);
        expect(data.Contexts[0]).toBe(source.Contexts[0]);
        expect(data.Description).toBe(source.Description);
        expect(data.Complete).toBe(false);

        done();
      });

    });
  });

  it('saves models', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|d',
      DueDate: new Date(2015, 3, 28),
      Tags: [ tag._id ],
      Contexts: ['hello'],
      Description: 'test description',
      Complete: false
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();
      done();
    });

  });
});