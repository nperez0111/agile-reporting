const loadJson = require('load-json-file')
const writeJson = require('write-json-file')
const inquirer = require('inquirer')

/**
 * We will use this sort of as our `public static void main` from java.
 * JavaScript is a very loose language so you kind of have to come up with your own patterns for things
 * 
 * This function will be what the other guys call to be able to retrieve the data to make the graph
 * so this function should return that data to them.
 * notice that I'm using an async function because we will be doing a lot of asynchronous actions 
 */
async function retrieveGraphData(){

  const {numberOfDataPoints, dataPoints} = await loadJson('./data.json');
  console.log('numberOfDataPoints', numberOfDataPoints);
  console.log('dataPoints', dataPoints);
  
  return dataPoints;
}


/**
 * These next few lines allow you to run this as it's own program for testing using
 * `node index.js` it will automatically call this function and execute it
 */
if(!module.parent){
  retrieveGraphData().then(dataReturned => {
    console.log('The data returned:');
    console.log(dataReturned)
  });
}

/**
 * This line is so that when the other guys need to use your function
 * they can just `require` it and be able to use this function
 * _So make sure to always return to them the right data_
 * 
 * For the other guys: @returns Promise<Array<DataPoint>>
 * where DataPoint: {value: Number, label: Date}
 **/ 
module.exports=retrieveGraphData;