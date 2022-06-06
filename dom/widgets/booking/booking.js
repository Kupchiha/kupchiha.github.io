function sumBooking() {
	var itogo = 0;
		$(".pb input:checked").each(function() {
			itogo = itogo + parseInt($(this).attr('cena'))*parseInt($('#'+$(this).attr('room')).val());
		});
		
	var Date1 = new Date($('#datepicker3').val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	var Date2 = new Date ($('#datepicker4').val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));	
	var Days = Math.floor(((Date2.getTime() - Date1.getTime())/(1000*60*60*24)));
		
	$('#itogo').attr('rel', Days);
	if (Days == 1) {
		$('#days').text(Days+' сутки');
		$('#days2').text(Days+' сутки');
		}
	if (Days > 1) {
		$('#days').text(Days+' суток');
		$('#days2').text(Days+' суток');
		}
		
	$('#itogo').text(itogo);
	$('#itogo2').text(itogo);
}

function activeFormBooking() {
	$('#block_booking').fadeOut(50);
	$('#form_booking :input').attr('disabled', false);
	$('#form_booking').css('opacity', '1.0');
return false;
}

function activateDays(d1, d2) {
	sumBooking();
	$('#itogo').text('0');
	$('#itogo2').text('0');
	
	$.post("widgets/booking/date.php", { 
		date: d1,
		date2: d2
	},
	function(data){
		if (data.length>0) {
		if (data == '1') {
			alert("На выбранные Вами даты, забронировать номер online невозможно! Свяжитесь с отделом бронирования и мы подберем для Вас оптимальный вариант.");
			$('input[name=date_vyezda2]').val('');
			$('#go').click();
			return false;
		}
			$('.tableBooking').html('Загрузка цен...');
		
			$.post("widgets/booking/table.php", { 
				data: data
			},
			function(data2){
				if (data2.length>0) $('.tableBooking').html(data2);				
			});				
		}
		return false;
	});
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height()-80 - this.outerHeight()-80) / 2) + $(window).scrollTop()-80 + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}

$(document).ready(function(){
	$('#block_booking').fadeOut();
	
	$("a.commentRoom").click(function () {
      $("div#inf"+$(this).attr('id')).fadeToggle(300);
	  return false;
    });
	
	$(".pb input:radio").click(function () {
		sumBooking();
	});
	
	$("a.clearChek").click(function () {
		$("input[name='"+$(this).attr('name')+"']").attr('checked', false);
		sumBooking();
	return false;
	});
	
	$("#editBooking").click(function () {
		activeFormBooking();
	});

	$("#form_booking input:submit").click(function () {
		$('#block_booking').center();
	});	
	
	$("#sendOkBooking").click(function () {
	
	var rooms = new Array();
	$(".pb input:checked").each(function() {
		rooms.push($(this).val());
	});		
	
	$.post("widgets/booking/booking.php", { 
		data: $('#rez_booking').html(),
		flag: 1,
		email: $('input[name=email]').val(),
		comment: $('textarea[name=comment]').val()
		},
		function(data){
			if (data == '1') {
				$("#form_booking").trigger('reset');
				$('#rez_booking').html('<h1>Заявка отправлена!</h1><strong>В ближайшее время с Вами свяжется наш администратор, чтобы подтвердить бронирование.</strong>');
				}
			else $('#rez_booking').html('<h1>Не удалось отправить заявку!</h1><strong>Повторите попытку или воспользуйтесь другими способами бронирования.</strong>');			
			$('#editBooking').attr('value', 'Закрыть');
			$('#sendOkBooking').css('display', 'none');
		});
		
		return false;		
	});
	
	if ($('#datepicker3').is(':visible')) {
		$("#datepicker3").datepicker({firstDay: 1, minDate: 0, dateFormat: "dd.mm.yy", changeYear: "true", changeMonth: "true", dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], yearRange: '-0nn:+1nn', showButtonPanel: true});
		$("#datepicker4").datepicker({firstDay: 1, minDate: +1, dateFormat: "dd.mm.yy", changeYear: "true", changeMonth: "true", dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], yearRange: '-0nn:+1nn', showButtonPanel: true});
	}
	
	$('#datepicker3').change(function() { 
		
		var date_now = new Date();			
		var date = new Date($('#datepicker3').datepicker('getDate'));
		var Days = Math.floor(((date.getTime() - date_now.getTime())/(1000*60*60*24))+1);
		$("#datepicker4").datepicker("destroy");
		$("#datepicker4").datepicker({minDate: (Days+1), dateFormat: "dd.mm.yy", changeYear: "true", changeMonth: "true", dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], yearRange: '-0nn:+1nn', showButtonPanel: true});
		
		if ($('input[name=date_zaezda2]').val().length == 10 && $('input[name=date_vyezda2]').val().length == 10) {
			activateDays($(this).val(), $('input[name=date_vyezda2]').val());			
		}
	});
	$('#datepicker4').change(function() { 
		if ($('input[name=date_zaezda2]').val().length == 10 && $('input[name=date_vyezda2]').val().length == 10) activateDays($('input[name=date_zaezda2]').val(), $(this).val());	
	});

//---
	$('form[name=form_booking]').submit(function(){
	
	var prov = 0;	

	var date_1 = new Date($("#datepicker3").val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	var date_2 = new Date($("#datepicker4").val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	
	if (date_1 > date_2) {
		prov = 1;
		$('input[name=date_zaezda2]').val('');
		$('input[name=date_vyezda2]').val('');
		alert('Ошибка - дата выезда, больше даты заезда!');
	}	

	$('form[name=form_booking] input[type=text]').each(function() { $(this).css('background-color', '#e9eaeb');  });

	$('form[name=form_booking] input[type=text]').each(function() {
	    if(!$(this).val().length && $(this).attr('rel')=='1') {
	      $(this).css('background-color', '#c06768');
		  prov = 1;
	    }
	  });

	var coll = 0;
	$(".pb input:checked").each(function() {
		coll = coll + 1;
	});
  
	if (coll == 0) {		
		alert('Не выбран номер для бронирования!');
	return false;
	}		  
  
	if (prov == 1) {		
		alert('Одно из обязательных полей формы бронирования, не заполнено!');
	return false;
	}		

	var rooms = new Array();
	$(".pb input:checked").each(function() {
		rooms.push($(this).val()+', Кол-во номеров: '+$('#'+$(this).attr('room')).val());		
	});
	
	var buf = $('form[name=form_booking]').serialize();
	$.post("widgets/booking/booking.php", { 
		data: buf,
		selectRooms: rooms,
		itogo: $('#itogo').text(),
		flag: 0
		},
		function(data){
			$('#editBooking').attr('value', 'Изменить бронь');
			$('#sendOkBooking').css('display', 'block');
			$('#rez_booking').html(data);	
			$('#form_booking :input').attr('disabled', true);
			$('#form_booking').css('opacity', '0.2');
			$('#block_booking').fadeIn(100);
		});
	
	return false;
	});
//-------------
	
});