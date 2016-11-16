'use strict';

var isProduction = process.env.NODE_ENV === 'production';
var PORT = 3001

console.log('..running ' + process.env.NODE_ENV + ' build');

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

var config = {
    entry: {
        index: (isProduction ? [] : ['webpack-hot-middleware/client?http://localhost:' + PORT])
            .concat([path.resolve(__dirname, './src/components/index.ts')]),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-addons-transition-group': 'var React.addons.TransitionGroup',
        'react-addons-pure-render-mixin': 'var React.addons.PureRenderMixin',
        'react-addons-create-fragment': 'var React.addons.createFragment',
        'react-addons-update': 'var React.addons.update'
    },
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint',
            include: [
                path.join(__dirname, './src'),
            ],
        }],
        loaders: [{
                test: /\.tsx?$/,
                loaders: [
                    'babel?' +
                    'presets[]=react,' +
                    'presets[]=es2015,' +
                    'presets[]=stage-0,' +
                    'plugins[]=transform-runtime',
                    'ts'
                ],
                include: [
                    path.join(__dirname, './src'),
                ]
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: [
                    path.join(__dirname, './src'),
                ]
            }, {
                test: /\.svg$/,
                loaders: [
                    'babel?' +
                    'presets[]=react,' +
                    'presets[]=es2015,' +
                    'presets[]=stage-0,' +
                    'plugins[]=transform-runtime',
                    require.resolve('./tools/webpack/SVGReactLoader')
                ],
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file?name=fonts/[name].[ext]',
                include: path.join(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')
            }
        ].concat(isProduction ? [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss', 'resolve-url', 'sass?sourceMap']),
            include: [
                path.join(__dirname, './src'),
            ]
        }] : [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap'],
            include: [
                path.join(__dirname, './src'),
            ]
        }])
    },
    ts: {
        compiler: 'typescript',
        // do not emit declarations since we are bundling
        // compilerOptions: { declaration: false },
    },

    resolve: {
        root: [
            path.resolve(__dirname, './src'),
        ],
        extensions: ['', '.js', '.ts', '.tsx']
    },

    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './src')
        ]
    },

    sassResources: ['./src/styles/scss/common.scss'],

    postcss: function() {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //https://github.com/moment/moment/issues/1435#issuecomment-232687733
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].concat(isProduction ? [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new ExtractTextPlugin('./styles/css/uikit.css', { allChunks: true, publicPath: '/styles/css' })
    ] : [])
};

if (!isProduction) {
    config.devtool = '#source-map';
    config.bail = false;
    config.cache = true;
    config.debug = true;
}

module.exports = config;