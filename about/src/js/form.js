module.exports = function () {
	var submitForm = $('#order_write_form');
	var clientName = $('#fio');
	var phone = $('#phone');
	var formIsValid = {
		clientName: false,
		phone: false
	}

	clientName.on('input', function () {
		if (clientName.val() === '') {
			formIsValid.clientName = false;
			toggleInput(clientName, false)
		} else {
			formIsValid.clientName = true;
			toggleInput(clientName, true)
		}
		checkForms();
	});
	submitForm.submit(function () {
		var postData = submitForm.serializeArray();

		$.ajax({
			type: 'post',
			url: '/ajax/ajax.php',
			dataType: 'json',
			data: postData,
			success: function(data) {
				if (data.status > 0) {
					$('#appointment').modal('hide');
					$('#success').modal('show');
				}
				else {

				}
			}
		});

		return false;
	});
	phone.on('input', function () {
		var phoneIsValid = ValidPhone(phone.val());
		toggleInput(phone, phoneIsValid);
		formIsValid.phone = phoneIsValid;
		checkForms();
	});

	function ValidPhone(phoneNumber) {
		var re = /^\+?\d[\d\(\)\ -]{4,14}\d$/;
		return re.test(phoneNumber);
	}
	function checkForms() {
		var allForm = Object.keys(formIsValid).length
		var counter = 0;
		for(var key in formIsValid) {
			formIsValid[key] && ++counter;
		}

		if (counter === allForm) {
			$('#order_write_send').prop('disabled', false);
		} else {
			$('#order_write_send').prop('disabled', true);
		}
	}
	function toggleInput(elem, isSuccess) {
		var group = elem.parent('.form-group');
		if (isSuccess) {
			group.removeClass('has-error');
			group.addClass('has-success');
			elem.addClass('form-control-success');
			elem.removeClass('form-control-error');
		} else {
			group.addClass('has-error');
			group.removeClass('has-success');
			elem.addClass('form-control-error');
			elem.removeClass('form-control-success');
		}
	}
}
