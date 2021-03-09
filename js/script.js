"use strict"

document.addEventListener('DOMContentLoaded', function (){
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if(error === 0) {

		} else {
			alert('Заполните обязательные поля');
		}

	}

	function formValidate(e) {
		let error = 0;
		let formReq =document.querySelector ('._req ')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//Функия теста emaeil
	function emailTest(input) {
		return  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\. \w{2.8})+$/.test(input.value);
	}


	const formImage  = document.getElementById('formImage');
	const formPreview  = document.getElementById('formPrewiew');

	formImage.addEventListener('change', ()=> {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPrewiew.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});