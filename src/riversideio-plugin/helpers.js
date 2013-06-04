(function(RiversideioPlugin){  
  RiversideioPlugin.prototype.Uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === "x" ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  RiversideioPlugin.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];
    }
    return script;
  };

  RiversideioPlugin.prototype.InsertAfter = function(reference_node, new_node) {
    return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
  };

  RiversideioPlugin.prototype.Encode64 = function(input) {
    var char, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, invalidChar, output, _i, _len, _ref,
    CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    output = '';
    i = 0;
    input = unescape(encodeURIComponent(input));
    while (i < input.length) {
      chr1 = input.charCodeAt(i++) || 0;
      chr2 = input.charCodeAt(i++) || 0;
      chr3 = input.charCodeAt(i++) || 0;
      invalidChar = Math.max(chr1, chr2, chr3);
      if (invalidChar > 0xFF) {
        throw (invalidChar + " is an invalid BASE64 character");
      }
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      _ref = [enc1, enc2, enc3, enc4];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        output += CHARACTERS.charAt(char);
      }
    }
    return output;
  };

  RiversideioPlugin.prototype.Post = function(url, data, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", url, true);

    if (data.key) {
      var key = this.Encode64(data.key);
      delete data.key;
      xmlhttp.setRequestHeader("Authorization", "Basic "+key);
    }

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4){
        if (xmlhttp.status==200){
          callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.error("You found an ajax error. Contact us at Riverside.io with any information you have, and we will fix it.");
        }
      }
    };

    xmlhttp.send(JSON.stringify(data));
  };

  RiversideioPlugin.prototype.hasClass = function(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
  };

  RiversideioPlugin.prototype.addClass = function(el, name) {
    if (!this.hasClass(el, name)) { 
      el.className += (el.className ? ' ' : '') +name; 
    }
  };

  RiversideioPlugin.prototype.removeClass = function(el, name) {
    if (this.hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
  };

}(RiversideioPlugin));