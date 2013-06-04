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