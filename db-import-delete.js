const fs = require('fs')
const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/edofus'

const itemSchema = new mongoose.Schema({}, { strict: false })
const Item = mongoose.model('Equipment', itemSchema)

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successful!'))

const importItems = async fileName => {
  try {
    const items = JSON.parse(
      fs.readFileSync(`${__dirname}/output/${fileName}`, 'utf-8')
    )
    await Item.create(items)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

const deleteItems = async () => {
  try {
    await Item.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import' && process.argv[3]) {
  const fileName = process.argv[3]
  importItems(fileName)
} else if (process.argv[2] === '--delete') {
  deleteItems()
} else {
  console.log('Command Not Found')
  process.exit()
}
