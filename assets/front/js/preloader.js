let preloader = document.getElementById('preloader');

let header = document.getElementsByTagName('header');
let sections = document.getElementsByTagName('section');
let footer = document.getElementsByTagName('footer');

window.onload = function() {
	preloader.classList.add('preloader_hidden');
	
	for (let i = 0; i < header.length; i++) {
		header[i].classList.add('full_size');
	}

	for (let i = 0; i < sections.length; i++) {
		sections[i].classList.add('full_size');
	}

	for (let i = 0; i < footer.length; i++) {
		footer[i].classList.add('full_size');
	}
};