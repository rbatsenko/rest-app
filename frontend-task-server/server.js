const express = require('express');
const app = express();
const port = 3000;
const xml = require('xml');

app.get('/', (req, res) => res.send('Serving data :)'));

app.get('/advertisers/:format?', (req, res) => {
  if (req.query.format === 'json') {
    res.json(
      [
        {
            "id": 1,
            "name": "MockAdvertiser",
            "external_id": "1",
            "impressions": 52721284,
            "clicks": 93149
        }
      ]
    );
  } else if (req.query.format === 'xml') {
    res.set('Content-Type', 'text/xml');
    res.send(xml(
      [
        {
          advertisers: [
            {
              advertiser: [
                { id: 1 },
                { name: "MockAdvertiser" },
                { external_id: 1 },
                { impressions: 52721284 },
                { clicks: 93149 }
              ]
            }
          ]
        }
      ], { declaration: true }
    ));
  } else {
    res.send('Incorrect data format :/');
  }
});

app.listen(port, () => console.log(`Serving data on port ${port}!`))