const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Recipe Sharing Database',
    description: 'An API for writing, sharing, and finding recipe'
  },
  host: 'localhost:8080',
  schemes: ['http']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });