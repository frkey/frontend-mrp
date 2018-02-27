var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const materialsURL = config.apiGatewayUri + '/materials'

function loadMaterials (location, options, successCallback, errorCallback) {
  httpTransformation.makeUrl(config.apiGatewayUri + location, options, (url) => {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'necessidade.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  })
}

export default {
  loadMaterials
}
