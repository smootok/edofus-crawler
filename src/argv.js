const yargs = require('yargs')

module.exports = yargs
  .command('<get-item>', 'Get item by url and type')
  .demandCommand()
  .help().argv
