const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: '84be615b797bd93af2ba7f8ef7936a44bc5ae7c0',
        options: {
            'sonar.projectName': 'Multi Player Snake Game',
            'sonar.projectDescription': 'Node Js Multi Player Snake Game',
            'sonar.sources': '../',
        },
    },
  () => process.exit()
);
