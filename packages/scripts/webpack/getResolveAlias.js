const path = require('path');

const findRepoDeps = require('../monorepo/findRepoDeps');
const findGitRoot = require('../monorepo/findGitRoot');

function getResolveAlias() {
  const gitRoot = findGitRoot();
  const deps = findRepoDeps();
  const alias = {};
  const excludedPackages = [];

  const packageJson = require(path.join(process.cwd(), 'package.json'));
  deps.forEach(depInfo => {
    if (!excludedPackages.includes(depInfo.packageJson.name)) {
      alias[`${depInfo.packageJson.name}$`] = path.join(gitRoot, depInfo.packagePath, 'src');
      alias[`${depInfo.packageJson.name}/src`] = path.join(gitRoot, depInfo.packagePath, 'src');
      alias[`${depInfo.packageJson.name}/lib`] = path.join(gitRoot, depInfo.packagePath, 'src');
    }
  });

  alias[`${packageJson.name}$`] = path.join(process.cwd(), 'src');
  alias[`${packageJson.name}/src`] = path.join(process.cwd(), 'src');
  alias[`${packageJson.name}/lib`] = path.join(process.cwd(), 'src');

  return alias;
}

module.exports = getResolveAlias;

if (require.main === module) {
  console.log(getResolveAlias());
}
