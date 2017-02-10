/**
 * Created by Labtec on 26.01.2017.
 */
'use strict';

export function config($logProvider, cfpLoadingBarProvider) {
    'ngInject';

    // Enable log
    $logProvider.debugEnabled(true);

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
}

export default { config };
