const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.post('/tasks/:id/done', tasksController.done);
router.post('/tasks/:id/delete', tasksController.delete);
router.post('/new', tasksController.new);
//read bd
router.get('/task/bd', tasksController.readAll);
//nuke bd

router.get('/task/nuke', tasksController.nukeAll);

module.exports = router;
