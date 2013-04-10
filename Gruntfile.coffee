lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

config:
  locales: ["ru", "en", "ua", "pl"]

module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    meta: grunt.file.readJSON('package.json')
    pkg: grunt.file.readJSON('package.json')
    distdir: 'dist'
    tempdir: 'temp'

    # Paths
    src:
      js: ['src/i18n/**/*.js', 'src/common/**/*.js', 'src/app/**/*.js', 'dist/tmp/**/*.js']
      html: ['src/index.html']
      tpl: ['src/app/**/*.tpl.html']
      #css: ['src/css']
      #less: ['src/less/*.less']  # recess:build doesn't accept ** in its file patterns
      less: ['src/less/main.less']  # recess:build doesn't accept ** in its file patterns

    # CoffeeScript
    coffee:
      dist:
        files:
          "<%= distdir %>/js/*.js": ["src/coffee/**/*.coffee"]
      test:
        files:
          "test/spec/*.js": ["test/spec/coffee/**/*.coffee"]

    less:
      dist:
        files:
          "<%= distdir %>/css/<%= pkg.name %>.css": ["<%= src.less %>"]

    copy:
      assets:
        files: [
          dest: '<%= distdir %>/'
          src: ['**']
          cwd: 'src/assets/'
          expand: true
        ,
          dest: '<%= distdir %>/templates'
          src: ['**/*.tpl.html']
          cwd: 'src/app'
          expand: true
        ]

    jade:
      ru:
        files:
          '<%= tempdir %>/templates/ru': ['src/app/templates/*.jade']
        options:
          client: false
          pretty: false
          extension: '.tpl.html'
          locals:
            _: grunt.file.readJSON('src/i18n/ru.json')
      en:
        files:
          '<%= tempdir %>/templates/en': ['src/app/templates/*.jade']
        options:
          client: false
          pretty: false
          extension: '.tpl.html'
          locals:
            _: grunt.file.readJSON('src/i18n/en.json')
      ua:
        files:
          '<%= tempdir %>/templates/ua': ['src/app/templates/*.jade']
        options:
          client: false
          pretty: false
          extension: '.tpl.html'
          locals:
            _: grunt.file.readJSON('src/i18n/ua.json')
      pl:
        files:
          '<%= tempdir %>/templates/pl': ['src/app/templates/*.jade']
        options:
          client: false
          pretty: false
          extension: '.tpl.html'
          locals:
            _: grunt.file.readJSON('src/i18n/pl.json')

    html2js:
      #templates:
      #  options:
      #    base: '<%= distdir %>/'
      #  src: ['<%= distdir %>/templates/**/*.tpl.html']
      #  dest: '<%= distdir %>/js/templates.js'
      #  module: 'templates'

      templates_en:
        options:
          base: '<%= tempdir %>/templates/en'
          module: 'templates'
        src: ['<%= tempdir %>/templates/en/*.tpl.html']
        dest: '<%= distdir %>/js/templates-en.js'

      templates_ru:
        options:
          base: '<%= tempdir %>/templates/ru'
          module: 'templates'
        src: ['<%= tempdir %>/templates/ru/*.tpl.html']
        dest: '<%= distdir %>/js/templates-ru.js'

      templates_ua:
        options:
          base: '<%= tempdir %>/templates/ua'
          module: 'templates'
        src: ['<%= tempdir %>/templates/ua/*.tpl.html']
        dest: '<%= distdir %>/js/templates-ua.js'

      templates_pl:
        options:
          base: '<%= tempdir %>/templates/pl'
          module: 'templates'
        src: ['<%= tempdir %>/templates/pl/*.tpl.html']
        dest: '<%= distdir %>/js/templates-pl.js'

    concat:
      dist:
        src:['<banner:meta.banner>', '<%= src.js %>'],
        dest:'<%= distdir %>/js/<%= pkg.name %>.js'
      #  src:['src/i18n/ru.jade', 'src/*.jade']
      #  dest:'<%= distdir %>/tmp/jade/*.jade'

    clean:
      dist: ['<%= distdir %>/*']

    connect:
      livereload:
        options:
          port: 9001
          hostname: 'localhost'
          middleware: (connect) ->
            [
              lrSnippet,
              mountFolder(connect, 'dist')
              #mountFolder(connect, yeomanConfig.app)
            ]

    regarde:
      html:
        files: '<%= src.html %>'
        tasks: ['index']
      js:
        files: ['src/i18n/**/*.js', 'src/common/**/*.js', 'src/app/**/*.js']
        tasks: ['concat']
      template:
        files: ['<%= distdir %>/templates/**/*.tpl.html']
        tasks: ['html2js', 'concat']
      livereload:
        files: ['<%= distdir %>/**']
        tasks: ['livereload']
      jade:
        files: ['src/app/templates/*.jade']
        tasks: ['jade', 'html2js', 'concat']
      jade_i18n:
        files: ['src/i18n/*.json']
        tasks: ['jade', 'html2js', 'concat']
        spawn: true
      less:
        files: ['src/less/*.less']
        tasks: ['less']


  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-clean"
  #grunt.loadNpmTasks "grunt-contrib-jade"
  grunt.loadNpmTasks "grunt-jade"
  grunt.loadNpmTasks "grunt-html2js"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-livereload"
  grunt.loadNpmTasks "grunt-regarde"

  # grunt-contrib-watch now not work with livereload :(
  #grunt.loadNpmTasks "grunt-contrib-watch"

  # HTML stuff
  grunt.registerTask 'index', 'Process index.html', ->
    grunt.file.copy 'src/index.html', 'dist/index.html',
      process: grunt.template.process

  # Build
  grunt.registerTask "build", [
    "clean", "jade", "less", "copy", "html2js", "index", "concat"
  ]

  # Development server
  grunt.registerTask 'server', [
    'build',
    'livereload-start',
    'connect:livereload',
    #'connect',
    'regarde'
    #'open',
    #'watch'
  ]


  grunt.registerTask "default", ["build"]
