const sonarqubeScanner = require('sonarqube-scanner');
require('dotenv').config();

sonarqubeScanner({
  serverUrl: 'https://sonarcloud.io',
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.projectKey': 'samirelhassann-personal_snack-bar-ap',
    'sonar.organization': 'samirelhassann-personal',
    'sonar.sources': 'src',
    'sonar.tests': 'test',
    'sonar.test.inclusions': '**/*.spec.ts,**/*.test.ts',
    'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
  }
}, () => { });