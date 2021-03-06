module.exports = [
    // Add support for native node modules
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: {amd: false},
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        test: /\.ts(x?)$/,
        exclude: /(node_modules|.webpack)/,
        loader: "ts-loader",
        options: {
            // appendTsSuffixTo: [/\.vue$/],
            /**
             * If you want to speed up compilation significantly. However,
             * many of the benefits you get from static type checking
             * between different dependencies in your application wll be lost
             */
            transpileOnly: true
        }
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            hotReload: true
        }
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]'
                        }
                    }
                }
            }
        ]
    },
    {
        test: /\.(sass|less|css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
    },

];
