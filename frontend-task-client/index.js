import "babel-polyfill";
import './styles/styles.scss';
import format from 'xml-formatter';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

const responseContainer = document.getElementById('response');

async function getAdvertisers(type) {
  if (type === 'xml') {
    try {
      const response = await fetch('http://localhost:3000/advertisers/?format=' + type).then(r => r.text());
      responseContainer.textContent = format(response);
      hljs.initHighlighting();
    } catch(error) {
      console.log(error);
    }
  } else if (type === 'json') {
    try {
      const response = await fetch('http://localhost:3000/advertisers/?format=' + type).then(r => r.json());
      responseContainer.textContent = JSON.stringify(response, null, 4);
      hljs.initHighlighting();
    } catch(error) {
      console.log(error);
    }
  }
}

getAdvertisers('xml');