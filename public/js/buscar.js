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
		for (let j = 0; j < detalles[i].length; j++) {
			//Cogemos los enlaces para sacarles cada URL de cada web para después a la hora de filtrar 
			//que podamos clasificarlas sin problema
			if (detalles[i][j].tagName == 'A') {
				elementDresciption.push(detalles[i][j].href);
				console.log(detalles[i][j].href);

			} else {
				elementDresciption.push(detalles[i][j].innerText);
				console.log(detalles[i][j].innerText);

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
function categoria() {
	console.log("fsajsa");

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



