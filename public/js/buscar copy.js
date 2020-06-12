var categorias = new Array;
var webs = new Array;
var detalles = new Array;
var descriptionWebs = new Array;
var description = new Array;
var valoracionesElement;
var ratedIdWeb = new Array;
var user;
var cookieAdv;
var lastUser = "";
var websFetch = new Array;
var miCookie;

// TODO tenemos que revisar codigo, 
// hacer paginas de contactanos y categorias ocultarcuando es grande y poner cuando es pequena
// favicon
window.onload = async function () {

	mybutton = document.getElementById("myBtn");
	var main = document.getElementById("main");

	miCookie = readCookie("nombre");
	user = miCookie;

	x = document.getElementById("login");
	y = document.getElementById("signup");
	z = document.getElementById("btn");


	let mainNav = document.getElementById('js-menu');
	let navBarToggle = document.getElementById("nav-bar-menu");

	navBarToggle.addEventListener('click', function () {
		mainNav.classList.toggle('active');
	});
	cargarWebs();



}

function init() {


}


function readCookie(name) {

	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

function register() {
	x.style.left = "-400px";
	y.style.left = "50px";

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



async function colorEstrellaPulsada(ev, index) {

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


function fallasUsuario(usuario) {
	fetch('/puntuaciones/' + usuario, {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (webs) {

			webs.forEach(web => {
				console.log(ratedIdWeb);

				if (!ratedIdWeb.includes(web.idweb)) {
					ratedIdWeb.push(web.idweb);
				}

			});

			userRating(webs);
		});

}

function puntuar(idweb, value, usuario) {

	fallasUsuario(usuario);

	methodProve = "POST";
	if (ratedIdWeb.includes(idweb)) {
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


	//https://ranksweb.herokuapp.com/
	//http://localhost:4000

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
			if (response.errors != null) {
				form.children[3].innerText = response.errors[0].msg

			} else if (response.message != null) {
				form.children[3].innerText = response.message

			} else {
				form.children[3].innerText = "Success";
				name = email.substring(0, email.indexOf("@"));
				document.cookie = "nombre=" + name + "; max-age=3600; path=/";

				window.location.href = "../index.html";


			}
		})

}

function show(formType) {
	var passwdElement = document.getElementById(formType).children[1];
	var showElement = document.getElementById(formType).children[2];
	if (passwdElement.type == "password") {
		passwdElement.type = "text";
		showElement.innerText = "Hide"
	} else {
		passwdElement.type = "password";
		showElement.innerText = "Show";

	}

}

function showRating() {
	valoracionesElement = document.getElementsByClassName("valoracion");


	for (let i = 0; i < valoracionesElement.length; i++) {

		valoracionesElement[i].style.display = "block";

	}


}

function userRating(userWebs) {

	for (let i = 0; i < userWebs.length; i++) {

		var webID = userWebs[i].idweb;
		var puntuacion = userWebs[i].puntuacion;


		var idWebChilds = valoracionesElement[webID].children;

		for (let j = 0; j < puntuacion; j++) {

			idWebChilds[j].style.color = "yellow";

		}


	}

}

function closeSession() {

	document.cookie = "nombre=" + user + "; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "cookie= true; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.getElementsByClassName("hero")[0].style.display = "block";
	window.location.href = "../html/tuEspacio.html";

}

function closeCookie() {

	document.getElementById("cookieAdv").style.display = "none";
	document.cookie = "cookie= true; max-age=3600; path=/";

}


//Get the button:

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		myBtn.style.display = "block";
		closeCookie();
	} else {
		myBtn.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function createWebs() {


	fetch('/web/"' + idWeb + '"/"' + name + '"/"' + categoria + '"/"' + link + '"/"' + image + '"/"' + description + '"/"' + verified + '"', {
		method: "POST"
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {
			console.log(falla)
		});


}

function showRating() {
	valoracionesElement = document.getElementsByClassName("valoracion");


	for (let i = 0; i < valoracionesElement.length; i++) {

		valoracionesElement[i].style.display = "block";

	}


}

function cargarWebs() {

	console.log(user);
	//Cambiaaaaaaaaar
	fetch('/puntuaciones/' + user, {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (web) {

			for (let i = 0; i < web.length; i++) {
				console.log(web[i].idweb);
				var idWeb = web[i].idweb;

				fetch('/web/' + idWeb, {
					method: "GET"
				}).then(function (response) {
					return response.json();
				})
					.then(function (web) {
						console.log(web);

						var divWeb = document.createElement("div");
						divWeb.classList = "web";
						var h2 = document.createElement("h2");
						h2.innerText = web[i].name;
						h2.id = web[i].categoria;
						divWeb.appendChild(h2);

						var divCategorias = document.createElement("div");
						divCategorias.classList = "categorias";
						divCategorias.innerText = "Categoría: ";
						var aCategoria = document.createElement("A");;
						aCategoria.href = '#' + web[i].categoria;
						aCategoria.innerText = web[i].categoria;
						divCategorias.appendChild(aCategoria);
						divWeb.appendChild(divCategorias);

						var aImg = document.createElement("A");
						aImg.href = web[i].link;
						var img = document.createElement("IMG");
						img.src = web[i].image;
						img.alt = "Imagen de la web: " + web[i].name;
						aImg.appendChild(img)
						divWeb.appendChild(aImg);

						var p = document.createElement("p");
						p.innerText = web[i].description;
						divWeb.appendChild(p);

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
						divWeb.appendChild(valoracion);

						main.appendChild(divWeb);




						webs = document.getElementsByClassName("web");



						if (miCookie != null) {
							document.getElementsByClassName("hero")[0].style.display = "none";

							fallasUsuario(miCookie);
							showRating();
						}


						if (document.cookie.includes("cookie=true") && document.getElementById("cookieAdv") != null) {

							document.getElementById("cookieAdv").style.display = "none";
						}

					});


			}




		});



}