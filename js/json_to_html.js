///////////////////////
// тестовые упражнения
var str = "13", num = 13, ok_getJSON = 0;
  alert( String(num));

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

function getJSON_s(){
		jQuery.getJSON('data/example.json', {},	Data_Json_Append );                
		ok_getJSON=1;
};
			
	/* jQuery(document).ready (  
					function(){
						jQuery('#exam').click(getJSON_s)
						if (ok_getJSON != 1) setTimeout(getJSON_s, 1000);							
						
					}
		*/			
				
jQuery(document).ready( setTimeout(getJSON_s, 1000) );