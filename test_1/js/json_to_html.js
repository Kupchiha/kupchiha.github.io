///////////////////////
// тестовые упражнения
var str = "13", num = 0.2, ok_getJSON = 0;
  alert( '<<FILE>>  "json_to_html.js"  ver' +String(num));


/*
if($.browser.chrome) {  alert('browser.chrome');}
else if ($.browser.mozilla) { alert('browser.mozilla');}
else if ($.browser.msie) {  alert('browser.msIE');}
else alert('browser no cnow name');
*/
if (navigator.userAgent.search("MSIE") >= 0) {alert('your browser "IE"');}
else if (navigator.userAgent.search("Chrome") >= 0) {alert('your browser "Chrome"');}
else if (navigator.userAgent.search("Firefox") >= 0) {alert('your browser "Firefox"');	}
else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0)
	{alert('your browser "Safari"');}
else if (navigator.userAgent.search("Opera") >= 0) {alert('your browser "Opera"');	}
else alert('your browser know name');




function Data_Json_Append (json){
		jQuery('#exam').html('');
		jQuery('#exam').append('To: ' +json.note1.to + '<br/>')
					.append('From:'+json.note1.from + '<br/>')
					.append('<b>  My: '  +json.note1.heading + '</b><br/>')
					.append(json.note1.body + '<br/>')
					.append(json.note1.body3 + '<br/>')
					.append(json.note2.body11 + '<br/>')
					.append(json.note2.body12 + '<br/>')
					.append('<b>Доступ c str:' + json["note"+String(2)]["body"+String(num)] + '</b><br/>');
}; 		 

function Data_text_Append (){
		jQuery('#exam').html('');
		jQuery('#exam').append('To: ' +'1111111111' + '<br/>')
					.append('From:'+'22222222'  + '<br/>')
					.append('<b>  My: '  +'1111111111'  + '</b><br/>')
					.append('1111111111'  + '<br/>')
					.append('1111111111'  + '<br/>')
					.append('1111111111'  + '<br/>')
					.append('1111111111'  + '<br/>')
					.append('<b>Доступ c str:' + '1111111111'  + '</b><br/>');
}; 		 


function getJSON_s(){
		jQuery.getJSON('data/example.json', {},	Data_Json_Append );                
		ok_getJSON=1;
};

function getTEXT_s(){
		jQuery.getJSON('data/example.json', {},Data_Json_Append );                
		ok_getJSON=1;
};

			
jQuery(document).ready 		( 
			function()	{ jQuery('#exam').click(getTEXT_s)
							if (ok_getJSON != 1) setTimeout(getTEXT_s, 1000);							
						}	);
function myfuc(){
		
		jQuery(document).ready(setTimeout(Data_text_Append , 6000) );
		alert('RUN myfuc = OK! OK!  OK! OK! OK! OK!');
};
					

// срабатывает таймер и запускат фу-ю getJSON_s -читает JSON-текст из файла data/example.json
//jQuery(document).ready( setTimeout(getJSON_s, 1000) );
//jQuery(document).ready(getJSON_s);
jQuery(document).ready(setTimeout(myfuc, 3000) );
