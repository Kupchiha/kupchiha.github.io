jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height()-80 - this.outerHeight()-80) / 2) + $(window).scrollTop()-80 + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}

$(document).ready(function(){
    $(".tabs").lightTabs();
	if (device.windows() != true) $('.da-thumbs li a div').css('display', 'none');
//-------------
if ($('#datepicker').is(':visible')) {
		$("#datepicker").datepicker({firstDay: 1, minDate: 0, dateFormat: "dd.mm.yy", changeYear: "true", changeMonth: "true", dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], yearRange: '-0nn:+1nn', showButtonPanel: true});
		$("#datepicker2").datepicker({firstDay: 1, minDate: +1, dateFormat: "dd.mm.yy", changeYear: "true", changeMonth: "true", dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], yearRange: '-0nn:+1nn', showButtonPanel: true});
	}	
	
$('form[name=online_booking]').submit(function(){
	var prov = 0;	

	var date_1 = new Date($("#datepicker").val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	var date_2 = new Date($("#datepicker2").val().replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
	
	if (date_1 > date_2) {
		prov = 1;
		$('input[name=date_zaezda]').val('');
		$('input[name=date_vyezda]').val('');
	}	

	$('form[name=online_booking] input[type=text]').each(function() { $(this).css('background', '#e9eaeb'); });

	$('form[name=online_booking] input[type=text]').each(function() {
	    if(!$(this).val().length && $(this).attr('rel')=='1') {
	      $(this).css('background', '#c06768');
		  prov = 1;
	    }
	  });	
 
	if (prov == 1) {		
		alert('Одно из обязательных полей формы бронирования, не заполнено!');
	return false;
	}	
});
//--------------
$("#updatecode").click(function() {
		$('#code').html('<img id="captcha" src="fotocode/code.jpg">');
		return false;
	});

	$(".cp div.chel").click(function() {

		if ($(this).attr('val') == 0) {
			$(this).attr('val', '1');
			$(this).css('background', '#e9eaeb url(images/ticksmallred.png) no-repeat center center');	
			$('.rez').css('visibility', 'visible');
			$('.chel').css('opacity', '0.4');
			$('#code').html('<img id="captcha" src="fotocode/code.jpg">');
			}
		else {
			$(this).attr('val', '0');
			$(this).css('background', '#e9eaeb');
			$('.rez').css('visibility', 'hidden');
			$('.chel').css('opacity', '1.0');
			}
					//alert($(this).attr('val'));
	});
	
	$('form[name=guestbook]').submit(function(){

		var prov = 0;		
		if ($('input[name=name]').val().length < 3) prov = 1;
		if ($('input[name=keystring]').val().length != 4) prov = 1;
		if ($('textarea[name=info]').val().length < 10) prov = 1;			
			
		if (prov == 1) {
			alert('Одно из обязательных полей, не заполнено! Обязательные поля: Автор, Сообщение, Код проверки на человечность.');
		return false;
		}
	});
	
	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		sumBooking();
		return false;
	});	
	$('.plus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) + 1;
		count = count > parseInt($(this).attr('maxint')) ? parseInt($(this).attr('maxint')) : count;
		$input.val(count);		
		$input.change();
		sumBooking();
		return false;
	});
	
});