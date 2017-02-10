/**
 * Main application routes
 */

'use strict';

import path from 'path';
import errors from './components/errors';

export default function (app) {

    //app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
    app.route(':url(api|components|app|client|website|server|bower_components|public)/*').get(errors.pageNotFound);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });

    /*app.get('/', (req, res, next) => {
     res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
     });*/

    app.get('/dashboard', (req, res, next) => {
        res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
