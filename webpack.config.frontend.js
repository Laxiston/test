// Webpack configuration for the frontend Web application

var path = require('path');
var webpack = require('webpack');

var appConfig = require('./config');

// resolve path to minified angular dist
var pathToAngular = path.resolve(__dirname, 'node_modules/angular/angular.min.js');

// extract css in non watch mode (don't extract in watch mode as we want hot reloading of css)
if (!appConfig.development) {
    // the extract-text-webpack-plugin for extracting stylesheets in a separate css file
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
}

// require the html-webpack-plugin for automatic generation of the index.html file
// of the web application
var HtmlWebpackPlugin = require('html-webpack-plugin');

// require CSS autoprefixer for PostCSS
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');

let publicPath = 'public';

var webpackPlugins = [
    // Automatically loaded modules available in all source files of the application
    // (no need to explicitely import them)
    new webpack.ProvidePlugin({
        $: 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'window.jquery': 'jquery',

        moment: 'moment',
        'window.moment': 'moment',

        '_': 'lodash',
        'window._': 'lodash'
    })
];

if (!appConfig.test) {
    webpackPlugins = webpackPlugins.concat([
        // Explicitely generates the vendors bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            //async: true,
            //children: true,
            //minChunks: 2
            minChunks: Infinity
        }),
        // Automatically generate the index.html file including all webpack generated assets
        new HtmlWebpackPlugin({
            title: 'Webpack Angular Test',
            template: 'src/website/index.html'
        })
    ]);
}

if (appConfig.development) {
    webpackPlugins = webpackPlugins.concat([
        // Need to use that plugin in development mode to get hot reloading on source files changes
        new webpack.HotModuleReplacementPlugin({
            quiet: true
        })
    ]);
}

if (!appConfig.development && !appConfig.test) {
    webpackPlugins = webpackPlugins.concat([
        // Extract stylesheets to separate CSS file in production mode
        new ExtractTextPlugin({
            filename: appConfig.production ? `${publicPath}/styles/[name].[contenthash].css` : '[name].css',
            disable: false,
            allChunks: true
        })
    ]);
}

module.exports = {
    webpackConfig: {
        // Cache generated modules and chunks to improve performance for multiple incremental builds.
        //cache: true,
        resolve: {
            extensions: ['.js', '.es6', '.jsx', '.scss', '.css'],
            // Replace modules by other modules or paths.
            alias: {
                // set angular to the minified dist for faster build
                'angular': pathToAngular,
                _mixins: path.resolve(__dirname, 'node_modules/bootstrap/scss/_mixins.scss'),
                _variables: path.resolve(__dirname, 'node_modules/bootstrap/scss/_variables.scss'),
                _normalize: path.resolve(__dirname, 'node_modules/bootstrap/scss/_normalize.scss'),
                _reboot: path.resolve(__dirname, 'node_modules/bootstrap/scss/_reboot.scss'),
                _settings: path.resolve(__dirname, `src/website/${publicPath}/scss/settings.scss`),
                //_bourbon: path.resolve(__dirname, 'node_modules/bourbon/app/assets/stylesheets/_bourbon.scss'),
                _bem: path.resolve(__dirname, 'node_modules/sass-bem/_bem.scss'),
                _mq: path.resolve(__dirname, 'node_modules/sass-mediaqueries/_media-queries.scss'),
            },
            // The root directory (absolute path) that contains the application modules,
            // enables to import modules relatively to it
            modules: [path.resolve(__dirname, 'src/website'), path.resolve(__dirname, 'node_modules')]
        },
        // Application entry points
        entry: {
            // Generate a vendors bundle containing external modules used in every part of the application.
            // It is a good practice to do so as the code it contains is unlikely to change during the application lifetime.
            // This will allow you to do updates to your application, without requiring the users to download the vendors bundle again
            // See http://dmachat.github.io/angular-webpack-cookbook/Split-app-and-vendors.html for more details
            vendors: ['angular', 'angular-ui-router', 'jquery', 'lodash', 'oclazyload', 'ngstorage',
                      'angular-animate',
                      'angular-ui-bootstrap', 'angular-loading-bar'
            ],
            // The frontend application entry point (bootstrapApp.js)
            // In development mode, we also add webpack-dev-server specific entry points
            app: (!appConfig.development ? [] : ['webpack/hot/dev-server',
                                                 //'webpack-dev-server/client'
                                                 'webpack-dev-server/client?http://localhost:' + appConfig.ports.devServer
                ]).concat(['./src/website/app/app.bootstrap.js'])
        },
        // The output configuration of the build process
        output: {
            // Directory that will contain the frontend application assets
            // (except when using the webpack-dev-server in development as all generated files are stored in the dev-server memory)
            path: path.join(__dirname, 'build/website'),
            publicPath: '/',
            // Patterns of the names of the files to generate.
            // In production, we concatenate the content hash of each file for long term caching
            // See https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.rgsrbt29e
            filename: appConfig.production ? `${publicPath}/js/[name].[chunkhash].js` : '[name].js',
            chunkFilename: appConfig.production ? `${publicPath}/js/[id].[chunkhash].js` : '[id].js'
        },
        // Specific module loaders for the frontend
        module: {
            rules: [{
                // Load html files as raw strings
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            }, {
                // Load css files through the PostCSS preprocessor first, then through the classical css and style loader.
                // In production mode, extract all the stylesheets to a separate css file (improve loading performances of the application)
                test: /\.css$/,
                use: (!appConfig.development && !appConfig.test) ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader!postcss-loader'
                    }) :
                    [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }]
            }, {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/website'),
                use: (!appConfig.development && !appConfig.test) ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader?importLoaders=1!postcss-loader!sass-loader'
                    }) : [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
            }, { // Loaders for the font files (bootstrap, font-awesome, ...)
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: `${publicPath}/fonts/[hash].[ext]`,
                        limit: 65000,
                        mimetype: 'application/font-woff'
                    }
                }]
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: `${publicPath}/fonts/[hash].[ext]`,
                        limit: 65000,
                        mimetype: 'application/octet-stream'
                    }
                }]
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: `${publicPath}/fonts/[hash].[ext]`
                    }
                }]
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: path.resolve(__dirname, 'node_modules'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: `${publicPath}/fonts/[hash].[ext]`,
                        limit: 65000,
                        mimetype: 'image/svg+xml'
                    }
                }]
            }, {
                test: /\.(png|gif|jpe?g|svg)$/i,
                //test: /\.(png|jpg|jpeg|gif|svg)([\?]?.*)$/,
                include: path.resolve(__dirname, `src/website/${publicPath}/images`),
                use: (!appConfig.production) ? [{
                        loader: 'file-loader',
                        options: {
                            name: `${publicPath}/images/[hash].[ext]`
                        }
                    }] : [{
                        loader: 'file-loader',
                        options: {
                            name: `${publicPath}/images/[hash].[ext]`
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            svgo: {
                                plugins: [{
                                    removeViewBox: false
                                }, {
                                    removeEmptyAttrs: false
                                }]
                            }

                        }
                    }]
            }],
            // Disable parsing of the minified angular dist as it is not needed and it speeds up the webpack build
            noParse: [new RegExp(pathToAngular)]
        },
        // to avoid errors when bundling unit tests
        node: {
            fs: 'empty'
        },
        // Webpack plugins used for the frontend
        plugins: webpackPlugins
    },
    loadersOptions: {
        options: {
            // Options for jshint
            jshint: {
                // don't warn about undefined variables as they are provided
                // to the global scope by webpack ProvidePlugin
                globals: {
                    '_': false,
                    '$': false,
                    'jQuery': false,
                    'angular': false,
                }
            },
            // CSS preprocessor configuration (PostCSS)
            postcss: [
                postcssImport(),
                autoprefixer({ browsers: ['> 5%', 'last 2 versions', 'Firefox ESR', 'android 4'] }),
                // use autoprefixer feature (enable to write your CSS rules without vendor prefixes)
                // see https://github.com/postcss/autoprefixer
                cssnano({
                    discardComments: {
                        removeAll: true
                    }
                }),
            ],
            sassLoader: {
                outputStyle: 'compressed',
                precision: 10,
                sourceComments: false
            },
            htmlLoader: {
                ignoreCustomFragments: [/\{\{.*?}}/],
                root: path.resolve(__dirname, 'src', 'website'),
                attrs: ['img:src', 'link:href']
            }
        }
    }
};
