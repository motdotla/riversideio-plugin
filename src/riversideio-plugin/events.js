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