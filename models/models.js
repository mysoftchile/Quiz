var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Carga Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  {
      dialect: protocol,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,  // solo SQLite (.env)
      omitNull: true      // solo Postgres
  }
);
// Importar definicion de la tabla Quiz/ con ruta a definición de la tabla
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz //Expotar definición de la tabla quiz

//Crea BD y la inicializa (Al sincronizar el modelo)
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate( 
        [ {pregunta: 'Capital de Italia',   respuesta: 'Roma'},
          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}
        ]
      ).then(function(){console.log('Base de datos inicializada')});
    };
  });
});
