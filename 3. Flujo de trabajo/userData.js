/**
 * ejercicio 03
 * en este archivo nos encargamos de almacenar informacion en el session 
 * para poder percistir datos entre conversaciones, dialogos, etc.
 * en este archivo en especifico, almacenaremos informacion que es global para cualquier usuario
 * hay que identificar lo que es una data que solo es persistente en una conversacion o dialogo
 * y otra que sea informacion global para el usuario en especifico
 * de igual manera hay informacion que solo es persistente para un dialogo en especifico, por lo cual
 * al cerrar el dialogo la misma deberia ser desecha.
 * ejemplo claro, un dialogo de pedido de pizza, es informacion solamente persistente del dialogo pedidoPizza
 * ya que el mismo usuario puede pedirnos una pizza diferente en otra instancia de tiempo.
 * por ende aqui en userData almacenaremos informacion de caracter global del usuario
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
 * notese como aqui se chequea si tenemos el nombre o conocemos el nombre del usuario
 * y de ser asi pasamos al siguiente paso de la cascada o siguiente conversacion
 * de esa manera podemos saltarnos ese paso de la cascada y saludar directamente al usuario
 * NOTA, el result.response, solo es valido cuando el usuario escribe algo en el input
 * y se ejecuta cuando el bot le pregunta el nombre al usuario.
 */
bot.dialog('/', [
    function (session, results, next) {
        if (!session.userData.nombre) {
            builder.Prompts.text(session, '¿Cómo te llamas?');
        }
        else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            let msj = results.response;
            session.userData.nombre = msj;
        }

        session.send(`Hola ${session.userData.nombre}!`);
    }
]);