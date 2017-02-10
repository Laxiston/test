/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import shrinkRay from 'shrink-ray';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import config from 'config';
import lusca from 'lusca';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
const MongoStore = connectMongo(session);

export default function (app) {
    let env = app.get('env');

    /*if (env === 'production') {
     app.use(favicon(path.join(config.root, 'client/static/misc/favicons', 'favicon.ico')));
     } else {
     app.use(express.static(path.join(config.root, '.tmp')));
     }*/

    app.locals.env = env;
    app.set('appPath', path.join(__dirname, '../website'));
    app.use(express.static(app.get('appPath')));
    app.use('/public', express.static(app.get('appPath') + '/public'));
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(shrinkRay());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    // Persist sessions with MongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            db: 'crm'
        })
    }));

    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    if (env !== 'test' && !process.env.SAUCE_USERNAME) {
        app.use(lusca({
            csrf: {
                angular: true
            },
            xframe: 'SAMEORIGIN',
            hsts: {
                maxAge: 31536000, //1 year, in seconds
                includeSubDomains: true,
                preload: true
            },
            xssProtection: true
        }));
    }

    if (env === 'development' || env === 'test') {
        app.use(errorHandler()); // Error handler - has to be last
    }
}
