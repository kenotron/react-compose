const { spawnSync } = require('child_process');
const path = require('path');
const findGitRoot = require('./findGitRoot');

module.exports = function getAllPackageInfo() {
  const gitRoot = findGitRoot();
  const results = spawnSync('git', ['ls-tree', '-r', '--name-only', '--full-tree', 'HEAD']);
  const packageInfo = {};

  results.stdout
    .toString()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.endsWith('package.json'))
    .forEach(packageJsonFile => {
      const packageJson = require(path.join(gitRoot, packageJsonFile));

      if (packageJson) {
        packageInfo[packageJson.name] = {
          packagePath: path.dirname(packageJsonFile),
          packageJson
        };
      }
    });

  return packageInfo;
};
