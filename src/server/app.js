/**
 * Main application file
 */

'use strict';

import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import http from 'http';
import config from 'config';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
});

const app = express();

app.use(compression());

// In development mode, we create a proxy server to forward all
// http request to the webpack-dev-server
if (config.development) {
    let httpProxy = require('http-proxy');
    let proxy = httpProxy.createProxyServer({ ws: true });

    app.all('*', (req, res) => {
        proxy.web(req, res, {
            target: 'http://localhost:' + config.ports.devServer
        });
    });

    // proxy HTTP GET / POST
    app.get('/socket.io/!*', (req, res) => {
        console.log('proxying GET request', req.url);
        proxy.web(req, res, { target: 'http://localhost:' + config.ports.devServer });
    });

    app.post('/socket.io/!*', (req, res) => {
        console.log('proxying POST request', req.url);
        proxy.web(req, res, { target: 'http://localhost:' + config.ports.devServer });
    });

    // Proxy websockets
    app.on('upgrade', (req, socket, head) => {
        console.log('proxying upgrade request', req.url);
        proxy.ws(req, socket, head);
    });

    proxy.on('error', err => {
        console.error(err.stack);
        console.log('Could not connect to proxy, please try again...');
    });
} else if (!config.test) {
    app.use(express.static(path.join(__dirname, '../../build/website')));
}

let server = http.createServer(app);
let socketio = require('socket.io')(server, {
    serveClient: !config.production,
    path: '/socket.io-client'
});

require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

export default app;
