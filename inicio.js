//se recuperan la bandera de que si hay partida guardada
const hayPartida = localStorage.getItem('guardado') === "true";
console.log(hayPartida);

//se obtiene el boton de continuar partida
const continuar = document.getElementById('continuar');

//se obtiene el boton de iniciar partida
const iniciar = document.getElementById('iniciar');

iniciar.addEventListener("click", function(){
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
});

if(!hayPartida){
    continuar.style.opacity = "0.3";
    continuar.disabled = true;
}else{
    continuar.style.opacity = "1";
    continuar.disabled = false;
}