const Airtable = require('airtable')

function getTableData(base, table) {
  return new Promise(async (resolve, reject) => {
    const qObj = await base(table).select().all()
    resolve(qObj.map(i => i.fields))
  })
}

module.exports = function exportToLowdb(config) {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: config.atApiKey
    })

    const base = Airtable.base(config.baseId)

    return Promise.all(config.tables.map(t => getTableData(base, t)))
    .then(results => results.reduce((acc, cur, idx) => {
      acc[config.tables[idx]] = cur
      return acc
    }, {}))
}
