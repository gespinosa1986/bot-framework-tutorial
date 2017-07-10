# Desarrollo de Bots con Microsoft Bot Framework y Node.js
En este repositorio encontrarás todos los recursos utilizados en el entrenamiento "Desarrollo de Bots con Microsoft Bot Framework y Node.js" disponible en Microsoft Virtul Academy.

El contenido está distribuído en 9 secciones:
1. Introducción a Microsoft Bot Framework
2. Creación de Bots simples
3. Flujo de trabajo
4. Interacción con el usuario
5. Procesamiento de Lenguaje Natural
6. Localización
7. Middlware y comandos globales
8. Deployment e integración continua
9. Otros

## Introducción a Microsoft Bot Framework
Este módulo es simplemente introductorio. Simplemente mira los vídeos para entender cómo funcionan los bots.

## Creación de Bots simples
Tus primeros pasos en el desarrollo de bots

* **holaBot.js**: El "hola mundo" de los bots, para probar directamente desde la consola.
* **meDijisteAlgo.js**: Cómo obtener el anterior mensaje del usuario.
* **holaUsuario.js**: La forma más básica de interacción con el usuario, introduciendo el patrón de cascada o *waterfall*.
* **holaWeb.js**: Toma los anteriores ejemplos, pero como una aplicación web.

## Flujo de trabajo
Afianza el concepto de cascada, utiliza diálogos y almacena información para diseñar mejores experiencias.

* **beginDialog.js**: Cómo empezar un nuevo diálogo.
* **endDialog.js**: Cómo finalizar un diálogo.
* **dialogData.js**: Cómo almacenar información en el alcance de un diálogo.
* **userData.js**: Cómo almacenar información para un usuario.

## Interacción con el usuario
Solicita y envía información a tus usuarios a través de prompts, botones, tarjetas y carouseles.

* **prompts.js**: Cómo solicitar información a un usuario.
* **buttons.js**: Cómo utilizar botones para mejorar la experiencia.
* **heroCards.js**: Cómo enviar tarjetas.
* **carousel.js**: Cómo enviar múltiples tarjetas en un único mensaje.

## Procesamiento de Lenguaje Natural
Utiliza Inteligencia Artificial a través de LUIS.ai para procesar el lenguaje natural de tus usuarios.

* **luisIntents.js**: Cómo detectar la intención de un enunciado.
* **luisEntities.js**: Cómo extraer entidades de enunciados.

## Localización
Permite a tu bot hablar múltiples idiomas, sin reescribir código.

* **multiLenguaje.js**: Cómo permitir que mi bot hable múltiples idiomas.

## Middleware y comandos globales
Aprende a escribir código reutilizable en todo tu bot.

* **middleware.js**: Implementa un middleware para guardar mensajes entrantes y salientes.
* **triggerAction.js**: Cómo disparar acciones o diálogos con expresiones regulares.
* **cancelAction.js**: Implementa diálogos de cancelación con una sóla línea. Ejemplo: "cancelar!"
* **beginDialogAction.js**: Cómo iniciar otro diálogo con otro diálogo. Ejemplo: "ayuda!"

## Deployment e integración continua
Mira el vídeo en MVA para integrar tu desarrollo con Microsoft Azure.

## Otros
Conceptos avanzados para desarrollo de bots.

* **backchannel.js**: (TODO) Utiliza el backchannel o canal trasero para enviar mensajes invisibles.
* **inputHints.js**: Guía a tu usuario sobre lo que tu bot espera.
* **isTyping.js**: Mejora la experiencia con una notificación de que el usuario *está escribiendo..*
* **proactivo.js**: Permite a tu bot romper el hielo en la conversación.
* **speech.js**: (TODO) Integra voz o discurso en tus bots.
* **suggestedActions.js**: Ofrece sugerencias a tus usuarios, mejorando la experiencia.

## Algunos comandos útiles

Para inicializar el directorio:
```bash
npm init
```

Para instalar el botbuilder:
```bash
npm install --save botbuilder
```

Para instalar restify:
```bash
npm install --save restify
```

Para instalar dotenv:
```bash
npm install --save dotenv
```