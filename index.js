
// createEmployeeRecord
// Argument(s)
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// Returns
// JavaScript Object with keys:
// firstName
// familyName
// title
// payPerHour
// timeInEvents
// timeOutEvents
// Behavior
// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.

function createEmployeeRecord(employeeArray) {
    //create object for employee record
    const employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;


}


// createEmployeeRecords
// Argument(s)
// Array of Arrays
// Returns
// Array of Objects
// Behavior
// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords (employeesArray) {
    //loop through employeeArray and pass each one into create objects for each employeeArray
    const employeeRecords = employeesArray.map((employeeArray) => createEmployeeRecord(employeeArray));
    return employeeRecords;
}

// createTimeInEvent
// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
// Returns
// The employee record
// Behavior
// Add an Object with keys to the timeInEvents Array on the record Object:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument
function createTimeInEvent(employeeRecord, date) {
    const dateArray = date.split(" ");

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;

}



// createTimeOutEvent
// Argument(s)
// An employee record Object
// A date stamp ("YYYY-MM-DD HHMM")
// Returns
// The employee record
// Behavior
// Add an Object with keys to the timeOutEvents Array on the record Object:
// type: Set to "TimeOut"
// hour: Derived from the argument
// date: Derived from the argument
function createTimeOutEvent(employeeRecord, date) {
    const dateArray = date.split(" ");

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;

}

// hoursWorkedOnDate
// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
// Returns
// Hours worked, an Integer
// Behavior
// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(findDate => findDate.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(findDate => findDate.date === date);

    return (timeOut.hour - timeIn.hour)/100

}

// wagesEarnedOnDate
// Argument(s)
// An employee record Object
// A date of the form "YYYY-MM-DD"
// Returns
// Pay owed
// Behavior
// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate (employeeRecord, date) {
    let employeeWage = employeeRecord.payPerHour;
    return parseInt((hoursWorkedOnDate(employeeRecord, date))* employeeWage) 

}

// allWagesFor
// Argument(s)
// An employee record Object
// Returns
// Pay owed for all dates
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...

function allWagesFor (employeeRecord) {

    let allAvailableDates = employeeRecord.timeInEvents.map(findDate => findDate.date);

    let allWagesForEmployeeArray = allAvailableDates.map(date => wagesEarnedOnDate(employeeRecord, date));

    let allWagesForEmployeeSum = allWagesForEmployeeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return allWagesForEmployeeSum;

    }




// calculatePayroll
// Argument(s)
// Array of employee records
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.

function calculatePayroll (employeeRecords) {

    return employeeRecords.reduce((accumulator, employeeRecord) => {
        return accumulator + allWagesFor(employeeRecord)

    },0)

    console.log(employeeRecords);

    console.log(employeeRecords.timeInEvents[0]);

    console.log(employeeRecords.timeOutEvents[0]);

    // let allAvailableDates = employeeRecords.timeInEvents.map(findDate => findDate.date);


    // let allWagesForEmployeesArray = allAvailableDates.map(date => wagesEarnedOnDate(employeeRecords, date));

    // let allWagesForEmployeesSum = allWagesForEmployeesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    //return allWagesForEmployeesSum;
}