/*jslint node: true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig(
        {
            uglify: {
                combine: {
                    files: {
                        'dist/main.js': ['js/*.js', '!js/setup.js']
                    },
                    options: {
                        sourceMap: true
                    }
                },
                setup: {
                    files: {
                        'dist/setup.js': ['js/setup.js']
                    }
                }
            },
            sass: {
                dev: {
                    options: {
                        style: 'expanded',
                        compass: false,
                        sourcemap: true
                    },
                    files: {
                        'dist/main.css': ['scss/main.scss']
                    }
                },
                dist: {
                    options: {
                        style: 'compressed',
                        compass: false,
                        sourcemap: true
                    },
                    files: {
                        'dist/main.css': ['scss/main.scss']
                    }
                }
            },
            watch: {
                scripts: {
                    files: ['js/*.js'],
                    tasks: ['uglify']
                },
                sass: {
                    files: 'scss/*.scss',
                    tasks: ['sass:dev']
                }
            },
            jslint: {
                js: {
                    src: ['js/*.js']
                },
                Gruntfile: {
                    src: ['Gruntfile.js']
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', ['uglify', 'sass']);
    grunt.registerTask('lint', ['jslint']);
};
