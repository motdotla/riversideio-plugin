# DEPRECATED: Kept for posterity reasons. See <http://github.com/riversideio> for up to date technology.

# riversideio-plugin

This plugin lets you add a membership join/login form. It also comes with the ability to create and update your credit card. You can embed it on any webpage anywhere.

## Example Usage

Save the build/riversideio-plugin.min.js to your website. And then add the following script tag where you want it displayed.

```html
<script src='/path/to/riversideio-plugin.js'></script>
```

## Browser Support

* Firefox
* Chrome
* Safari
* IE 10 and greater

Note: I spent an afternoon getting the JavaScript to work with IE8 and IE9. There are so many conditionals that will clutter up the code - different AJAX approach, different event handler bindings (attachEvent), and other small quirks. For the sake of keeping this a workable repo we are dropping support for IE9 and below.

## Contributing to this repository

Install node (comes with npm) at [nodejs.org](http://nodejs.org/). 

Then install grunt globally.

```bash
npm install grunt grunt-cli -g
```

Then run grunt.

```bash
grunt
```

Visit [localhost:3000](http://localhost:3000)

Make changes to the code and repeat.

Edit the files living under /src. The other files are built automatically.
