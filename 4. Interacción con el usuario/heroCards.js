/**
 * ejercicio 03
 * aqui aprenderemos a como utilizar tarjetas, para mostrar de una forma mas elegante
 * cualquier tipo de informacion al usuario.
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
    function (session) {
        /**
         * un hero card, es un tipo de tarjeta que permite mostrar basicamente de todo un poco
         * imagenes, botones links, etc
         * esta se crea a traves del builderHeroCard,
         * pasando como parametros de configuracion un set de atributos, como el titulo, subtitulo
         * images, textos entre otros.
         * notese tambien como dentro de la imagen se carga un CardImage con la url de la imagen
         * y en el buttons se carga un CardAction.openUrl, lo que indica que se debe abrir la url
         * pasada por parametro.
         */
        var heroCard = new builder.HeroCard(session)
            .title('Esta es una tarjeta de tipo Hero Card')
            .subtitle('Este es su correspondente subtítulo')
            .text('Sigan a Marcelo Felman en Twitter: @mfelman')
            .images([
                builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Aprende')
            ]);

        // Adjuntamos la tarjeta al mensaje
        /**
         * aqui agregamos el heroCard al mensaje que se le va a mandar al usuario
         * y a traves de un session.send emitimos dicho mensaje.
         */
        var msj = new builder.Message(session).addAttachment(heroCard);
        session.send(msj);
    }
]);