const io = require('./io/');
const graphing = require('./graphing');
const generateImage = require('./image');

async function main(){
  const dataPoints = await io();
  const server = await graphing(dataPoints);
  const imageLocation = await generateImage();
  server.close();
}

main();