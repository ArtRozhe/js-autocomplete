const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractPlugin = new ExtractTextPlugin('./assets/css/auto-complete.css');

const config = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        AutoComplete: './components/AutoComplete/index.js',
        LocalDataProvider: './data-providers/local/index.js',
        ApiDataProvider: './data-providers/api/index.js',
        app: './app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].bundle.js',
        library: '[name]',
        libraryTarget: 'var',
        libraryExport: 'default'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: [/node_modules/, /docker/],
                use: {
                    loader: 'eslint-loader'
                }
            },
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {test: /\.html$/, use: ['html-loader']},
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/media/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: false
        }),
        extractPlugin
    ]
};

module.exports = (env) => {
    if (!env.production) {
        config.devtool = 'inline-source-map';
        config.devServer = {
            contentBase: path.resolve(__dirname, './dist/assets/media'),
            compress: true,
            port: 2000,
            stats: 'errors-only',
            open: true
        };
    }

    return config;
};
