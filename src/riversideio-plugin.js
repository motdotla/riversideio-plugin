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
