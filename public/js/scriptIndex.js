var categorias = new Array;
var webs = new Array;
var detalles = new Array;
var descriptionWebs = new Array;
var description = new Array;
var valoracionesElement = new Array;
var ratedIdWeb = new Array;
var user;
var cookieAdv;
var lastUser = "";
var websFetch = new Array;
var websBBDD = new Array;
var numerWebs;
var selectedImage;
var main;

// TODO tenemos que revisar codigo, 
// hacer paginas de contactanos y categorias ocultarcuando es grande y poner cuando es pequena
// favicon
window.onload = async function () {

	document.querySelector("#imageForm").addEventListener("change", function (e) {

		getImage(e)
	})

	allWebsBBDD();

	mybutton = document.getElementById("myBtn");
	main = document.getElementById("main");
	document.getElementsByClassName("hero")[0].style.display = "none";

	for (let i = 0; i < 6; i++) {
		var a = document.getElementById("sidebar").children[1].children[i].children[0];
	}

	cargarWebs("true");



}

async function allWebsBBDD() {

	fetch('/web/', {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {

			numerWebs = falla.length;
		});

}

function closeHero() {
	document.getElementsByClassName("hero")[0].style.display = "none";
	document.getElementById("sidebar").style.display = "block";
	document.getElementById("main").style.display = "block";
	document.getElementById("insertar").style.visibility = "visible";
	document.getElementById("categorias").style.display = "block";




}

function openHero() {
	document.getElementsByClassName("hero")[0].style.display = "block";
	document.getElementById("sidebar").style.display = "none";
	document.getElementById("main").style.display = "none";
	document.getElementById("insertar").style.visibility = "hidden";
	document.getElementById("categorias").style.visibility = "none";




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
			userRating(webs);


			webs.forEach(web => {

				if (!ratedIdWeb.includes(web.idweb)) {
					ratedIdWeb.push(web.idweb);
				}

			});
			
		});
}

async function puntuar(idweb, value, usuario) {


	if (ratedIdWeb.includes(idweb)) {
		methodProve = "PUT";

	} else {
		methodProve = "POST";
	}


	fetch('/puntuaciones/' + idweb + "/" + value + "/" + usuario, {
		method: methodProve
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {
			
		});

		fallasUsuario(usuario);
	

}

function loginSubmit(formType) {
	form = document.getElementById(formType);
	email = form.children[0].value;
	passwd = form.children[1].value;


	//https://ranksweb.herokuapp.com/
	//http://localhost:4000

	var url = 'https://ranksweb.herokuapp.com/user/' + formType;
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

				setTimeout(function(){ window.location.href = "../index.html"; },1500);



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

		var idWeb = userWebs[i].idweb;
		var puntuacion = userWebs[i].puntuacion;

		var idWebChilds = valoracionesElement[idWeb - 1].children;

		for (let j = 0; j < 5; j++) {

			idWebChilds[j].style.color = "black";

		}

		for (let j = 0; j < puntuacion; j++) {

			idWebChilds[j].style.color = "yellow";

		}


	}

}

function closeSession() {

	document.cookie = "nombre=" + user + "; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "cookie= true; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	setTimeout(function(){ window.location.href = "../html/tuEspacio.html"; },1500);

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

/* async function toDataUrl(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
} */
function getImage(e) {
	const file = e.target.files[0];
	const fileReader = new FileReader();
	fileReader.onload = e => {
		const img = document.createElement('img');
		img.src = e.target.result;
		const { src } = img;
		selectedImage = img.src;


	}
	fileReader.readAsDataURL(file);

}



async function createWeb() {

	var loginChilds = document.getElementById("login").children;
	var idweb = numerWebs + 1;
	var image = selectedImage;
	var name = loginChilds[1].value;
	var categoria = loginChilds[2].value;
	var link = loginChilds[3].value;
	var description = loginChilds[5].value;
	var verified = "false";

	const data = { image: image };

	fetch('/web/' + idweb + '/' + name + '/' + categoria + '/' + link + '/' + description + '/' + verified,
		{
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function (response) {
			return response.json();
		})
		.then(function (falla) {
			setTimeout(function(){ window.location.href = "../index.html"; },1500);

		});


}

function cargarWebs(verified) {
	var url;
	var ponerParrafo = false;
	if (verified == "false") {
    setTimeout(function() {
        location.hash = "#sugerencias";
    }, 1000);
	}
	

	if (main.innerText == "") {
		ponerParrafo = true;
	}
	

	if (verified == "true" || verified == "false") {
		url = '/web/' + verified;

	} else {
		url = '/web/true' + verified;
	}



	fetch(url, {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (web) {

			var valoracion;

			for (let i = 0; i < web.length; i++) {
				var imageUrl = web[i].image;

				if (web[i].image.includes("./public/")) {
					imageUrl = imageUrl.substring(9,imageUrl.length);
				}

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
				img.src = imageUrl;
				img.alt = "Imagen de la web: " + web[i].name;
				aImg.appendChild(img)
				divWeb.appendChild(aImg);

				var p = document.createElement("p");
				p.innerText = web[i].description;
				divWeb.appendChild(p);

				valoracion = document.createElement("div");
				valoracion.classList.add("valoracion");
				for (let index = 1; index <= 5; index++) {
					let estrella = document.createElement("button");
					estrella.addEventListener("click", function () {
						colorEstrellaPulsada(this, index);
					});
					estrella.innerText = '★ ';
					estrella.dataset.index = index;
					estrella.dataset.idweb = web[i].idWeb;
					estrella.setAttribute("value", index)
					estrella.classList.add("estrellas");
					valoracion.appendChild(estrella);
				}


				divWeb.appendChild(valoracion);

				main.appendChild(divWeb);

			


			}

			if (ponerParrafo) {
				var p = document.createElement("h2");
				p.innerText = "Sugerencias de nuestros usuarios"
				p.id = "sugerencias";
				main.appendChild(p)
			}
			

			x = document.getElementById("login");
			y = document.getElementById("signup");
			z = document.getElementById("btn");


			let mainNav = document.getElementById('js-menu');
			let navBarToggle = document.getElementById("nav-bar-menu");

			navBarToggle.addEventListener('click', function () {
				mainNav.classList.toggle('active');
			});

			webs = document.getElementsByClassName("web");

			var miCookie = readCookie("nombre");
			user = miCookie;
			if (miCookie != null) {

				document.getElementById('welcome').innerText = "Buenas " + miCookie;
				document.getElementById('welcome2').innerText = " ¿No eres " + miCookie + "?";

				showRating();


				if (verified == "false") {
					fallasUsuario(miCookie, web);
				} else {
					fallasUsuario(miCookie, "");

				}


			}else{
				document.getElementById("insertar").style.display = "none";
			}


			if (document.cookie.includes("cookie=true") && document.getElementById("cookieAdv") != null) {

				document.getElementById("cookieAdv").style.display = "none";
			}

			

		});



}

