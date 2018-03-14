const fs = require('fs')
const Airtable = require('airtable')

const config = require('./config')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: config.AT_API_KEY
})

all().then(results => fs.writeFileSync(`./output/${config.name}.json`, JSON.stringify(results)))

function all() {
  return Promise.all(config.tables.map(t => getTableData(t)))
  .then(results => results.reduce((acc, cur, idx) => {
    acc[config.tables[idx]] = cur
    return acc
  }, {}))
}

function getTableData(table) {
  return new Promise(async (resolve, reject) => {
    const base = Airtable.base(config.BASE_ID)
    const qObj = await base(table).select().all()
    resolve(qObj.map(i => i.fields))
  })
}
