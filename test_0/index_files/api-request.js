/*! This file is auto-generated */
!function(c){var w=window.wpApiSettings;function t(e){return e=t.buildAjaxOptions(e),t.transport(e)}t.buildAjaxOptions=function(e){var t,n,a,p,o,r,i=e.url,d=e.path,s=e.method;for(r in"string"==typeof e.namespace&&"string"==typeof e.endpoint&&(n=e.namespace.replace(/^\/|\/$/g,""),d=(t=e.endpoint.replace(/^\//,""))?n+"/"+t:n),"string"==typeof d&&(n=w.root,d=d.replace(/^\//,""),"string"==typeof n&&-1!==n.indexOf("?")&&(d=d.replace("?","&")),i=n+d),p=!(e.data&&e.data._wpnonce),o=!0,a=e.headers||{})if(a.hasOwnProperty(r))switch(r.toLowerCase()){case"x-wp-nonce":p=!1;break;case"accept":o=!1}return p&&(a=c.extend({"X-WP-Nonce":w.nonce},a)),o&&(a=c.extend({Accept:"application/json, */*;q=0.1"},a)),"string"==typeof s&&("PUT"!==(s=s.toUpperCase())&&"DELETE"!==s||(a=c.extend({"X-HTTP-Method-Override":s},a),s="POST")),delete(e=c.extend({},e,{headers:a,url:i,method:s})).path,delete e.namespace,delete e.endpoint,e},t.transport=c.ajax,window.wp=window.wp||{},window.wp.apiRequest=t}(jQuery);