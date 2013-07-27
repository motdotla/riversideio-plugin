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
