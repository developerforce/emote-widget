'use strict';
exports.__esModule = true;
exports.lwcConfig = exports.defaultLwcConfig = void 0;
var merge = require('deepmerge');
var path = require('path');
exports.defaultLwcConfig = {
    // Default directory for the build output
    buildDir: './dist',
    // Default bundler
    bundler: 'webpack',
    // Default mode for build command
    mode: 'development',
    // Clears the build directory on every build
    noclear: false,
    // Default directory for source files
    sourceDir: './src',
    // List of resources for copying to the build folder
    resources: [],
    // Default server options for watch command
    devServer: {
        port: 3001,
        host: 'localhost',
        open: false,
        stats: 'errors-only',
        noInfo: true,
        contentBase: './src'
    },
    // LWC Compiler options for production mode.
    // Find the detailed description here: https://www.npmjs.com/package/@lwc/compiler
    lwcCompilerOutput: {
        development: {
            compat: false,
            minify: true,
            env: {
                NODE_ENV: 'production'
            },
            format: 'amd'
        },
        production: {
            compat: false,
            minify: true,
            env: {
                NODE_ENV: 'production'
            },
            format: 'amd'
        }
    },
    lwcCompilerStylesheetConfig: {},
    lwcExperimentalDynamicComponent: {}
};
function buildConfig() {
    var combinedConfig = exports.defaultLwcConfig;
    try {
        var fileName = path.resolve(process.cwd(), 'lwc-services.config.js');
        var config = require(fileName);
        combinedConfig = merge(exports.defaultLwcConfig, config);
        return combinedConfig;
    } catch (error) {
        console.error(
            'Using default configuration! Error loading custom config'
        );
        console.error(error);
    }
    return combinedConfig;
}
exports.lwcConfig = buildConfig();
