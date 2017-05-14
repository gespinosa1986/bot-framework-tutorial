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

// Exponer un método para disparar el mensaje proactivo
server.post('/api/proactivo', proactivo);
// Para recibir contenido JSON
server.use(restify.bodyParser());

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

// Mensaje proactivo
function proactivo(req) {
    //TODO
    let address = '{"id":"h7jblkc01c214iajl","channelId":"emulator","user":{"id":"default-user","name":"User"},"conversation":{"id":"2ckd2eina4k5b3le1c"},"bot":{"id":"default-bot","name":"Bot"},"serviceUrl":"http://localhost:62711"}';
    
    var msg = new builder.Message().address();
    msg.text("**Esto es un mensaje proactivo!**");
    msg.textLocale('es-ES');
    bot.send(msg);
}