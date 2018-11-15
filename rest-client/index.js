import "babel-polyfill";
import format from 'xml-formatter';
import hljs from 'highlight.js/lib/highlight';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
import 'normalize.css';
import 'highlight.js/styles/github.css';
import './styles/styles.scss';

let responseSelect = document.getElementById('response-type');
let requestDataFormatContainer = document.getElementsByClassName('request__url__format')[0];
let responseContainer = document.getElementById('response');
let fetchBtn = document.getElementById('fetch-data');
let forceFetch = document.getElementById('force-fetch');

fetchBtn.addEventListener('click', () => {
  let responseFormat = responseSelect.value;

  responseContainer.classList.remove(responseContainer.classList[1]);
  responseContainer.classList.add(responseFormat);
  requestDataFormatContainer.innerHTML = responseFormat;
  forceFetch.checked === true ? fetchBtn.disabled = false : fetchBtn.disabled = true;
  getAdvertisers(responseFormat);
});

responseSelect.addEventListener('change', () => {
  let responseFormat = responseSelect.value;
  requestDataFormatContainer.textContent.length !== 0 && requestDataFormatContainer.textContent === responseFormat ? fetchBtn.disabled = true : fetchBtn.disabled = false;
});

forceFetch.addEventListener('change', function() {
  this.checked === true ? fetchBtn.disabled = false : fetchBtn.disabled = true;
});

async function getAdvertisers(type) {
  responseContainer.textContent = 'Fetching data...';
  try {
    const response = await fetch('http://localhost:3000/advertisers/?format=' + type)
      .then(r => { 
        if (type === 'json') { 
          return r.json() 
        } else { 
          return r.text() 
        } 
      });

    type === 'json' ? responseContainer.textContent = JSON.stringify(response, null, 4) : responseContainer.textContent = format(response); // different parsing for different formats
    hljs.highlightBlock(document.getElementsByTagName('code')[0]);
  } catch(error) {
    responseContainer.innerHTML = '<span class="error">' + error + '</span>';
  }
}