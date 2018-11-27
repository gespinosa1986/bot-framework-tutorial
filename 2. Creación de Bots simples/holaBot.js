/*
    EJERCICIO #01
*/
var builder = require('botbuilder');

// el consoleConnector, nos permite unir (utilizar) la consola con el bot que crearemos en el siguiente paso
var connector = new builder.ConsoleConnector().listen();
// instanciamos un bot de tipo universalBot (el mas utilizado)
// al pasarle el connector, este bot esta escuchando a nuestra consola
var bot = new builder.UniversalBot(connector);

/*
    creacion del dialogo raiz, el cual recibe como segundo argumento
    un array de funciones, donde cada funcion es una nueva manera
    de interactuar con el usuario.

    hay un objeto llamado session el cual es una manera de comunicarnos con un usuario.
    se emite un mensaje "hola mundo", al usuario, al cual si saludamos el bot solamente
    nos respondera hola mundo.
*/

bot.dialog('/', [
    function (session) {
        session.send('Hola Mundo!');
    }
]);