/*
    EJERCICIO #03
*/
var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

/*
    como se menciona en el "holaBot.js", aqui tenemos un set de 2 funciones
    las cuales representan las formas de interaccion con el usuario.
    en este caso preguntamos el nombre del usuario en la primer funcion y luego 
    en la segunda le respondemos al usuario.
*/
bot.dialog('/', [
    function (session) {
        /*
            notese como no hacemos un session.send, si no por el contrario un builder.Promt.text
            esto en esencia nos permite mandarle un texto al usuario, pero tambien hacer que el bot espere
            por una respuesta o un input del usuario antes de continuar.
            NOTA: aqui el bot espera que el usuario le responda con texto.
        */
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);
    }
]);