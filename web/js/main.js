// Cambio de color al texto
var elem = document.getElementsByClassName('cambio');

function changeColor(newColor) {



    for (let i = 0; i < elem.length; i++) {
        elem[i].style.color = 'blue';
        elem[i].style.fontSize = '21px';

    }
}


// Eventos de mouse usando getElementById y addEventListener

let cambioMouse = document.getElementById("cambioMouse");

cambioMouse.addEventListener("mouseleave", function(event) {

    event.target.style.color = "red";


    setTimeout(function() {
        event.target.style.color = "blue";
    }, 1000);
}, false);

// Usando querySelector

const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
    log.textContent = e.target.value;
}

// API CON IMAGENES

async function obtenerPersonajes() {
    let response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
    let data = await response.json()
    let p = data[0]

    document.getElementById("nombre").innerHTML = p.character
    document.getElementById("descripcion").innerHTML = p.quote
    let img = `<img src="${p.image}" class= "card-img-top " width="300" height="400"> `
    document.getElementById("img").innerHTML = img

}

obtenerPersonajes()

async function obtenerPersonajes1() {
    let response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
    let data = await response.json()
    let p1 = data[0]

    document.getElementById("nombre1").innerHTML = p1.character
    document.getElementById("descripcion1").innerHTML = p1.quote
    let img1 = `<img src="${p1.image}" class= "card-img-top " width="250" height="400"> `
    document.getElementById("img1").innerHTML = img1

}

obtenerPersonajes1()

async function obtenerPersonajes2() {
    let response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
    let data = await response.json()
    let p2 = data[0]

    document.getElementById("nombre2").innerHTML = p2.character
    document.getElementById("descripcion2").innerHTML = p2.quote
    let img2 = `<img src="${p2.image}" class= "card-img-top " width="250" height="400"> `
    document.getElementById("img2").innerHTML = img2

}

obtenerPersonajes2()


// API con arreglos

async function obtenerPersonaje(id) {
    let response = await fetch(`https://swapi.co/api/people/${id}/`)
    let data = await response.json()
    return data
}

async function obtenerDatos(url) {
    let response = await fetch(url)
    let data = await response.json()
    return data
}


async function listarPersonajes(url) {
    let lista = `<ul class="collection with-header">
      <li class="collection-header green lighten-1"><h4 class="white-text">Nombre de Personajes de StarWars</h4></li>`
    let personajes = await obtenerDatos(url)

    let numeroPersonaje = 1;
    for (const personaje of personajes.results) {
        lista += `<li class="collection-item">
         <div><strong>${numeroPersonaje}. &nbsp;Nombre:</strong> ${personaje.name}. <br/> <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Género:&nbsp; </strong> ${personaje.gender}</div></li>`
        numeroPersonaje++
    }
    lista += '</ul><div class="row">'
    if (personajes.previous) {
        lista += `<div class="col s6"><a id ="btn-anterior" 
                class="btn-small white-text"
                data-url="${personajes.previous}"><i class="material-icons left">skip_previous</i>Anterior</a></div>`
    }
    if (personajes.next) {
        lista += `<div class="col s6"><a id ="btn-siguiente" 
                class="btn-small white-text"
                data-url="${personajes.next}"><i class="material-icons right">skip_next</i>Siguiente</a></div></div>`
    }
    return lista
}

async function main(url) {
    let lista = await listarPersonajes(url)
    document.getElementById("informacion").innerHTML = lista
    let btnSiguiente = document.getElementById("btn-siguiente")
    let btnAnterior = document.getElementById("btn-anterior")
    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
    if (btnAnterior) {
        btnAnterior.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
}

main('https://swapi.co/api/people/')