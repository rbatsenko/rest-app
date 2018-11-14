const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
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
                { 
                  _attr: {
                    id: 1,
                    name: "MockAdvertiser",
                    external_id: 1,
                    impressions: 52721284,
                    clicks: 93149
                  }
                }
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