﻿//get a preguntas
exports.question = function (req, res) {
	res.render('quizes/question', { pregunta:'Capital de Italia' });
};            

exports.creditos = function (req, res) {
    res.render('quizes/author', { credito: 'Página creada por Cristian Morales' });
};

//get a respuestas
exports.answer = function (req, res) {
	
	respuesta = req.query.respuesta;

	 if(respuesta === 'Roma')
	{
		res.render('quizes/answer', { respuesta: 'Su respuesta:' + respuesta + ', es correcta !!!' });
	}
	else
	{
		res.render('quizes/answer', { respuesta: 'Su respuesta es Incorrecta' });
	}

};
