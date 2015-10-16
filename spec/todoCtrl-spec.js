'use strict';

var todoModel = require('../server/todo/todoModel.js'),
  todoCtrl = require('../server/todo/todoCtrl.js'),
  mongoose = require('mongoose'),
  moment = require('moment'),
  config = require('../server/config.js'),
  tagActionModel = require('../server/tag/tagActionModel.js'),
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

    function populateUser(err, data) {
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
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: false
    };

    todoModel.create(source, function (err) {
      expect(err).toBe(null);
      todoModel.findOne({ _owner: user._id }, function (err, data) {
        expect(err).toBe(null);

        expect(data).toBeDefined();
        expect(data._owner).toBeUndefined();
        expect(data.Title).toBe(source.Title);
        expect(data.RepeatFormula).toBe(source.RepeatFormula);
        expect(data.DueDate.toString()).toBe(source.DueDate.toString());
        expect(data.Tags[0].toString()).toBe(tag._id.toString());
        expect(data.Contexts[0]).toBe(source.Contexts[0]);
        expect(data.Description).toBe(source.Description);
        expect(data.Completed).toBe(false);

        done();
      });

    });
  });

  it('saves models', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|d|t',
      DueDate: new Date(2015, 3, 28),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: false
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();
      done();
    });

  });

  it('processes completes', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '',
      DueDate: new Date(2015, 3, 28),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(true);

      done();
    });

  });

  it('processes repeats from due date', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|d|d',
      DueDate: new Date(2015, 3, 28),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(data.DueDate.toString()).toBe(new Date(2015, 3, 29).toString());
      done();
    });
  });

  it('processes week repeats', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|w|d',
      DueDate: new Date(2015, 3, 1),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(data.DueDate.toString()).toBe(new Date(2015, 3, 8).toString());
      done();
    });
  });

  it('processes month repeats', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|M|d',
      DueDate: new Date(2015, 3, 1),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(data.DueDate.toString()).toBe(new Date(2015, 4, 1).toString());
      done();
    });
  });

  it('processes year repeats', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|y|d',
      DueDate: new Date(2015, 3, 1),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(data.DueDate.toString()).toBe(new Date(2016, 3, 1).toString());
      done();
    });
  });

  it('processes 2 month repeats', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '2|M|d',
      DueDate: new Date(2015, 3, 1),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(data.DueDate.toString()).toBe(new Date(2015, 5, 1).toString());
      done();
    });
  });

  it('processes repeats from today', function (done) {
    var source = {
      _owner: user._id,
      Title: 'test title',
      RepeatFormula: '1|d|t',
      DueDate: new Date(2015, 3, 28),
      Tags: [tag._id],
      Contexts: ['hello'],
      Description: 'test description',
      Completed: true
    };

    todoCtrl.save(source, function (err, data) {
      expect(err).toBe(null);
      expect(data._id).toBeDefined();

      expect(data.Completed).toBe(false);
      expect(moment(data.DueDate).toString()).toBe(new moment().add(1, 'd').toString());
      done();
    });
  });

  it('processes tag actions', function (done) {
    var toTag = {
      _owner: user._id,
      Title: 'example tag',
      Type: 1
    };


    tagModel.create(toTag, { upsert: true }, function (err, data) {
      toTag = data;

      tagActionModel.create({
        Trigger: 'onComplete',
        Do: 'moveTo',
        FromTag: tag._id,
        ToTag: toTag._id
      }, function () {

      });

      tagActionModel.create({
        Trigger: 'onComplete',
        Do: 'moveTo',
        FromTag: toTag._id,
        ToTag: tag._id
      }, function () {

      });

      tag.save(saveTodo);
    });

    function saveTodo(err, tagData) {
      expect(err).toBe(null);
      var source = {
        _owner: user._id,
        Title: 'test title',
        RepeatFormula: '',
        DueDate: new Date(2015, 3, 28),
        Tags: [tag._id],
        Contexts: ['hello'],
        Description: 'test description',
        Completed: true
      };

      todoCtrl.save(source, test);
    }

    function test(err, data) {
      expect(data.Tags.length).toBe(1);
      //expect(data.Tags[0].toString()).toBe(toTag._id.toString());
      done();
    }
  });
});