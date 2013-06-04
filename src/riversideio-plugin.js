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