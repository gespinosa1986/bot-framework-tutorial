/*
    EJERCICIO #03
*/
var builder = require('botbuilder');
/*
    misma funcion que el ejemplo "holaBot"
*/
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        /*
            aqui capturamos el mensaje que el usuario nos ha dicho y reutilizarlos
            a nuestra conveniencia, esto a traves del message.text del session
        */
        let msj = session.message.text;
        session.send(`Me dijiste: ${msj}`);
    }
]);