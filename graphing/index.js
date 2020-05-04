const express = require('express');

const app = express();

module.exports = (dataPoints, settings) => {
  app.use('/data', async (_, res) => res.json(dataPoints));

  app.use('/settings', async (_, res) => res.json(settings));

  app.use(express.static(`${__dirname}/html`));

  return new Promise((resolve) => {
    console.log('called');
    const server = app.listen(3000, () => console.log('listening') || resolve(server));
  });
};
