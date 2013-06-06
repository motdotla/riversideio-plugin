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
    this.signup_form.login_link.addEventListener(CLICK, this.showLoginForm, false);
    this.login_form.join_link.addEventListener(CLICK, this.showSignupForm, false);
  };

  RiversideioPlugin.prototype.submitSignupForm = function(e) {
    if (e) { e.preventDefault(); }

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
    if (e) { e.preventDefault(); }

    self.showOverlay();

    var payload = {
      email: self.login_form.email_field.value, 
      password: self.login_form.password_field.value
    };

    self.Post(self.endpoint+'/sessions.json', payload, function(resp){
      self.hideOverlay();

      if (!!resp.success) {
        self.user_id        = resp.id;
        self.session_token  = resp.session_token;
        self.showCCForm();
      } else {
        alert(resp.error.message);
      }
    });
  };

  RiversideioPlugin.prototype.submitCCForm = function(e) {
    if (e) { e.preventDefault(); }

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
    if (e) { e.preventDefault(); }

    self.removeClass(self.login_form, "riversideio-hidden");

    self.addClass(self.signup_form, "riversideio-hidden");
    self.addClass(self.cc_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showSignupForm = function(e) {
    if (e) { e.preventDefault(); }

    self.removeClass(self.signup_form, "riversideio-hidden");

    self.addClass(self.login_form, "riversideio-hidden");
    self.addClass(self.cc_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showCCForm = function(e) {
    if (e) { e.preventDefault(); }

    self.removeClass(self.cc_form, "riversideio-hidden");

    self.addClass(self.signup_form, "riversideio-hidden");
    self.addClass(self.login_form, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.showOverlay = function(e) {
    if (e) { e.preventDefault(); }

    self.removeClass(self.overlay, "riversideio-hidden");
  };

  RiversideioPlugin.prototype.hideOverlay = function(e) {
    if (e) { e.preventDefault(); }

    self.addClass(self.overlay, "riversideio-hidden");
  };
  
}(RiversideioPlugin));