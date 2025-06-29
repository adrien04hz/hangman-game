//banco de palabras con su descripcion
const palabras = {
    1: ["mouse","Elemento que tiene cola y botones, se ocupa dentro de la computación."],
    2: ["computadora","Ideal para realizar todo tipo de tareas, los de computación depende de ella."],
    3: ["violin","Instrumento de 4 cuerdas que utiliza un arco como auxiliar."],
    4: ["telefono","Hoy en día no puedes estar sin mi, cuidado, que si soy de la manzanita, me quiebro rápido."],
    5: ["libreta","Cuando estudias es uno de tus mejores amigos, te recuerda todo solo si escribes en él."],
    6: ["helicoptero","Soy como un avión pero sin alas y con más hélices."],
    7: ["whisky","Soy una bebida un poco lujosa, pero bien que sé."],
    8: ["unicornio", "Amados por unos, temidos por otros, aun así mi existencia es un completo misterio."],
    9: ["xenon", "Soy un gas de una familia muy noble, los mejores de la tabla periódica."],
    10: ["zanahoria","Soy comido por numerosos mamíferos, especialmente por conejos."],
    11: ["tempestad","Soy parte de la letra de muchas canciones, además vengo acompañado de huracanes."],
    12: ["banana","Soy una fruta muy deliciosa, mis fans son los gorilas y diversos monos."],
    13: ["canguro", "Cuidado si me encuentras, sé boxear pero vivo en australia y guardo un bebé en mi panza."],
    14: ["sombrero","Siempre estoy en la cima del humano expuesto al sol."],
    15: ["hamburguesa","Soy una combinación deliciosa de pan, carne y vegetales, la pizza es mi competencia."],
    16: ["nube", "A veces digital o de lluvia, pero siempre me mencionan."],
    17: ["vampiro","Cuidado con encontrarme, me gusta la sangre y vivo en las noches, parezco ingeniero."],
    18: ["caramelo","Soy dulce y peligroso a la vez, cuida tus dientes de mi."],
    19: ["rana", "Salto salto, tu dices salta y yo..."],
    20: ["marshmallow", "Estoy en inglés, pero me queman en las fogatas."],
    21: ["helado","Me derrito por el calor, por eso comeme rápido, no hay mucho tiempo."],
    22: ["payaso", "¿Qué le payó al pasaso?"],
    23: ["sirena","En el agua o en las calles en persecuciones para atrapar malandros."],
    24: ["burbuja","Soy muy frágil pero vuelo tantito, cuidado por poner tu dedo."],
    25: ["dragon","He sido esposa de un burro a la vez aue asesina de caballeros."],
    26: ["esqueleto","Te mantengo de pie, ya que sin mi, no eres más que una gelatina."],
    27: ["globo","Me sueltas en el día de reyes o en fiestas, soy gordito."],
    28: ["cactus","Siempre quiero un abrazo pero mis espinas me lo impide."],
    29: ["pizza","Soy el mayor miedo de la hamburguesa."],
    30: ["zombi","Cuidado que parezco muerto pero estoy más que vivo."]
};

//se obtiene el boton para guardar partida
const guardar = document.getElementById('guardar');

//se obtiene el div donde iran los guiones
const guiones = document.getElementById('guiones');

//se obtiene el div para la descripcion
const descripcion = document.getElementById('desc');

//se obtiene el canva para la animacion
const canva = document.getElementById('pizarron');
//referencia para poder dibujar
const ctx = canva.getContext('2d');

//se obtiene el parrafo para el puntaje
const pts = document.getElementById('cuenta');

//se obtiene el parrafo de errores
const err = document.getElementById('intentos');


//se obtiene el boton de reinicio o continuar
const continuar = document.getElementById('continuar');

//se obtiene el boton de finalizar juego
const finalizar = document.getElementById('fin');

//se obtiene contenedor de todos los botones
const contenedor = document.getElementById('contenedorBtns');

//se obtiene la barra de vida
const vida = document.getElementById('hp');

//se obtiene el boton de instrucciones
const lee = document.getElementById('leer');

//se obtiene el boton de salir al menu
const lee1 = document.getElementById('leer1');

//cada que inicia la carga se pone en falso la partida guardada
localStorage.setItem('guardado',false);

//variables globales
var word = [];
var correctas = localStorage.getItem('puntos') || 0;
pts.textContent = "Puntaje: " + correctas;
var errores = localStorage.getItem('error') || 0;
const erroresMax = 5;
var guion = [];
var restar = localStorage.getItem('salud') || 100;
vida.style.width = restar + "%";
var hpp = localStorage.getItem('hpp') || 50;
vida.innerHTML = hpp + "HP";
var animacionActual = null;
var estado = "jugando";


//funcion que inicia el juego
function juegoIniciado(){
    animacionNormal();
    if(errores >= erroresMax){
        correctas = 0;
        pts.textContent = "Puntaje: " + correctas;

        restar = 100;
        hpp = 50;
        vida.innerHTML = "50HP";
        vida.style.width = "100" + "%";
        errores = 0;
    }
    err.textContent = "Errores: " + errores;
    //se escoje palabra random
    const palabra = Math.floor(Math.random() * 30) + 1;
    //const palabra = 20;


    //se convierte palabra en arreglo
    word = palabras[palabra][0].split("");

    //se muestra la descripcion de la palabra
    descripcion.textContent = palabras[palabra][1];
    console.log(word);


    //Arreglo que representa los guiones
    guion = palabras[palabra][0].split("").map(() => "_");
    guiones.innerHTML = guion.join(" ");
    console.log(guion);
}

//eventos de los botones
contenedor.addEventListener("click",function eleccion(event) {
    if(event.target.tagName === "BUTTON"){
        const letraEntrada = event.target.id.toLowerCase();

        //si la letra seleccionada se encuentra
        //se actualiza los guiones
        if(word.includes(letraEntrada)){
            word.forEach((letra, indice) => {
                if(letra === letraEntrada){
                    guion[indice] = letra;
                }

                //actualizar la salida de guiones
                guiones.innerHTML = guion.join(" ");
            });
        }else{
            errores++;
            err.textContent = "Errores: " + errores;
            restar -= 20;
            vida.style.width = restar + "%";
            hpp -= 10;
            vida.innerHTML = hpp + "HP";

            //funcion que cambia el color del fondo al equivocarse
            errorFondo();
            //recibe dano fantasma
            animacionDano();
        }

        //verificar si la palabra ha sido completada
        if(guion.join("") === word.join("")){
            correctas++;

            pts.textContent = "Puntaje: " + correctas;

            //comparar si se ha alcanzado el puntaje esperado
            if(correctas == 10){
                siguientePalabra1();
                guiones.innerHTML = "¡FELICIDADES! Lo lograste."
            }else{
                //funcion para seguir a la siguiente palabra
                siguientePalabra();
            }
            
            
        }else if(errores == erroresMax){
            guiones.innerHTML = `La palabra era \"${word.join("")}\"`;
            siguientePalabra2();
            
        }
    }
});

//funcion para continuar con el juego
function siguientePalabra(){
    //se muestra el boton de continuar
    continuar.style.display = "block";
    contenedor.style.pointerEvents = "none"; //se deshabilitan botones
}

//funcion para finalizar el juego una vez tenido el puntaje ganador
function siguientePalabra1(){
    //se muestra el boton de finalizar
    finalizar.style.display = "block";
    contenedor.style.pointerEvents = "none"; //se deshabilitan botones
}

//funcion para reiniciar el puntaje por haber perdido
//o desaparecido al fantasmita
function siguientePalabra2(){
    //almacena localmente el numero de correctas
    localStorage.setItem('puntos',0);

    //se desactiva la bandera de partida guardada
    localStorage.setItem('guardado',false);

    //se reincia el valor de la salud a 100
    localStorage.setItem('salud',100);

    //se reinicia la etiqueta de la salud
    localStorage.setItem('hpp',50);

    //se reinicia el numero de errores
    localStorage.setItem('error',0);

    //se muestra el boton de continuar
    continuar.style.display = "block";
    contenedor.style.pointerEvents = "none"; //se deshabilitan botones
}

//evento listener para reinciar el juego
continuar.addEventListener("click",() => {
    estado = "jugando";
    //se oculta el boton de continuar
    continuar.style.display = "none";
    //se habilitan los botones de letras
    contenedor.style.pointerEvents = "auto";
    //se reinicia el juego para elegir nueva palabra
    if(errores >= erroresMax){
        animacionMuerte();
    }
    juegoIniciado();

});

//evento listener de finalizar
finalizar.addEventListener("click", function(){
    //almacena localmente el numero de correctas
    localStorage.setItem('puntos',0);

    //se activa la bandera que hay partida guardad
    localStorage.setItem('guardado',false);

    //se reincia el valor de la salud a 100
    localStorage.setItem('salud',100);

    //se reinicia la etiqueta de la salud
    localStorage.setItem('hpp',50);

    //se reinicia el numero de errores
    localStorage.setItem('error',0);
});



//funcion que cambia el color de fondo de botones
function errorFondo(){
    const color = document.body.style.background || "#1A1A1D";

    //cambia los colores de los botones
    document.querySelectorAll("#contenedorBtns button").forEach( element => {
        element.style.backgroundColor = "black";
    });

    guardar.style.backgroundColor = "black";
    lee.style.backgroundColor = "black";
    lee1.style.backgroundColor = "black";

    document.body.style.backgroundColor = "red";

    //restaura el color original
    setTimeout(() => {
        document.body.style.backgroundColor = color;
        document.querySelectorAll("#contenedorBtns button").forEach( element => {
            element.style.backgroundColor = "";
        });

        guardar.style.backgroundColor = "";
        lee.style.backgroundColor = "";
        lee1.style.backgroundColor = "";
        

    },250);
}


//funcion de animacion normal
function animacionNormal(){
    detener();

    if(estado != "jugando") return;
    //cuando la fantasmita esta normal
    //cargar sprite
    let spriteImage = new Image();
    spriteImage.src = './images/g2.png'; 


    // Parámetros del sprite
    let frameWidth = 102;  // Ancho de cada frame
    let frameHeight = 159; // Alto de cada frame
    let totalFrames = 5;  // Número total de frames en la imagen
    let currentFrame = 0;    // Frame actual que se está mostrando


    // Iniciar la animación cuando la imagen esté cargada
    spriteImage.onload = function() {
        animacionActual = setInterval(function(){
            // Calcular la posición X del frame actual
            let frameX = (currentFrame * 191) + 278;

            // Limpiar el canvas
            ctx.clearRect(0, 0, canva.width, canva.height);

            // Dibujar el frame actual
            ctx.drawImage(spriteImage, frameX, 54, frameWidth, frameHeight, 70, 0, 150, 150);

            // Pasar al siguiente frame
            currentFrame = (currentFrame + 1) % totalFrames;
        }, 300);
    };
}


//funcion de animacion de dano
function animacionDano(){
    detener();
    if(estado!="jugando") return;

    estado = "dano";
    //cargar sprite
    let spriteImage1 = new Image();
    spriteImage1.src = './images/gg.png'; 


    // Parámetros del sprite
    let frameWidth1 = 141;  // Ancho de cada frame
    let frameHeight1 = 165; // Alto de cada frame
    let totalFrames1 = 3;  // Número total de frames en la imagen
    let currentFrame1 = 1;    // Frame actual que se está mostrando

    // Iniciar la animación cuando la imagen esté cargada
    spriteImage1.onload = () => {
        animacionActual = setInterval(function(){
            // Calcular la posición X del frame actual
            let frameX1 = (currentFrame1 * 198) + 262;

            // Limpiar el canvas
            ctx.clearRect(0, 0, canva.width, canva.height);

            // Dibujar el frame actual
            ctx.drawImage(spriteImage1, frameX1, 717, frameWidth1, frameHeight1, 70, 0, 150, 150);

            // Pasar al siguiente frame
            currentFrame1 = (currentFrame1 + 1) % totalFrames1;
        }, 100);

        setTimeout(() => {
            detener();
            estado = "jugando";
            animacionNormal();
        },100*totalFrames1);
    };
}


//funcion de animacion de muerte
function animacionMuerte(){
    detener();
    estado = "muerte";
    //cargar sprite
    let spriteImage = new Image();
    spriteImage.src = './images/gg.png'; 


    // Parámetros del sprite
    let frameWidth = 141;  // Ancho de cada frame
    let frameHeight = 165; // Alto de cada frame
    let totalFrames = 5;  // Número total de frames en la imagen
    let currentFrame = 1;    // Frame actual que se está mostrando

    // Iniciar la animación cuando la imagen esté cargada
    spriteImage.onload = function() {
        animacionActual = setInterval(function(){
            // Calcular la posición X del frame actual
            let frameX = (currentFrame * 194) + 267;

            // Limpiar el canvas
            ctx.clearRect(0, 0, canva.width, canva.height);

            // Dibujar el frame actual
            ctx.drawImage(spriteImage, frameX, 928, frameWidth, frameHeight, 70, 0, 150, 150);

            // Pasar al siguiente frame
            currentFrame = (currentFrame + 1) % totalFrames;
        }, 100);

        setTimeout(() => {
            detener();
            ctx.clearRect(0, 0, canva.width, canva.height);
            
        },100*totalFrames);

        setTimeout(() => {
            estado = "jugando";
            animacionNormal();
        },1000);
        
    };
}

//funcion que detiene animacion actual
function detener(){
    if(animacionActual){
        clearInterval(animacionActual);
        animacionActual = null;
    }
}


//se añade evento para guardar datos
guardar.addEventListener("click", function() {

    guardar.style.backgroundColor = "green";

    setTimeout(() => {
        guardar.style.backgroundColor = "";
        
    },700);

    //almacena localmente el numero de correctas
    localStorage.setItem('puntos',correctas);

    //se activa la bandera que hay partida guardad
    localStorage.setItem('guardado',true);

    //se guardará la salud de fantasma para poder continuar con la partida
    localStorage.setItem('salud',restar);
    
    //se guardará la etiqueta de la salud
    localStorage.setItem('hpp',hpp);

    //se guardan el numero de errores
    localStorage.setItem('error',errores);
});

//primer momento en donde se inicia el juego
juegoIniciado();