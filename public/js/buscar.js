var categorias = new Array;



window.onload = function () {

	 x = document.getElementById("login");
	 y = document.getElementById("register");
	 z = document.getElementById("btn");



	//NAVBAR RESPONSIVE
	let mainNav = document.getElementById('js-menu');
	let navBarToggle = document.getElementById("nav-bar-menu");

	navBarToggle.addEventListener('click', function () {
		mainNav.classList.toggle('active');
	});

}

function init(){


}


//FORM REGISTER
function register(){
	x.style.left = "-400px";
	y.style.left = "50px";
	console.log(document.getElementsByClassName("button-box")[0].offsetWidth);

	if(document.getElementsByClassName("button-box")[0].offsetWidth >= "220"){
		z.style.left = "110px";
	}else{
		z.style.left = "85px";
	}
}

function login(){
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0";
}



