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
  .command('<get-all> <type>', 'Get all items by type', yargs => {
    yargs.positional('type', {
      describe: 'Type of item'
    })
  })
  .command(
    '<get-effects> <filename>',
    'Get all effects names from a JSON items file',
    yargs => {
      yargs.positional('filename', {
        describe: 'JSON filename located in output folder'
      })
    }
  )
  .command(
    '<download-images> <filename>',
    'Download all images from a JSON items file',
    yargs => {
      yargs.positional('filename', {
        describe: 'JSON filename located in output folder'
      })
    }
  )
  .demandCommand()
  .help().argv
