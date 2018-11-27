/*
    EJERCICIO #04
    como dependencias tenemos restify que nos permite levantar un web service ligero
    y el botbuilder el cual nos permite crear el bot.
*/
var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
// levantamos el servidor y escuchamos un puerto en especifico.
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.

/*
    notese como eliminamos el consoleConnector y agregamos el chatConnector,
    esto nos permite conectarnos a los distintos canales permitidos por el botbuilder (slack, facebook, etc etc)
    como estamos probando en local, los campos appId y appPassword podemos dejarlos en blanco.
    pero para produccion si debemos agregarle las conexiones pertinentes.
*/
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
// notese como en restify estaremos escuchando en la siguiente url
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);
    }
]);

/**
 * con el bot framework emulator, podemos probar nuestro bot
 * para ello debemos decirle a que bot debe escuchar a traves de la url donde este corriendo nuestro bot
 * la cual especificamos con restify.
 * se recomienda hacer debug para verificar como van corriendo nuestras variables
 */