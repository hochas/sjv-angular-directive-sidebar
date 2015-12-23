module.exports = function(grunt) {
  var config = {
    banner:
      '/*!\n' +
      ' * <%= pkg.author %>\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' */\n\n\n'
  };

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: config.banner
      },
      dist: {
        files: {
          'dist/sidebar.min.js': ['src/sidebar.js']
        }
      }
    },

    less: {
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/sidebar.min.css': 'src/assets/less/sidebar.less'
        }
      },
      nocompress: {
        files: {
          'dist/sidebar.css': 'src/assets/less/sidebar.less'
        }
      }
    },

    copy: {
      src: {
        files: [
          {
            expand: true, 
            flatten: false,
            cwd: 'src',
            src: ['**/*', '!**/*.less'], 
            dest: 'dist/', 
            filter: 'isFile'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/*.html'],
            dest: 'demo/',
            filter: 'isFile'
          }
        ]
      },
      sjvstyle: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: 'bower_components',
            src: ['sjv-style/**/*', '!**/*.md'],
            dest: 'src/',
            filter: 'isFile'
          }
        ]
      }
    },

    express: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          bases: '.'
        }
      }
    },

    watch: {
      dev: {
        files: ['src/**'],
        tasks: ['build']
      }
    },

    clean: {
      dist: {
        src: ['dist/']
      }
    },

    jshint: {
      src: {
        src: ['src/**/*.js'],
        options: {
          reporter: require('jshint-stylish'),
          jshintrc: '.jshintrc',
          globals: {
            angular: true
          }
        }
      }
    },

    karma: {
      dist: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express');


  // Self sustained utility tasks
  // Self sustained utility tasks
  grunt.registerTask('minify', ['uglify:dist', 'less:dist']);
  grunt.registerTask('test', ['jshint:src', 'karma:dist']);
  grunt.registerTask('install', ['copy:sjvstyle', 'copy:src'])

  grunt.registerTask('dist', ['clean:dist', 'minify', 'less:nocompress', 'copy:src', 'test']);
  grunt.registerTask('build', ['clean:dist', 'minify', 'less:nocompress', 'copy:src']);
  grunt.registerTask('serve', ['build', 'copy:html', 'express', 'watch:dev']);


};