/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @version $Id: Gruntfile.js 3107 2015-05-26 18:22:54Z tgaskins $
 */
module.exports = function (grunt) {
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: ['src'],
                options: {
                    destination: 'api-doc',
                    configure: 'config.json',
                    readme: 'README.md',
                    recurse: true
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    name: '../tools/almond',
                    include: ['WorldWind'],
                    out: 'worldwind.min.js',
                    wrap: {
                        startFile: 'tools/wrap.start',
                        endFile: 'tools/wrap.end'
                    }
                }
            },
            compileDebug: {
                options: {
                    baseUrl: 'src',
                    name: '../tools/almond',
                    include: ['WorldWind'],
                    optimize: 'none',
                    out: 'worldwind.js',
                    wrap: {
                        startFile: 'tools/wrap.start',
                        endFile: 'tools/wrap.end'
                    }
                }
            },
        },

        copy: {
            main: {
                src: 'tools/npmEntryPoint.js',
                dest: 'index.js'
            },
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                reporters: ['dots', 'junit', 'html'],
                junitReporter: {
                    outputFile: 'test-results.xml',
                    outputDir: 'test-results'
                },
                htmlReporter: {
                    outputFile: 'test-results/report.html',
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma', 'jsdoc', 'requirejs', 'copy']);
};