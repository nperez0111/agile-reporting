const loadJson = require('load-json-file')
const writeJson = require('write-json-file')
const inquirer = require('inquirer')

// Make a special key that shows current values
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
 * Function that allows usr to add new data points to current
 * json data
 */
function getNewDataPoint(){
  // A draft of questions
  var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var questions = [
    {
      type: 'input',
      name: 'value',
      message: "What is the next value?", 
	  validate: function(value) {
		  if (parseFloat(value.trim()) > 0 && parseFloat(value.trim()) < 1) {
			return true;
		}

		return 'Please enter a value between 0 and 1'
	  }
    },
	{
	   	type: 'list',
		name: 'month',
		message: 'Please enter the month: ',
		choices: monthNames
	},
	{
      type: 'input',
      name: 'day',
      message: "Please enter the day of the month: ",
	  validate: function(value) {
		day_input = parseInt(value.trim());
		if (isNaN(day_input) || day_input < 1 || day_input > 31) {
			return "Choose a day between 1 and 31";
		} else {
			return true;
		}
		
	  }
	}
	];

  inquirer.prompt(questions).then(answers => {
    addNewDataPoint(answers);
  });
}

/**
 * This is my idea of adding a new datapoint to the set based on
 * what the current JSON file looks like
 */
async function addNewDataPoint(newDataPoint){
  refinedDataPoint = {value:parseFloat(newDataPoint.value), label:newDataPoint.month + " "  + newDataPoint.day};
  const {numberOfDataPoints, dataPoints} = await loadJson('./data.json');
  dataPoints.push(refinedDataPoint);

  writeJson('./data.json', {numberOfDataPoints: dataPoints.length, dataPoints: dataPoints});
}


/**
 * These next few lines allow you to run this as it's own program for testing using
 * `node index.js` it will automatically call this function and execute it
 */
if(!module.parent){
  /*
  retrieveGraphData().then(dataReturned => {
    console.log('The data returned:');
    console.log(dataReturned)
  });
  */

  // Just for testing
  getNewDataPoint();
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
