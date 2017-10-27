var path = require('path');

module.exports = {
    entry: "./app/entry.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.css$/, use: [{loader: 'style-loader'},
                                    {loader: 'css-loader?modules'}]
            },
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: [/node_modules/, /styles/] }
        ]
   }
};

