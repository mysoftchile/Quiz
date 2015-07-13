var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controllers.js')
var creditsController = require('../controllers/creditscontrollers.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' }); //Nombre de vista, parametros
});

router.get('/quizes/question', quizController.question)
router.get('/quizes/answer', quizController.answer)
router.get('/author', creditsController.creditos)


module.exports = router;
