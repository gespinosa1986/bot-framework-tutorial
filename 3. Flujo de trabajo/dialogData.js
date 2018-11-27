/**
 * ejercicio #04
 * aqui almacenaremos informacion que es persistente unicamente en un dialogo
 * y veremos como al ir cambiando de dialogos, esa data ya no es accesible.
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
 * creamos nuestro set de dialogos, compuesto por un dialogo raiz, donde se le pregunta el nombre 
 * al usuario, y posteriormente se hace una transision al dialogo preguntar lugar.
 * en dicho dialogo(/preguntarLugar), se le pregunta al usuario en donde se encuentra
 * y dicha informacion es almacenada en el dialogData del session.
 * finalmente terminamos el dialogo con endDialog y saludamos diciendo el lugar del usuario
 * y especificando que nos acordamos en dicho dialogo donde esta.
 * ahora bien, cuando volvemos al dialogo raiz (recordemos pila de dialogos al ir finalizando vamos volviendo),
 * vemos como si la data no esta en el userData, no tenemos acceso a ella por lo que se imprime un 
 * "ya no me acuerdo donde estas".
 * existe 
 */

 /**
  * recordando:
  * userData, es informacion para el usuario que persiste en todas las conversaciones
  * dialogData, es informacion que es solo visible en el dialogo donde es creada
  * conversationData, es informacion que es visible a todos los miembros de una conversacion.
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
    function (session) {
        if (session.dialogData.lugar) {
            session.send(`Saludos por ${session.userData.lugar}`);
        }
        else {
            session.send('Ya no me acuerdo donde estás.');
        }
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿Dónde estás?');
    },
    function (session, results) {
        session.dialogData.lugar = results.response;

        session.endDialog(`Saludos por ${session.dialogData.lugar} (me acuerdo en este diálogo!)`)
    }
]);