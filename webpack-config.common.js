const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SocialTags = require('social-tags-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const paths = [
    '/index.html',
];

module.exports = {
    entry: {
        static: './src/index.ts'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                title: "Homefront Supporter Series | December 22, 2019",
                template: "./src/index.ejs",
                "meta": {
                    "charset": "UTF-8",
                    "viewport": "width=device-width, initial-scale=1, maximum-scale=1",
                    "description": "The Homefront Supporter Series rallies OWL supporters crews to support city-based charities and help at-need neighbors."
                },
            }
        ),
        new SocialTags(
            {
                appUrl: "https://homefront.5dv.nyc",
                facebook: {
                    "og:url": "https://homefront.5dv.nyc/index.html",
                    "og:type": "website",
                    "og:title": "Homefront Supporter Series | December 22, 2019",
                    "og:image": "./src/images/Homefront_OG_preview.jpg",
                    "og:description": "The Homefront Supporter Series rallies OWL supporters crews to support city-based charities and help at-need neighbors.",
                    "og:locale": "en_US",
                },
                twitter: {
                    "twitter:card": "summary",
                    "twitter:site": "@nyxl_venoms",
                },
            }
        ),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[name].css' : '[name].[hash].css',
        }),
        new SitemapPlugin('https://homefront.5dv.nyc', paths, {
            fileName: 'sitemap.xml',
            lastMod: true,
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: [
                    'file-loader?name=[name].[ext]',
                    'extract-loader',
                    'html-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};