/*! riversideio-plugin.js - 0.0.1 - 2013-06-03 - scottmotte */
(function(exports){
  var RiversideioPlugin = function() {
    if(!(this instanceof RiversideioPlugin)){
      return new RiversideioPlugin();
    }

    this.endpoint       = "https://victoria-club.herokuapp.com/api/v0";
    this.script         = this.CurrentlyExecutedScript();
    this.user_id        = null;
    this.session_token  = null;
    this.init();

    return this;
  };

  RiversideioPlugin.prototype.init = function() {
    if (this.script) {
      this.script.className += " riversideio-script";

      this.draw();
      this.events();
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  exports.RiversideioPlugin = RiversideioPlugin;

}(this));

(function(RiversideioPlugin){
  RiversideioPlugin.prototype.draw = function() {   
    this._drawSignupForm();
    this._drawLoginForm();
    this._drawCCForm();
  };

  RiversideioPlugin.prototype._drawSignupForm = function() {
    this.signup_form                  = document.createElement('form');
    this.signup_form.className        = "riversideio-signup-form";
    this.signup_form.method           = "POST";
    this.signup_form.action           = "#";

    this.email_field                  = document.createElement('input');
    this.email_field.className        = "riversideio-email-field";
    this.email_field.type             = "email";
    this.email_field.placeholder      = "Email";
    this.email_field.setAttribute("required", "");
    this.signup_form.appendChild(this.email_field);

    this.password_field               = document.createElement('input');
    this.password_field.className     = "riversideio-password-field";
    this.password_field.type          = "password";
    this.password_field.placeholder   = "Password";
    this.password_field.setAttribute("required", "");
    this.signup_form.appendChild(this.password_field);

    this.signup_btn                   = document.createElement('input');
    this.signup_btn.className         = "riversideio-signup-btn";
    this.signup_btn.type              = "submit";
    this.signup_btn.value             = "Join";
    this.signup_form.appendChild(this.signup_btn);

    return this.InsertAfter(this.script, this.signup_form);
  };

  RiversideioPlugin.prototype._drawLoginForm = function() {
    this.login_form                             = document.createElement('form');
    this.login_form.className                   = "riversideio-login-form";
    this.login_form.method                      = "POST";
    this.login_form.action                      = "#";

    this.login_form.email_field                 = document.createElement('input');
    this.login_form.email_field.className       = "riversideio-login-email-field";
    this.login_form.email_field.type            = "email";
    this.login_form.email_field.placeholder     = "Email";
    this.login_form.email_field.setAttribute("required", "");
    this.login_form.appendChild(this.login_form.email_field);

    this.login_form.password_field              = document.createElement('input');
    this.login_form.password_field.className    = "riversideio-login-password-field";
    this.login_form.password_field.type         = "password";
    this.login_form.password_field.placeholder  = "Password";
    this.login_form.password_field.setAttribute("required", "");
    this.login_form.appendChild(this.login_form.password_field);

    this.login_form.login_btn                   = document.createElement('input');
    this.login_form.login_btn.className         = "riversideio-login-btn";
    this.login_form.login_btn.type              = "submit";
    this.login_form.login_btn.value             = "Login";
    this.login_form.appendChild(this.login_form.login_btn);

    return this.InsertAfter(this.script, this.login_form);
  };

  RiversideioPlugin.prototype._drawCCForm = function() {
    this.cc_form                  = document.createElement('form');
    this.cc_form.className        = "riversideio-cc-form";
    this.cc_form.method           = "PUT";
    this.cc_form.action           = "#";

    this.card_number_field                      = document.createElement('input');
    this.card_number_field.className            = "riversideio-card-number-field";
    this.card_number_field.type                 = "text";
    this.card_number_field.placeholder          = "Card Number";
    this.card_number_field.setAttribute("required", "");
    this.cc_form.appendChild(this.card_number_field);

    this.card_exp_month_field                   = document.createElement('input');
    this.card_exp_month_field.className         = "riversideio-card-exp-month-field";
    this.card_exp_month_field.type              = "text";
    this.card_exp_month_field.placeholder       = "MM";
    this.card_exp_month_field.setAttribute("required", "");
    this.cc_form.appendChild(this.card_exp_month_field);

    this.card_exp_year_field                    = document.createElement('input');
    this.card_exp_year_field.className          = "riversideio-card-exp-year-field";
    this.card_exp_year_field.type               = "text";
    this.card_exp_year_field.placeholder        = "YY";
    this.card_exp_year_field.setAttribute("required", "");
    this.cc_form.appendChild(this.card_exp_year_field);

    this.card_cvc_field                         = document.createElement('input');
    this.card_cvc_field.className               = "riversideio-card-cvc-field";
    this.card_cvc_field.type                    = "text";
    this.card_cvc_field.placeholder             = "CVC";
    this.card_cvc_field.setAttribute("required", "");
    this.cc_form.appendChild(this.card_cvc_field);

    this.cc_btn                                 = document.createElement('input');
    this.cc_btn.className                       = "riversideio-cc-btn";
    this.cc_btn.type                            = "submit";
    this.cc_btn.value                           = "Submit";
    this.cc_form.appendChild(this.cc_btn);

    return this.InsertAfter(this.script, this.cc_form);
  };

}(RiversideioPlugin));

(function(RiversideioPlugin){
  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  RiversideioPlugin.prototype.events = function() {
    self = this;

    this.signup_form.addEventListener("submit", this.submitSignupForm, false);
    this.login_form.addEventListener("submit", this.submitLoginForm, false);
    this.cc_form.addEventListener("submit", this.submitCCForm, false);
  };

  RiversideioPlugin.prototype.submitSignupForm = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      email: self.email_field.value, 
      password: self.password_field.value
    };

    self.Post(self.endpoint+'/users.json', payload, function(resp){
      if (!!resp.success) {
        self.session_token = resp.user.session_token;
        alert("implement");
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.submitLoginForm = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      email: self.login_form.email_field.value, 
      password: self.login_form.password_field.value
    };

    self.Post(self.endpoint+'/sessions.json', payload, function(resp){
      if (!!resp.success) {
        self.user_id        = resp.id;
        self.session_token  = resp.session_token;
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.submitCCForm = function(e) {
    if (e) { e.preventDefault(); }

    var payload = {
      session_token:  self.session_token,
      card_number:    self.card_number_field.value,
      card_cvc:       self.card_cvc_field.value,
      card_exp_month: self.card_exp_month_field.value,
      card_exp_year:  self.card_exp_year_field.value
    };

    self.Post(self.endpoint+'/users/'+self.user_id+'/update_card.json', payload, function(resp){
      if (!!resp.success) {
        alert("implement");
      } else {
        alert(resp.error.message);
      }
    });
  };
}(RiversideioPlugin));

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
  
  RiversideioPlugin.prototype.StandardScreen = function() {
    return document.body.clientWidth >= 580;
  };

  RiversideioPlugin.prototype.FireEvent = function(name, target, data) {
    //Create a generic event
    var bubbles     = true;
    var cancelable  = true;
    var event       = document.createEvent("Events");
    //Initialize it to be the event we want
    event.initEvent(name, bubbles, cancelable);
    event.data = data;
    //FIRE!
    target.dispatchEvent(event);
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

  RiversideioPlugin.prototype.postSignature = function(data_url) {
    self = this;
    var payload = {data_url: data_url, key: self.key};
    self.Post(self.endpoint+'/api/v0/signatures.json', payload, function(resp){
      if (!!resp.success) {
        self.hidden_field.value = resp.signature.url;
        self.FireEvent("signature_pad:save", self.script, resp.signature);
      } else {
        console.error(resp.error.message);
      }
    });
  };

}(RiversideioPlugin));

var riversideio_plugin = RiversideioPlugin();