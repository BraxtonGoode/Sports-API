const swaggerAutogen = require('swagger-autogen')();


const doc = {
    inf: {
        title: 'Sports API',
        description: 'API for managing sports data',
    },
    host: 'localhost:3000',
    schemes: ['http'],

    }
const outputFile = './swagger_output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc)