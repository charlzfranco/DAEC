// Variables iniciales del juego 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const shipWidth = 50;
const shipHeight = 50;
const shipSpeed = 20;

const asteroidWidth = 50;
const asteroidHeight = 50;
const asteroidSpeed = 10;

let shipX = canvas.width / 2 - shipWidth / 2;
let shipImage = new Image();
shipImage.src = 'ovni.png'; // Ruta de la imagen de la nave

let asteroidImage = new Image();
asteroidImage.src = 'asteroid.png'; // Ruta de la imagen de los asteroides

let asteroids = [];
let dificultadActual; // Variable para almacenar la dificultad actual

let vida = 3; // Vida inicial del jugador
const barraVidaWidth = 200;
const barraVidaHeight = 20;
const barraVidaY = 10;

// Función para dibujar la nave
function drawShip() {
    ctx.drawImage(shipImage, shipX, canvas.height - shipHeight, shipWidth, shipHeight);
}

// Función para dibujar los asteroides
function drawAsteroids() {
    for (let i = 0; i < asteroids.length; i++) {
        ctx.drawImage(asteroidImage, asteroids[i].x, asteroids[i].y, asteroidWidth, asteroidHeight);
    }
}

// Función para limpiar el canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para actualizar la posición de los asteroides
function updateAsteroids() {
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].y += asteroidSpeed;
        if (asteroids[i].y > canvas.height) {
            asteroids.splice(i, 1);
            i--;
        }
    }
}

// Función principal de actualización del juego
function updateGame() {
    clearCanvas();
    drawShip();
    drawAsteroids();
    drawBarraVida(); // Dibujar la barra de vida
    updateAsteroids();

    const shipRect = { x: shipX, y: canvas.height - shipHeight, width: shipWidth, height: shipHeight };
    for (let i = 0; i < asteroids.length; i++) {
        const asteroidRect = { x: asteroids[i].x, y: asteroids[i].y, width: asteroidWidth, height: asteroidHeight };
        if (checkCollision(shipRect, asteroidRect)) {
            handleCollision();
        }
    }

    requestAnimationFrame(updateGame);
}

// Manejo de eventos de teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && shipX > 0) {
        shipX -= shipSpeed;
    } else if (event.key === 'ArrowRight' && shipX < canvas.width - shipWidth) {
        shipX += shipSpeed;
    }
});

// Iniciar el juego al presionar el botón de inicio
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    setInterval(spawnAsteroid, 1000);
    updateGame();
});

// Función para crear asteroides
function spawnAsteroid() {
    const asteroidX = Math.random() * (canvas.width - asteroidWidth);
    const asteroid = {
        x: asteroidX,
        y: 0 - asteroidHeight
    };
    asteroids.push(asteroid);
}

// Función para verificar colisiones
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Función para manejar colisiones
function handleCollision() {
    limpiarAsteroides(); // Limpiar los asteroides de la pantalla

    if (dificultadActual === 'facil') {
        mostrarPreguntaYVerificar('facil');
    } else if (dificultadActual === 'medio') {
        mostrarPreguntaYVerificar('medio');
    } else if (dificultadActual === 'dificil') {
        mostrarPreguntaYVerificar('dificil');
    }
}

// Preguntas y respuestas
const preguntasFacil = [
    "1.- ¿Cuál es el planeta más cercano al Sol? a) Venus b) Marte c) Mercurio d) Júpiter",
    "2.- ¿Qué es el Sol? a) Un planeta b) Una estrella c) Un satélite d) Un cometa",
    "3.- ¿Cuál es el satélite natural de la Tierra? a) Marte b) Luna c) Júpiter d) Sol",
    "4.- ¿Qué planeta es conocido como el 'Planeta Rojo'? a) Venus b) Marte c) Júpiter d) Saturno",
    "5.- ¿Cómo se llama el cinturón de asteroides ubicado entre Marte y Júpiter? a) Cinturón de Kuiper b) Cinturón de Asteroides c) Nube de Oort d) Cinturón de Van Allen",
    "6.- ¿Cuál es el planeta más grande del sistema solar? a) Tierra b) Marte c) Júpiter d) Saturno",
    "7.- ¿Qué planeta tiene un sistema de anillos muy prominente? a) Venus b) Marte c) Júpiter d) Saturno",
    "8.- ¿Qué planeta es conocido por tener una gran mancha roja, que es una tormenta gigante? a) Venus b) Marte c) Júpiter d) Saturno",
    "9.- ¿Cuál es el cuarto planeta desde el Sol? a) Mercurio b) Venus c) Tierra d) Marte",
    "10.- ¿Cuál es el nombre del telescopio espacial que ha tomado imágenes detalladas del espacio profundo? a) Kepler b) Hubble c) Galileo d) Newton"
];

const preguntasMedio = [
    "1.- ¿Cuál es la distancia promedio entre la Tierra y el Sol? a) 93 millones de millas b) 150 millones de millas c) 93 millones de kilómetros d) 150 millones de kilómetros",
    "2.- ¿Qué planeta tiene la mayor cantidad de lunas conocidas? a) Júpiter b) Saturno c) Urano d) Neptuno",
    "3.- ¿Qué tipo de galaxia es la Vía Láctea? a) Elíptica b) Irregular c) Espiral d) Lenticular",
    "4.- ¿Cuál es el segundo planeta más grande del sistema solar? a) Júpiter b) Saturno c) Urano d) Neptuno",
    "5.- ¿Qué fenómeno ocurre cuando la Luna pasa directamente entre la Tierra y el Sol? a) Eclipse lunar b) Eclipse solar c) Solsticio d) Equinoccio",
    "6.- ¿Qué planeta tiene el día más corto del sistema solar? a) Tierra b) Júpiter c) Marte d) Venus",
    "7.- ¿Qué planeta es conocido por sus vientos extremadamente rápidos, que pueden superar los 2,100 km/h? a) Júpiter b) Saturno c) Urano d) Neptuno",
    "8.- ¿Cuál es la composición principal de la atmósfera de Venus? a) Nitrógeno b) Oxígeno c) Dióxido de carbono d) Metano",
    "9.- ¿En qué año se lanzó el telescopio espacial Hubble? a) 1990 b) 1980 c) 2000 d) 2010",
    "10.- ¿Qué planeta tiene un gran cañón llamado Valles Marineris? a) Mercurio b) Venus c) Marte d) Júpiter"
];

const preguntasDificil = [
    "1.- ¿Qué astrónomo descubrió las cuatro lunas más grandes de Júpiter, conocidas como lunas galileanas? a) Copérnico b) Galileo Galilei c) Johannes Kepler d) Tycho Brahe",
    "2.- ¿Qué misión fue la primera en aterrizar un módulo en Marte y enviar datos a la Tierra? a) Viking 1 b) Pathfinder c) Curiosity d) Opportunity",
    "3.- ¿Cuál es el período de rotación de Urano en horas? a) 17.2 horas b) 19.5 horas c) 21.3 horas d) 24.1 horas",
    "4.- ¿Qué teoría propone que el universo se originó a partir de un estado extremadamente denso y caliente? a) Teoría del estado estacionario b) Teoría del Big Bang c) Teoría de la inflación eterna d) Teoría de la relatividad",
    "5.- ¿Cuál es el nombre de la misión que fue la primera en llegar a Plutón? a) Voyager 1 b) Voyager 2 c) New Horizons d) Cassini",
    "6.- ¿Cuál es la estrella más cercana al sistema solar? a) Alfa Centauri b) Proxima Centauri c) Betelgeuse d) Sirio",
    "7.- ¿Qué fenómeno puede ocurrir en la atmósfera superior de Júpiter, conocido como la 'gran mancha roja'? a) Aurora boreal b) Tormenta permanente c) Erupción volcánica d) Ciclón tropical",
    "8.- ¿Qué tipo de objeto es el asteroide 1 Ceres en el cinturón de asteroides? a) Planeta enano b) Cometa c) Satélite natural d) Meteoroide",
    "9.- ¿Cuál es la distancia en años luz al centro de la Vía Láctea desde la Tierra? a) 10,000 años luz b) 26,000 años luz c) 50,000 años luz d) 100,000 años luz",
    "10.- ¿Qué instrumento en el telescopio espacial Hubble es responsable de capturar imágenes detalladas del espacio? a) Cámara de gran angular 3 b) Espectrógrafo de imágenes c) Cámara avanzada para sondeos d) Cámara planetaria de campo amplio 2"
];

const respuestasFacil = ['c', 'b', 'b', 'b', 'b', 'c', 'd', 'c', 'd', 'b'];
const respuestasMedio = ['d', 'b', 'c', 'b', 'b', 'b', 'd', 'c', 'a', 'c'];
const respuestasDificil = ['b', 'a', 'a', 'b', 'c', 'b', 'b', 'a', 'b', 'a'];

// Verificar respuesta
function verificarRespuesta(preguntaIndex, respuestaUsuario, dificultad) {
    let respuestasCorrectas;
    
    if (dificultad === 'facil') {
        respuestasCorrectas = respuestasFacil;
    } else if (dificultad === 'medio') {
        respuestasCorrectas = respuestasMedio;
    } else if (dificultad === 'dificil') {
        respuestasCorrectas = respuestasDificil;
    } else {
        console.error('Dificultad no válida');
        return false;
    }

    // Convertir la respuesta correcta a minúsculas para la comparación
    const respuestaCorrectaMinusculas = respuestasCorrectas[preguntaIndex].toLowerCase();
    
    // Convertir la respuesta del usuario a minúsculas para asegurar la comparación correcta
    return respuestaUsuario.toLowerCase() === respuestaCorrectaMinusculas;
}

function mostrarPreguntaYVerificar(dificultad) {
    let preguntas, respuestasCorrectas;
    
    if (dificultad === 'facil') {
        preguntas = preguntasFacil;
        respuestasCorrectas = respuestasFacil;
    } else if (dificultad === 'medio') {
        preguntas = preguntasMedio;
        respuestasCorrectas = respuestasMedio;
    } else if (dificultad === 'dificil') {
        preguntas = preguntasDificil;
        respuestasCorrectas = respuestasDificil;
    } else {
        console.error('Dificultad no válida');
        return;
    }

    // Seleccionar una pregunta aleatoria
    const indicePregunta = Math.floor(Math.random() * preguntas.length);
    const pregunta = preguntas[indicePregunta];

    // Mostrar la pregunta y obtener la respuesta del usuario
    const respuestaUsuario = prompt(pregunta);

    // Verificar la respuesta del usuario
    if (verificarRespuesta(indicePregunta, respuestaUsuario, dificultad)) {
        alert('¡Respuesta correcta!');
        // No se reduce la vida si la respuesta es correcta
    } else {
        alert('Respuesta incorrecta. La respuesta correcta era: ' + respuestasCorrectas[indicePregunta].toUpperCase());
        vida--; // Reducir la vida solo si la respuesta es incorrecta
        if (vida <= 0) {
            mostrarGameOver(); // Mostrar Game Over si la vida llega a 0
        }
    }
}

// Control de fondos
function cambiarFondoInicio() {
    document.body.style.backgroundImage = 'url("2.gif")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
}

function mostrarDificultades() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('submenu').style.display = 'block';
}

function volverDificultades() {
    document.body.style.backgroundImage = 'url("2.gif")';
    document.getElementById('confirmacion').style.display = 'none';
    document.getElementById('submenu').style.display = 'block';
}

function iniciarJuego() {
    document.body.style.backgroundImage = 'url("Principal.gif")';
    document.getElementById('confirmacion').style.display = 'none';
    canvas.style.display = 'block';
    updateGame();
}

function elegirDificultad(dificultad) {
    localStorage.setItem('nivel', dificultad);
    dificultadActual = dificultad;

    if (dificultad === 'facil') {
        document.body.style.backgroundImage = 'url("3.gif")';
    } 
    if (dificultad === 'medio') {
        document.body.style.backgroundImage = 'url("3.gif")';
    } 
    if (dificultad === 'dificil') {
        document.body.style.backgroundImage = 'url("3.gif")';
    } 

    document.getElementById('submenu').style.display = 'none';
    document.getElementById('confirmacion').style.display = 'block';
}

function limpiarAsteroides() {
    asteroids = [];
}

function drawBarraVida() {
    ctx.fillStyle = 'red';
    ctx.fillRect(10, barraVidaY, barraVidaWidth, barraVidaHeight);

    ctx.fillStyle = 'green';
    const vidaActualWidth = (vida / 3) * barraVidaWidth;
    ctx.fillRect(10, barraVidaY, vidaActualWidth, barraVidaHeight);
}

function mostrarGameOver() {
    clearCanvas();
    canvas.style.display = 'none';
    document.body.style.backgroundImage = 'url("4.gif")';
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Volver al Menú';
    restartButton.addEventListener('click', function() {
        reiniciarJuego();
    });
    document.body.appendChild(restartButton);
}

function reiniciarJuego() {
    // Recargar la página para reiniciar el juego
    location.reload();
}

function detenerJuego() {
    clearInterval(gameIntervalId);
    cancelAnimationFrame(animationFrameId);
    asteroids = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    document.getElementById('gameOverMenu').style.display = 'none';
    document.getElementById('menu').style.display = 'block'; // Volver a mostrar el menú principal
}

let animationFrameId; // ID del requestAnimationFrame
let gameIntervalId; // ID del setInterval
