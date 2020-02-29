const express = require("express");
const app = express();

app.use('/data',(req,res)=>{
  /**
   * This is the route that you will use to actually retrieve the data that you need.
   * 
   * Will eventually use `/io` to get the data but for now it is okay to just use an array here directly
   */

  return res.json([{value:0.45, label: (new Date()).toString()}])
});

app.use(express.static(__dirname + '/html'));

app.listen(3000, () => {
  console.log('app listening on port 3000!')
  console.log('go to: http://localhost:3000/ in your browser')
});