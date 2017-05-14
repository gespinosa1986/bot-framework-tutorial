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
bot.dialog('/', [
    function (session) {
        var msg = new builder.Message(session)
            .text("Hola! Elige una opción.")
            .suggestedActions([
                builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
                builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
                builder.CardAction.imBack(session, "productId=1&color=red", "Red")
            ]);
        session.send(msg);
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);
    }
]);