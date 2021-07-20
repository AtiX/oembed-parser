const path = require('path');

module.exports = {
    entry: './index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: {
            name: 'oembed-parser',
            type: 'umd'
        },
    }
}
