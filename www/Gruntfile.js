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
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};
