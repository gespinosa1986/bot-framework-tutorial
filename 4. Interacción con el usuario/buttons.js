&/**
 * ejercicio 02
 * aqui aprenderemos a como agregar botones en nuestro chat
 * para facilitar la iteraccion con el usuario
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
bot.dialog('/', [
    function (session, results, next) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        session.dialogData.nombre = results.response;
        builder.Prompts.number(session, `Ok, ${session.dialogData.nombre}. ¿Cuál es tu edad?`);
    },
    function (session, results) {
        session.dialogData.edad = results.response;
        builder.Prompts.time(session, `¿Qué hora es?`);
    },
    function (session, results) {
        session.dialogData.hora = builder.EntityRecognizer.resolveTime([results.response]);
        /**
         * como primer boton que se muestra es el de la preferencia, esto se lleva a cabo a traves
         * del parametro "listStyle", al cual se le pasa como valor un ListStyle.button.
         * automaticamente esto muestra el par de botones necesarios para que el usuario seleccione la opcion que desea.
         * este se adecua al tipo de Promt que se esta seteando, en este caso al ser choice
         * se adapta automaticamente.
         */
        builder.Prompts.choice(session, '¿Cuál prefieres?', 'Mar|Montaña', { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        /**
         * de igual manera para la confirmacion (Promt comfirm), podemos mostrar un nuevo boton
         * a traves del "listStyle: builder.ListStyle.button", aqui vemos nuevamente como el boton
         * se adapta al tipo de Promt que estamos definiendo.
         * notese, como si el usuario no desea pinchar un boton y en lugar de eso desea escribir su respuesta
         * esto tambien es valido y el bot sigue reconociendo la respuesta del usuario.
         */
        session.dialogData.preferencia = results.response.entity;
        builder.Prompts.confirm(session, '¿Quieres ver un resumen?', { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        if (results.response) {
            session.endDialog(`Me contaste que tu nombre es **${session.dialogData.nombre}**, tienes **${session.dialogData.edad}** años, son las **${session.dialogData.hora}** y prefieres **${session.dialogData.preferencia}**`);
        }
        else {
            session.endDialog('Adios!');
        }
    }
]);