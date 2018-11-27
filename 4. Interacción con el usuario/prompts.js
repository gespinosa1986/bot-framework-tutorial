/**
 * ejercicio 01
 * aqui veremos como utilizar alguno de los tipos de Promts, que brinda el botbuilder de microsoft
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
    /**
     * utilizando el patron de cascada, veremos todos los tipos de promts permitidos
     */
    /**
     * preguntamos como se llama el usuario
     * y estamos esperando una respuesta de tipo texto
     * la cual amacenamos en el dialogData del usuario
     */
    function (session, results, next) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    /**
     * preguntamos por la edad del usuario 
     * y estamos esperando una respuesta de tipo numerico
     * si el usuario ingresa texto, el bot automaticamente le manda un mensaje diciendo
     * que no puede procesar lo que introdujo que por favor agregue un numero
     * cabe destacar que este mensaje puede ser editado y modificado para que responda lo que nosotros queramos
     * cuando ocurra dicho caso
     * y nuevamente almacenamos en el dialogData la edad el usuario
     */
    function (session, results) {
        session.dialogData.nombre = results.response;
        builder.Prompts.number(session, `Ok, ${session.dialogData.nombre}. ¿Cuál es tu edad?`);
    },
    /**
     * en este apartado preguntaremos por la hora
     * donde estaremos esperando una respuesta de tipo time
     */
    function (session, results) {
        session.dialogData.edad = results.response;
        builder.Prompts.time(session, `¿Qué hora es?`);
    },
    /**
     * en este apartado preguntaremos al usuario que nos diga que prefiere y le pasamos un set de opciones
     * donde estaremos esperando una respuesta de tipo choice (de acuerdo a las opciones que le estamos pasando)
     * estas opciones se describen a traves del pipe "mar|montaña|etc ..."
     * adicionalmente y para guardar la hora optenida del step anterior,
     * utilizamos un EntityRecognizer.resolveTime, donde se decodifica un poco lo que ingreso el usuario
     * en dicha respuesta y se transforma esa data a un valor de tipo time, esto se hace a traves de chrono
     * lo cual permite decodificar el tiempo ingresado por el usuario.
     */
    function (session, results) {
        session.dialogData.hora = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.choice(session, '¿Cuál prefieres?', 'Mar|Montaña');
    },
    /**
     * en este apartado, preguntamos al usuario si desea ver un resumen de todo lo que ingreso
     * para ello se espera una respuesta de tipo confirm
     * adicionalmente guardamos la preferencia del usuario "mar|montaña", esto se extrae
     * del response.entity.
     */
    function (session, results) {
        session.dialogData.preferencia = results.response.entity;
        builder.Prompts.confirm(session, '¿Quieres ver un resumen?');
    },
    /**
     * finamente, verificamos si el usuario confirmo que desea ver un resumen
     * esto a traves de la existencia del results.response
     * y de haber aceptado terminamos el dialogo mostrando el mensaje correspondiente
     * y finalmente en caso contrario simplemente nos despedimos con un nuevo
     * endDialog.
     */
    function (session, results) {
        if (results.response) {
            session.endDialog(`Me contaste que tu nombre es **${session.dialogData.nombre}**, tienes **${session.dialogData.edad}** años, son las **${session.dialogData.hora}** y prefieres **${session.dialogData.preferencia}**`);
        }
        else {
            session.endDialog('Adios!');
        }
    }
]);