var categorias = new Array;
var webs = new Array;
var detalles = new Array;
var descriptionWebs = new Array;
var description = new Array;
var name = "";
var valoracionesElement;
var ratedIdWeb = new Array;


window.onload = function () {


	var elementDresciption = new Array;

	x = document.getElementById("login");
	y = document.getElementById("signup");
	z = document.getElementById("btn");



	//NAVBAR RESPONSIVE
	let mainNav = document.getElementById('js-menu');
	let navBarToggle = document.getElementById("nav-bar-menu");

	navBarToggle.addEventListener('click', function () {
		mainNav.classList.toggle('active');
	});


	webs = document.getElementsByClassName("web");

	for (let i = 0; i < webs.length; i++) {
		detalles.push(webs[i].children);
		let valoracion = document.createElement("div");
		valoracion.classList.add("valoracion");
		for (let index = 1; index <= 5; index++) {
			let estrella = document.createElement("button");
			estrella.addEventListener("click", function () {
				colorEstrellaPulsada(this, index);
			});
			estrella.innerText = '★ ';
			estrella.dataset.index = index;
			estrella.dataset.idweb = i;
			estrella.setAttribute("value", index)
			estrella.classList.add("estrellas");
			valoracion.appendChild(estrella);
		}

		webs[i].appendChild(valoracion);

	}

	for (let i = 0; i < detalles.length; i++) {
		//id web
		elementDresciption.push(i);


		for (let j = 0; j < detalles[i].length; j++) {
			//Cogemos los enlaces para sacarles cada URL de cada web para después a la hora de filtrar 
			//que podamos clasificarlas sin problema
			var element = detalles[i][j].innerText;
			console.log(element);
			

			if (detalles[i][j].tagName == 'A') {
				elementDresciption.push(detalles[i][j].href);
				console.log(detalles[i][j].href);

			} else if (element.includes("Categoría")) {
				//Si no es un enlace, sacamos lo que tenga dentro del elemento para después pasarlo al array 
				var word = element.substring(11, element.length);
				elementDresciption.push(word);

			} else {
				elementDresciption.push(element);
				console.log(element);
			}

		}
		descriptionWebs.push(elementDresciption);
		//Reiniciamos array para que no se sumen todos los elementos
		elementDresciption = new Array;


	}

	//console.log(descriptionWebs)

	var miCookie = readCookie("nombre");
	if (miCookie != null) {
		
		document.getElementById('welcome').innerText = "Buenas " + miCookie;
		fallasUsuario(miCookie);
		showRating();
	}

}

function init() {


}


function readCookie(name) {

	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

//Funcion que rellena el array de categorias
function categoria(category) {



	//console.log(category);

	/* var sringHtml;

	var finalHtml = "";

	for (let i = 0; i < descriptionWebs.length; i++) {
		//Ponemos la posición uno porque es dónde esta la categoria 

		if (descriptionWebs[i][2] == category) {

			for (let j = 0; j <= 5; j++) {
				if (j == 1) {
					var tittle = descriptionWebs[i][j];
				} else if (j == 3) {
					var link = descriptionWebs[i][j];
				} else if (j == 4) {
					var paragraf = descriptionWebs[i][j];
				} 

			}

			//Falta anadir el espacio entre categoria: 
			sringHtml = '<div class="web"> <h2>' + tittle + '</h2>' +
				'<div class="categorias">Categoría:<a href="#" onclick="categoria("' + category + '")">' + ' ' + category + '</a></div>' +
				'<a href="' + link + '" target="_blank"><img src="./media/' + tittle + '.png" alt=""></a>' +
				'<p>' + paragraf + '</p>' + '</div>';

			finalHtml += sringHtml;

			

		}

	}

	document.getElementById("main").innerHTML = "";

	document.getElementById("main").innerHTML = finalHtml;

	webs2 = document.getElementsByClassName("web");

	for (let i = 0; i < webs.length; i++) {

	let valoracion = document.createElement("div");
		valoracion.classList.add("valoracion");
		for (let index = 1; index <= 5; index++) {
			let estrella = document.createElement("button");
			estrella.addEventListener("click", function () {
				colorEstrellaPulsada(this, index);
			});
			estrella.innerText = '★ ';
			estrella.dataset.index = index;
			estrella.dataset.idweb = i;
			estrella.setAttribute("value", index)
			estrella.classList.add("estrellas");
			valoracion.appendChild(estrella);
		}

		webs2[i].appendChild(valoracion);
	}
	
	
	finalHtml = ""; */



}

//FORM REGISTER
function register() {
	x.style.left = "-400px";
	y.style.left = "50px";
	console.log(document.getElementsByClassName("button-box")[0].offsetWidth);

	if (document.getElementsByClassName("button-box")[0].offsetWidth >= "220") {
		z.style.left = "110px";
	} else {
		z.style.left = "85px";
	}
}

function login() {
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0";
}

////////////////////////////////////////////////////////




async function colorEstrellaPulsada(ev, index) {

	console.log(ev.dataset.idweb)
	var estrellas = document.querySelectorAll(`[  data-idweb = '${ev.dataset.idweb}' ]`);
	var index = ev.dataset.index;

	if (estrellas[0].style.color == "yellow") {
		for (let i = 0; i < 5; i++) {
			estrellas[i].style.color = "black";
		}
	}

	for (let i = 0; i < index; i++) {
		estrellas[i].style.color = "yellow";
	}

	var usuario = readCookie("nombre");

	puntuar(ev.dataset.idweb, ev.dataset.index, usuario);
}

// TODO Hacer el Update para las estrellas
// tenemos que revisar y borrar la cookie ya creada por si se logea otra persona en el mismo navegador, cerrar sesion


function fallasUsuario(usuario) {
	fetch('/puntuaciones/' + usuario, {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (webs) {
			webs.forEach(web => {
				ratedIdWeb.push(web.idweb);
			});
			console.log(ratedIdWeb);
			
			userRating(webs);
		});

}

function puntuar(idweb, value, usuario) {

	fallasUsuario(usuario);

	methodProve = "POST";
	if (ratedIdWeb.includes(idweb)){
		methodProve = "PUT";
		
	}

	fetch('/puntuaciones/' + idweb + "/" + value + "/" + usuario, {
		method: methodProve
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {
			console.log(falla);
			
		});

}

function loginSubmit(formType) {
	form = document.getElementById(formType);
	email = form.children[0].value;
	passwd = form.children[1].value;

	console.log(passwd);

	var url = 'http://localhost:4000/user/' + formType;
	var data = { "email": email, "password": passwd };

	fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(function (response) {
			console.log(response)
			if (response.errors != null) {
				form.children[3].innerText = response.errors[0].msg

			} else if (response.message != null) {
				form.children[3].innerText = response.message

			} else {
				form.children[3].innerText = "Success";
				name = email.substring(0, email.indexOf("@"));
				document.cookie = "nombre=" + name + "; max-age=3600; path=/";



				window.location.href = "http://localhost:4000/index.html";


			}
		})

}

function show(formType) {
	var passwdElement = document.getElementById(formType).children[1];
	var showElement = document.getElementById(formType).children[2];
	console.log(passwdElement.type);

	if (passwdElement.type == "password") {
		passwdElement.type = "text";
		showElement.innerText = "Hide"
	} else {
		passwdElement.type = "password";
		showElement.innerText = "Show";

	}

}

function showRating() {

	valoracionesElement = document.getElementsByClassName('valoracion');
		
		for (let i = 0; i < valoracionesElement.length; i++) {
						
			valoracionesElement[i].style.display = "block";
		}


}

function userRating(userWebs){

	for (let i = 0; i < userWebs.length; i++) {

		var webID = userWebs[i].idweb;
		var puntuacion = userWebs[i].puntuacion;

		var idWebChilds = valoracionesElement[webID].children;

		for (let j = 0; j < puntuacion; j++) {
			
			idWebChilds[j].style.color = "yellow";
			
		}
		
		
	}

}