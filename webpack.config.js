const path = require("path");

module.exports = {
    entry: {
        index_renderer: path.join(__dirname, "src", "modules", "Index", "main.js"),
        about_renderer: path.join(__dirname, "src", "modules", "About", "main.js")
    },
    output: {
        path: path.join(__dirname, "ProjectTpl")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
};