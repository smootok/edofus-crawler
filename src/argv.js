const yargs = require('yargs')

module.exports = yargs
  .command('<get> <type>', 'Get item by url and type', yargs => {
    yargs.positional('type', {
      describe: 'Type of item'
    })
    yargs
      .option('url', {
        alias: 'u',
        describe: 'Item URL',
        nargs: 1
      })
      .demandOption(['u'])
  })
  .command('<get-all> <type>', 'Get all items by type')
  .demandCommand()
  .help().argv
