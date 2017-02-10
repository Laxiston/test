/**
 * Error responses
 */

'use strict';

import path from 'path';
import _ from 'lodash';
import config from 'config';

export function pageNotFound(req, res) {
    let viewFilePath = path.join(config.root, 'server/views', '404.html');
    let statusCode = 404;
    let result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, {
        lodash: _,
        status: result.status
    }, (err, html) => {
        if (err) {
            return res.status(result.status).json(result);
        }

        res.send(html);
    });
}


/*module.exports[404] = function pageNotFound(req, res) {
    let viewFilePath = path.join(config.root, 'server/views', '404.jade');
    let statusCode = 404;
    let result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, {

    }, (err, html) => {
        if (err) {
            return res.status(result.status).json(result);
        }

        res.send(html);
    });
};*/

export default {
    pageNotFound
};
