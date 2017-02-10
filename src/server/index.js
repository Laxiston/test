'use strict';

import server from './app';
import colors from 'colors';
import config from 'config';

server.listen(config.port, config.ip, () => {
    console.info(colors.green('======================================================================='));
    console.info(colors.cyan(`Express server listening on port ${config.port}, in ${config.env} mode.`));
    console.info(colors.cyan(`Open up `) + colors.white(`http://localhost:${config.port}/`) + colors.cyan(' in your browser.'));
    console.info(colors.green('======================================================================='));
});
