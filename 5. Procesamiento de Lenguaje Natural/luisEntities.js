/**
 * ejercicio 02
 * en este ejercicio aprenderemos a detectar las entities que nos devuelve LUIS
 * y mostrar mensajes segun las entities recibidas. (LEER luisIntents, para conocer la logica de los IntentDialogs)
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
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisApp}?subscription-key=${luisKey}&timezoneOffset=0.0&verbose=true`;

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Esta función se ejecuta cuando el Intent == ordenarTaxi
dialog.matches('ordenarTaxi', [
    function (session, args, next) {
        // Extraer las entidades reconocidas por LUIS
        /**
         * para encontrar las entidades encontradas en la respuesta que nos manda LUIS
         * procedemos a crear un builder.EntityRecognizer y a su vez
         * utilizamos el metodo "findAllEntities", donde en primer lugar extraemos
         * las entidades que se encuentran dentro del objeto "args" en el atributo "entities",
         * como segundo parametro debemos mandarle el tipo de entidad que debe extraer ("lugar")
         * este nombre o tipo de entidad debe coincidir con las establecidas en LUIS
         */
        var barrios = builder.EntityRecognizer.findAllEntities(args.entities, 'lugar');
        /**
         * como logica extra agregamos, si tenemos al menos 1 barrio dentro del arreglo de barrio
         * el mensaje tiene la forma de "enviando un taxi al barrio [0]"
         * y si el barrio tiene al menos otro barrio extra agregamos mas string al mensaje
         * para finalmente mandar el mensaje a traves del session.send
         */
        if (barrios.length > 0) {
            let msj = 'Enviando un taxi';
            msj += ` de **${barrios[0].entity}**`;

            if(barrios.length > 1) {
                msj += ` a **${barrios[1].entity}**`;
            }

            session.send(msj);
        }
        /**
         * en caso de no existir ningun barrio, mandaremos el texto "a donde lo envio" ya que no se tiene
         * o no se consiguio ninguna entidad en la respuesta de LUIS, por lo que deberian agregarse nuevas
         * funciones al motor de nuestra app en LUIS
         */
        else {
            session.send('¿A dónde lo envío?');
        }
    }
]);

dialog.matches('cancelarTaxi', [
    function (session, args, next) {
        session.send('Ok, cancelaré tu taxi.')
    }
]);

//Este es el Default, cuando LUIS no entendió la consulta.
dialog.onDefault(builder.DialogAction.send("No entendí. Me lo decís de nuevo pero de otra manera, por favor?"));