const fs = require('fs-extra');

fs.removeSync('server/src/public');  // Remove the existing public directory
fs.moveSync('client/build', 'server/src/public');  // Move the build folder