/*! riversideio-plugin.js - 0.0.1 - 2013-07-27 - scottmotte */
(function(exports){
  "use strict";

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

      if (this.isShittyIE()) {
        var msg = "Your browser version is not supported. Open this webpage on your mobile phone, install Google Chrome, or update your Internet Explorer to version 10.";
        console.error(msg);
        alert(msg);
      } else {
        this.draw();
        this.events();
      }
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  exports.RiversideioPlugin = RiversideioPlugin;

}(this));


(function(RiversideioPlugin){
  "use strict";

  RiversideioPlugin.prototype.draw = function() {
    this._drawWrapper();
    this._drawOverlay();
    this._drawSignupForm();
    this._drawLoginForm();
    this._drawInfoForm();
    this._drawCCForm();
    this._drawCss();
  };

  RiversideioPlugin.prototype.createInput = function( options ){

    var input           = document.createElement('input');

    input.className     = options.className || "";
    input.type          = options.type || "text";
    input.placeholder   = options.placeholder || "";

    if( options.required ){
        input.setAttribute("required", "");
    }

    return input;

  };

  RiversideioPlugin.prototype._drawWrapper = function() {
    this.wrapper                      = document.createElement('div');
    this.wrapper.className            = "riversideio-wrapper riversideio-wrapper-overlay";

    return this.InsertAfter(this.script, this.wrapper);
  };

  RiversideioPlugin.prototype._drawOverlay = function() {
    this.overlay                      = document.createElement('div');
    this.overlay.className            = "riversideio-overlay riversideio-hidden";

    var loading_text                  = document.createElement('div');
    loading_text.className            = "riversideio-overlay-loading-text";
    loading_text.innerHTML            = "Processing...";

    this.overlay.appendChild(loading_text);

    return this.wrapper.appendChild(this.overlay);
  };

  RiversideioPlugin.prototype._drawSignupForm = function() {
    this.signup_form                  = document.createElement('form');
    this.signup_form.className        = "riversideio-signup-form riversideio-form pure-form pure-form-stacked";
    this.signup_form.method           = "POST";
    this.signup_form.action           = "#";

    var fieldset                      = document.createElement('fieldset');

    var label1                        = document.createElement('label');
    label1.innerHTML                  = "Email";
    fieldset.appendChild(label1);

    this.signup_form.email_field                  = document.createElement('input');
    this.signup_form.email_field.className        = "riversideio-email-field";
    this.signup_form.email_field.type           = "email";
    this.signup_form.email_field.placeholder      = "Email";
    this.signup_form.email_field.setAttribute("required", "");
    fieldset.appendChild(this.signup_form.email_field);

    var label2                        = document.createElement('label');
    label2.innerHTML                  = "Password";
    fieldset.appendChild(label2);

    this.signup_form.password_field               = document.createElement('input');
    this.signup_form.password_field.className     = "riversideio-password-field";
    this.signup_form.password_field.type          = "password";
    this.signup_form.password_field.placeholder   = "Password";
    this.signup_form.password_field.setAttribute("required", "");
    fieldset.appendChild(this.signup_form.password_field);

    this.signup_form.appendChild(fieldset);

    this.signup_form.signup_btn                   = document.createElement('button');
    this.signup_form.signup_btn.className         = "riversideio-signup-btn riversideio-btn pure-button notice";
    this.signup_form.signup_btn.setAttribute("type", "submit");
    this.signup_form.signup_btn.innerHTML         = "Join";
    this.signup_form.appendChild(this.signup_form.signup_btn);

    this.signup_form.login_link                   = document.createElement('a');
    this.signup_form.login_link.href              = "#";
    this.signup_form.login_link.innerHTML         = "login";
    this.signup_form.appendChild(this.signup_form.login_link);

    return this.wrapper.appendChild(this.signup_form);
  };

  RiversideioPlugin.prototype._drawLoginForm = function() {
    this.login_form                             = document.createElement('form');
    this.login_form.className                   = "riversideio-login-form riversideio-form pure-form pure-form-stacked riversideio-hidden";
    this.login_form.method                      = "POST";
    this.login_form.action                      = "#";

    var fieldset                  = document.createElement('fieldset');

    var label1                                  = document.createElement('label');
    label1.innerHTML                            = "Email";
    fieldset.appendChild(label1);

    this.login_form.email_field                 = document.createElement('input');
    this.login_form.email_field.className       = "riversideio-login-email-field";
    this.login_form.email_field.type            = "email";
    this.login_form.email_field.placeholder     = "Email";
    this.login_form.email_field.setAttribute("required", "");
    fieldset.appendChild(this.login_form.email_field);

    var label2                                  = document.createElement('label');
    label2.innerHTML                            = "Password";
    fieldset.appendChild(label2);

    this.login_form.password_field              = document.createElement('input');
    this.login_form.password_field.className    = "riversideio-login-password-field";
    this.login_form.password_field.type         = "password";
    this.login_form.password_field.placeholder  = "Password";
    this.login_form.password_field.setAttribute("required", "");
    fieldset.appendChild(this.login_form.password_field);

    this.login_form.appendChild(fieldset);

    this.login_form.login_btn                   = document.createElement('button');
    this.login_form.login_btn.className         = "riversideio-login-btn riversideio-btn pure-button notice";
    this.login_form.login_btn.setAttribute("type", "submit");
    this.login_form.login_btn.innerHTML         = "Login";
    this.login_form.appendChild(this.login_form.login_btn);

    this.login_form.join_link                   = document.createElement('a');
    this.login_form.join_link.href              = "#";
    this.login_form.join_link.innerHTML         = "join";
    this.login_form.appendChild(this.login_form.join_link);

    return this.wrapper.appendChild(this.login_form);
  };

  RiversideioPlugin.prototype._drawCCForm = function() {
    this.cc_form                                = document.createElement('form');
    this.cc_form.className                      = "riversideio-cc-form riversideio-form pure-form pure-form-stacked riversideio-hidden";
    this.cc_form.method                         = "POST";
    this.cc_form.action                         = "#";

    var fieldset                                = document.createElement('fieldset');

    var label1                                  = document.createElement('label');
    label1.innerHTML                            = "Card Number";
    fieldset.appendChild(label1);

    this.cc_form.card_number_field                      = document.createElement('input');
    this.cc_form.card_number_field.className            = "riversideio-card-number-field";
    this.cc_form.card_number_field.type                 = "number";
    this.cc_form.card_number_field.placeholder          = "Card Number";
    this.cc_form.card_number_field.setAttribute("required", "");
    fieldset.appendChild(this.cc_form.card_number_field);

    var label2                                  = document.createElement('label');
    label2.innerHTML                            = "Exp Date";
    fieldset.appendChild(label2);

    this.cc_form.card_exp_month_field                   = document.createElement('input');
    this.cc_form.card_exp_month_field.className         = "riversideio-card-exp-month-field";
    this.cc_form.card_exp_month_field.type              = "number";
    this.cc_form.card_exp_month_field.placeholder       = "MM";
    this.cc_form.card_exp_month_field.className         = "riversideio-exp-date-input";
    this.cc_form.card_exp_month_field.setAttribute("required", "");
    fieldset.appendChild(this.cc_form.card_exp_month_field);

    this.cc_form.card_exp_year_field                    = document.createElement('input');
    this.cc_form.card_exp_year_field.className          = "riversideio-card-exp-year-field";
    this.cc_form.card_exp_year_field.type               = "number";
    this.cc_form.card_exp_year_field.placeholder        = "YY";
    this.cc_form.card_exp_year_field.className          = "riversideio-exp-date-input";
    this.cc_form.card_exp_year_field.setAttribute("required", "");
    fieldset.appendChild(this.cc_form.card_exp_year_field);

    var label4                                  = document.createElement('label');
    label4.innerHTML                            = "CVC";
    fieldset.appendChild(label4);

    this.cc_form.card_cvc_field                         = document.createElement('input');
    this.cc_form.card_cvc_field.className               = "riversideio-card-cvc-field";
    this.cc_form.card_cvc_field.type                    = "number";
    this.cc_form.card_cvc_field.placeholder             = "CVC";
    this.cc_form.card_cvc_field.setAttribute("required", "");
    fieldset.appendChild(this.cc_form.card_cvc_field);

    this.cc_form.appendChild(fieldset);

    this.cc_form.cc_btn                                 = document.createElement('button');
    this.cc_form.cc_btn.className                       = "riversideio-cc-btn riversideio-btn pure-button";
    this.cc_form.cc_btn.setAttribute("type", "submit");
    this.cc_form.cc_btn.innerHTML                       = "Submit";
    this.cc_form.appendChild(this.cc_form.cc_btn);

    return this.wrapper.appendChild(this.cc_form);
  };

  RiversideioPlugin.prototype._drawInfoForm = function() {
    var form                                      = this.info_form = document.createElement('form');
    form.className                      = "riversideio-info-form riversideio-form pure-form pure-form-stacked riversideio-hidden";
    form.method                         = "POST";
    form.action                         = "#";

    var fieldset                                = document.createElement('fieldset');

    var label1                                  = document.createElement('label');
    label1.innerHTML                            = "Address";
    fieldset.appendChild(label1);

    form.address_1 = this.createInput({
        className : "riversideio-address-1",
        placeholder : "Street Address",
        required : true
    });

    fieldset.appendChild(form.address_1);

    form.address_2 = this.createInput({
        className : "riversideio-address-2",
        placeholder : "Street Address (optional)",
    });

    fieldset.appendChild(form.address_2);

    form.city = this.createInput({
        className : "riversideio-city",
        placeholder : "City",
        required : true
    });
        
    fieldset.appendChild(form.city);

    form.zip = this.createInput({
        className : "riversideio-zip",
        placeholder : "Zip",
        required : true
    });
        
    fieldset.appendChild(form.zip);

    var label2                                  = document.createElement('label');
    label2.innerHTML                            = "Phone";
    fieldset.appendChild(label2);

    form.phone = this.createInput({
        className : "riversideio-phone",
        placeholder : "Phone",
        type : "phone",
        required : true
    });

    fieldset.appendChild(form.phone);

    form.appendChild(fieldset);

    form.info_btn                                 = document.createElement('button');
    form.info_btn.className                       = "riversideio-cc-btn riversideio-btn pure-button";
    form.info_btn.setAttribute("type", "submit");
    form.info_btn.innerHTML                       = "Submit";
    form.appendChild(form.info_btn);

    return this.wrapper.appendChild(form);
  };

  RiversideioPlugin.prototype._drawCss = function() {
    this.css = ".pure-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.pure-button::-moz-focus-inner{padding:0;border:0}a:focus{outline:0}.pure-button{font-size:100%;*font-size:90%;*overflow:visible;padding:.5em 1.5em;color:#444;color:rgba(0,0,0,.8);*color:#444;border:1px solid #999;border:0 rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:.1s linear -webkit-box-shadow;-moz-transition:.1s linear -moz-box-shadow;-ms-transition:.1s linear box-shadow;-o-transition:.1s linear box-shadow;transition:.1s linear box-shadow}.pure-button-hover,.pure-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#00000000', GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,.05)),to(rgba(0,0,0,.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,.05) 0,rgba(0,0,0,.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.05));background-image:linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.05))}.pure-button-active,.pure-button:active{-webkit-box-shadow:0 0 0 1px rgba(0,0,0,.15) inset,0 0 6px rgba(0,0,0,.2) inset;-moz-box-shadow:0 0 0 1px rgba(0,0,0,.15) inset,0 0 6px rgba(0,0,0,.2) inset;box-shadow:0 0 0 1px rgba(0,0,0,.15) inset,0 0 6px rgba(0,0,0,.2) inset}.pure-button[disabled],.pure-button-disabled,.pure-button-disabled:hover,.pure-button-disabled:active{border:0;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);filter:alpha(opacity=40);-khtml-opacity:.4;-moz-opacity:.4;opacity:.4;cursor:not-allowed;box-shadow:none}.pure-button-hidden{display:none}.pure-button::-moz-focus-inner{padding:0;border:0}.pure-button-primary,.pure-button-selected,a.pure-button-primary,a.pure-button-selected{background-color:#0078e7;color:#fff}.pure-button:-moz-focusring{outline-color:rgba(0,0,0,.85)}" +
      ".pure-form{margin:0}.pure-form fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}.pure-form legend{border:0;padding:0;white-space:normal;*margin-left:-7px}.pure-form button,.pure-form input,.pure-form select,.pure-form textarea{font-size:100%;margin:0;vertical-align:baseline;*vertical-align:middle}.pure-form button,.pure-form input{line-height:normal}.pure-form button,.pure-form input[type=button],.pure-form input[type=reset],.pure-form input[type=submit]{-webkit-appearance:button;cursor:pointer;*overflow:visible}.pure-form button[disabled],.pure-form input[disabled]{cursor:default}.pure-form input[type=checkbox],.pure-form input[type=radio]{box-sizing:border-box;padding:0;*height:13px;*width:13px}.pure-form input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}.pure-form input[type=search]::-webkit-search-cancel-button,.pure-form input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.pure-form button::-moz-focus-inner,.pure-form input::-moz-focus-inner{border:0;padding:0}.pure-form textarea{overflow:auto;vertical-align:top}.pure-form input,.pure-form select{padding:.5em .6em;display:inline-block;border:1px solid #ccc;font-size:.8em;box-shadow:inset 0 1px 3px #ddd;border-radius:4px;-webkit-transition:.3s linear border;-moz-transition:.3s linear border;-ms-transition:.3s linear border;-o-transition:.3s linear border;transition:.3s linear border;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-font-smoothing:antialiased}.pure-form input:focus,.pure-form select:focus{outline:0;outline:thin dotted;border-color:#129FEA}.pure-form .pure-checkbox,.pure-form .pure-radio{margin:.5em 0;display:block}.pure-form input[disabled],.pure-form select[disabled],.pure-form textarea[disabled],.pure-form input[readonly],.pure-form select[readonly],.pure-form textarea[readonly]{cursor:not-allowed;background-color:#eaeded;color:#cad2d3;border-color:transparent}.pure-form input:focus:invalid,.pure-form textarea:focus:invalid,.pure-form select:focus:invalid{color:#b94a48;border:1px solid #ee5f5b}.pure-form input:focus:invalid:focus,.pure-form textarea:focus:invalid:focus,.pure-form select:focus:invalid:focus{border-color:#e9322d}.pure-form select{border:1px solid #ccc;background-color:#fff}.pure-form select[multiple]{height:auto}.pure-form label{margin:.5em 0 .2em;color:#999;font-size:90%}.pure-form fieldset{margin:0;padding:.35em 0 .75em;border:0}.pure-form legend{display:block;width:100%;padding:.3em 0;margin-bottom:.3em;font-size:125%;color:#333;border-bottom:1px solid #e5e5e5}.pure-form.pure-form-stacked input[type=text],.pure-form.pure-form-stacked select,.pure-form.pure-form-stacked label{display:block}.pure-form-aligned input,.pure-form-aligned textarea,.pure-form-aligned select,.pure-form-aligned .pure-help-inline{display:inline-block;*display:inline;*zoom:1;vertical-align:middle}.pure-form-aligned .pure-control-group{margin-bottom:.5em}.pure-form-aligned .pure-control-group label{text-align:right;display:inline-block;vertical-align:middle;width:10em;margin:0 1em 0 0}.pure-form-aligned .pure-controls{margin:1.5em 0 0 10em}.pure-form .pure-input-rounded{border-radius:20px;padding-left:1em}.pure-form .pure-group fieldset{margin-bottom:10px}.pure-form .pure-group input{display:block;padding:10px;margin:0;border-radius:0;position:relative;top:-1px}.pure-form .pure-group input:focus{z-index:2}.pure-form .pure-group input:first-child{top:1px;border-radius:4px 4px 0 0}.pure-form .pure-group input:last-child{top:-2px;border-radius:0 0 4px 4px}.pure-form .pure-group button{margin:.35em 0}.pure-form .pure-input-1{width:100%}.pure-form .pure-input-2-3{width:66%}.pure-form .pure-input-1-2{width:50%}.pure-form .pure-input-1-3{width:33%}.pure-form .pure-input-1-4{width:25%}.pure-form .pure-help-inline{display:inline-block;padding-left:.3em;color:#666;vertical-align:middle;font-size:90%}" +
      ".riversideio-btn { background-color: #61B842; color: white; }" +
      ".riversideio-hidden { display: none; } " +
      ".riversideio-exp-date-input { width: 50px; display: inline !important; }" +
      ".riversideio-wrapper { position: relative; }" +
      ".riversideio-overlay { z-index: 100; position: absolute; background: rgba(0,0,0,0.75); width: 100%; height: 100%; line-height: 100px; }" +
      ".riversideio-overlay-loading-text { color: #FFF; text-align: center; vertical-align: middle;}";

    var style   = document.createElement('style');
    style.type  = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = this.css;
    } else {
      style.appendChild(document.createTextNode(this.css));
    }
    return document.body.appendChild(style);
  };

}(RiversideioPlugin));


(function(RiversideioPlugin){
  "use strict";

  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  RiversideioPlugin.prototype.events = function() {
    self = this;

    self.signup_form.addEventListener("submit", self.submitSignupForm, false);
    self.login_form.addEventListener("submit", self.submitLoginForm, false);
    self.cc_form.addEventListener("submit", self.submitCCForm, false);
    self.signup_form.login_link.addEventListener(CLICK, self.showLoginForm, false);
    self.login_form.join_link.addEventListener(CLICK, self.showSignupForm, false);
  };

  RiversideioPlugin.prototype.submitSignupForm = function(e) {
    self.smartPreventDefault(e);

    self.showOverlay();

    var payload = {
      email: self.signup_form.email_field.value,
      password: self.signup_form.password_field.value
    };

    self.Post(self.endpoint+'/users.json', payload, function(resp){
      self.hideOverlay();

      if (!!resp.success) {
        self.user_id        = resp.user.id;
        self.session_token  = resp.user.session_token;
        self.showCCForm();
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.submitLoginForm = function(e) {
    self.smartPreventDefault(e);

    self.showOverlay();

    var payload = {
      email: self.login_form.email_field.value, 
      password: self.login_form.password_field.value
    };

    self.Post(self.endpoint+'/sessions.json', payload, function(resp){
      self.hideOverlay();

      if (!!resp.success) {
        self.user_id        = resp.user.id;
        self.session_token  = resp.user.session_token;
        self.showCCForm();
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.submitCCForm = function(e) {
    self.smartPreventDefault(e);

    self.showOverlay();

    var payload = {
      session_token:  self.session_token,
      card_number:    self.cc_form.card_number_field.value,
      card_cvc:       self.cc_form.card_cvc_field.value,
      card_exp_month: self.cc_form.card_exp_month_field.value,
      card_exp_year:  self.cc_form.card_exp_year_field.value
    };

    self.Post(self.endpoint+'/users/'+self.user_id+'/update_card.json', payload, function(resp){
      self.hideOverlay();

      if (!!resp.success) {
        alert("Successfully added your card. Thanks!");
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.showLoginForm = function(e) {
    self.smartPreventDefault(e);

    self.removeClass(self.login_form, "riversideio-hidden");

    self.addClass(self.signup_form, "riversideio-hidden");
    self.addClass(self.cc_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showSignupForm = function(e) {
    self.smartPreventDefault(e);

    self.removeClass(self.signup_form, "riversideio-hidden");

    self.addClass(self.login_form, "riversideio-hidden");
    self.addClass(self.cc_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showCCForm = function(e) {
    self.smartPreventDefault(e);

    self.removeClass(self.cc_form, "riversideio-hidden");

    self.addClass(self.signup_form, "riversideio-hidden");
    self.addClass(self.login_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showInfoForm = function(e) {
    self.smartPreventDefault(e);

    self.removeClass(self.info_form, "riversideio-hidden");

    self.addClass(self.signup_form, "riversideio-hidden");
    self.addClass(self.cc_form, "riversideio-hidden");
    self.addClass(self.login_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showOverlay = function(e) {
    self.smartPreventDefault(e);

    self.removeClass(self.overlay, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.hideOverlay = function(e) {
    self.smartPreventDefault(e);

    self.addClass(self.overlay, "riversideio-hidden");
  };
  
}(RiversideioPlugin));


(function(RiversideioPlugin){  
  "use strict";

  RiversideioPlugin.prototype.smartPreventDefault = function(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    } else {
      if (e) { e.returnValue = false; }
    }
  };

  RiversideioPlugin.prototype.isShittyIE = function() {
    return this.ie() < 10;
  };

  RiversideioPlugin.prototype.ie = function() {
    var undef;
    var v     = 3;
    var div   = document.createElement('div');
    var all   = div.getElementsByTagName('i');
   
    do {
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
    } while (all[0]);
 
    if (v > 4) {
      return v;
    } else {
      return undef;
    }
  };

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


var riversideio_plugin = RiversideioPlugin();
