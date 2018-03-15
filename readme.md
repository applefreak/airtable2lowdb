# airtable2lowdb

Converts Airtable base to [LowDB](https://github.com/typicode/lowdb) compatible object

## Install

```
npm install --save airtable2lowdb
```

## Usage

```js
const exportToLowdb = require('airtable2lowdb')

exportToLowdb({
  name: 'Your table name',  // Not really needed
  atApiKey: 'YOUR_API_KEY', // Get this in your Airtable account page
  baseId: 'YOUR_BASE_ID',   // Get this in the API docs
  tables: [                 // List of table names you want to export
    'Table 1 name',
    'Table 2 name',
    'Table 3 name'
  ]
}).then(results => console.log(results))
```

This will output an object with table names as key and arrays of row objects in that table as value

## License

[MIT](https://poyu.mit-license.org/)
