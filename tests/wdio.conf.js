require('dotenv').config();

const browserstack = require('browserstack-local');

exports.config = {
    'user': process.env.BROWSERSTACK_USERNAME,
    'key': process.env.BROWSERSTACK_ACCESS_KEY,
    'specs': [`${process.env.PWD}/tests/specs/desktop/**`],
    'capabilities': [
        {
            'browserName': 'IE',
            'browserVersion': '11.0',
            'bstack:options': {
                'sessionName': 'IE-ui-test',
                'projectName': 'clean-jsdoc',
                'buildName': 'clean-jsdoc-ui-testing',
                'os': 'Windows',
                'osVersion': '7',
                'ie': {
                    'noFlash': true,
                    "compatibility" : "11001",
                    'enablePopups': false,
                },
                'local': true,
                'appiumLogs': false,
                'seleniumLogs': false,
                'seleniumVersion': '3.5.2',
                'localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
            }
        },
        {
            'browserName': 'Chrome',
            'browserVersion': 'latest',
            'bstack:options': {
                'sessionName': 'Chrome-ui-test',
                'projectName': 'clean-jsdoc',
                'buildName': 'clean-jsdoc-ui-testing',
                'os': 'OS X',
                'osVersion': 'Catalina',
                'local': true,
                'appiumLogs': false,
                'seleniumLogs': false,
                'localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
            }
        },
        {
            'browserName': 'Firefox',
            'browserVersion': 'latest',
            'bstack:options': {
                'sessionName': 'Firefox-ui-test',
                'projectName': 'clean-jsdoc',
                'buildName': 'clean-jsdoc-ui-testing',
                'os': 'Windows',
                'osVersion': '10',
                'local': true,
                'appiumLogs': false,
                'seleniumLogs': false,
                'localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
            }
        }
    ],
    'logLevel': 'error',
    'coloredLogs': false,
    'baseUrl': `http://localhost:${process.env.PORT || 3000}`,
    'waitforTimeout': 100000,
    'connectionRetryTimeout': 90000,
    'connectionRetryCount': 3,
    'framework': 'jasmine',
    'jasmineNodeOpts': {
        'defaultTimeoutInterval': 90000,
        'failFast': true
    },
    'onPrepare': (config, capabilities) => {
        console.log('Connecting to local server');

        return new Promise((resolve, reject) => {
            exports.bsLocal = new browserstack.Local();
            exports.bsLocal.start({
                'key': exports.config.key,
                'force': 'true',
                'onlyAutomate': 'true'
            }, error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    },
    'onComplete'(capabilties, specs) {
        exports.bsLocal.stop(() => {
            console.log('Shutting down local server');
        });
    }
};
