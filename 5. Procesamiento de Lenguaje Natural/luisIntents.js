/**
 * ejercicio 01
 * en este ejercicio aprenderemos a detectar intents recibidos de LUIS
 * y abrir los dialogos correspondientes segun el intent recibido a traves de los IntentsDialogs
 */
var restify = require('restify');
var builder = require('botbuilder');
var dotenv = require('dotenv');

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

// Para utilizar variables de entorno
dotenv.config(); 

let luisApp = process.env.LUIS_APP;
let luisKey = process.env.LUIS_KEY;

// Crear un procesador LUIS que apunte a nuestro modelo en el root (/)
// el root es el api donde se levanto la aplicacion de LUIS
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisApp}?subscription-key=${luisKey}&timezoneOffset=0.0&verbose=true`;

// a traves del recognizer (el cual es del tipo LUIS), por que vamos a utilizar a LUIS
/* 
    de igual manera utilizamos IntentDialog,
    los que significa que el dialog que se va a ejecutar
    debe coincidir con el intent recibido por LUIS
    en otras palabras el IntentDialog ejecuta el dialogo que corresponda
    al intent devuelto por luis.
    Esto se logra a traves del "dialog.matches" que nos brindan este tipo de dialogs.
    cabe destacar que se recomienda que los intents tengan el mismo nombre de los dialogs.
*/
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Esta función se ejecuta cuando el Intent == ordenarTaxi
dialog.matches('ordenarTaxi', [
    function (session, args, next) {
        builder.Prompts.text(session, '¿A dónde lo envío?');
    },
    function(session, args) {
        session.send(`Enviando taxi a **${args.response}**`)
    }
]);

// Esta función se ejecuta cuando el Intent == cancelarTaxi
dialog.matches('cancelarTaxi', [
    function (session, args, next) {
        session.send('Ok, cancelaré tu taxi.')
    }
]);

//Este es el Default, cuando LUIS no entendió la consulta.
// en dado caso que ningun intent o respuesta de luis haya coincidido con los dialogs 
// que hemos definidos aqui.
dialog.onDefault(builder.DialogAction.send("No entendí. Me lo decís de nuevo pero de otra manera, por favor?"));