/**
 * ejercicio 02
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
 * ene ste ejemplo relizaremos la finalizacion de un dialogo de una forma un poco distinta
 * en primer lugar en nuestro dialogo raiz, preguntamos por el nombre del usuario
 * luego iniciamos el dialogo "/preguntarLugar"
 * donde se pregunta donde esta la persona
 * pero notese como en aquel dialogo se hace un endDialogWithResult donde se finaliza el dialogo
 * retornando el resultado que indico el usuario y este valor
 * es retornado desde el dialogo principal.
 * esto es otra forma de finalizar dialogos.
 */
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    },
    function (session, results) {
        session.send(`Saludos por ${results.response}`);
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿Dónde estás?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);