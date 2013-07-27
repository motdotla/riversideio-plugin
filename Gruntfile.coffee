module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.name %>.js - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> - <%= pkg.author %> */\n"
    files: [
      "src/riversideio-plugin.js",
      "src/riversideio-plugin/*.js"
    ]
    uglify:
      options:
        banner: "<%= banner %>"
      build:
        src: "<%= files %>"
        dest: "build/riversideio-plugin.min.js"
    concat:
      options:
        banner: "<%= banner %>"
        separator: '\n\n'
        stripBanners : true
      dist:
        src: "<%= files %>"
        dest: "build/riversideio-plugin.js"
    jshint:
      all: ['src/riversideio-plugin.js', 'src/riversideio-plugin/*.js']
    simplemocha:
      all: 
        src: 'test/*.js'

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-simple-mocha"
  grunt.loadNpmTasks "grunt-contrib-jshint"

  grunt.registerTask "test", ["simplemocha", "jshint"]
  grunt.registerTask "default", ["jshint", "uglify", "concat"]

  # Some available commands
  # grunt
  # grunt test
  # grunt connect
