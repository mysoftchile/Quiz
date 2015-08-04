var path = require('path');

// Carga Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
  {dialect: "sqlite", storage: "quiz.sqlite"}
);

// Importar definicion de la tabla Quiz/ con ruta a definición de la tabla
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz //Expotar definición de la tabla quiz

//Crea BD y la inicializa (Al sincronizar el modelo)
sequelize.sync().then(function ()
{
      // success(..) ejecuta el manejador una vez creada la tabla
      Quiz.count().then(function (count){
            if(count === 0) {   // la tabla se inicializa solo si está vacía
                  Quiz.create({ pregunta: 'Capital de Italia',
                      	            respuesta: 'Roma'
                      	         })
              .then(function(){console.log('Base de datos inicializada')});
            };
      });
}); 
