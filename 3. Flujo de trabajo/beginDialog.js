/**
 * ejercicio 01
 */
var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
/**
 * tenemos un dialogo raiz "/", donde se origina la conversacion con el bot
 * donde le preguntamos al usuario como se llama, le escribimos un saludo
 * y lo reenviamos al siguiente dialogo "/preguntarLugar"
 * esto va creando la pila de dialogos.
 */
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    }
]);
/**
 * en este dialogo, preguntamos donde se encuentra la presona
 * y finalmente le mandamos un saludo y finalizamos el dialogo.
 */
bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿Dónde estás?');
    },
    function (session, results) {
        let lugar = results.response;
        session.endDialog(`Saludos por ${lugar}`);
    }
]);