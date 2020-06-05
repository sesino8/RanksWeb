var categorias = new Array;
var webs = new Array;
var detalles = new Array;
var descriptionWebs = new Array;
var description = new Array;



window.onload = function () {
	var elementDresciption = new Array;

	x = document.getElementById("login");
	y = document.getElementById("register");
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

	}

	for (let i = 0; i < detalles.length; i++) {
		//id web
		elementDresciption.push(i);

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



		for (let j = 0; j < detalles[i].length; j++) {
			//Cogemos los enlaces para sacarles cada URL de cada web para después a la hora de filtrar 
			//que podamos clasificarlas sin problema
			var element = detalles[i][j].innerText;


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

	console.log(descriptionWebs)

}

function init() {


}

//Funcion que rellena el array de categorias
function categoria(category) {
	console.log(category);

	var sringHtml;

	var finalHtml = "";

	for (let i = 0; i < descriptionWebs.length; i++) {
		//Ponemos la posición uno porque es dónde esta la categoria 

		if (descriptionWebs[i][2] == category) {

			for (let j = 0; j < 5; j++) {
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

	finalHtml = "";



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

	ip = await getIp();

	puntuar(ev.dataset.idweb, ev.dataset.index, ip);
}


function recogerIdMongoWeb(id) {
	fetch('/puntuaciones/' + id, {
		method: "GET"
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {
			console.log(falla);
		});

}

function puntuar(idweb, value, ip) {

	console.log(idweb);
	fetch('/puntuaciones/' + idweb + "/" + value + "/" + ip, {
		method: "POST"
	}).then(function (response) {
		return response.json();
	})
		.then(function (falla) {
			console.log(falla);
		});

}

function loginSubmit() {
	email = document.getElementById('login').children[0].value;
	passwd = document.getElementById('login').children[1].value;

	var url = 'http://localhost:4000/user/signup';
	var data = {email: email, password: passwd};
	
	fetch(url, {
	  method: 'POST', // or 'PUT'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{
		'Content-Type': 'application/json'
	  }
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response))

}

async function getIp() {
	let ipJson = await fetch('https://api6.ipify.org?format=json');
	let json = await ipJson.json();
	return json.ip;
}