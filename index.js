const { someChange } = require('./compare');
const {
  refOriginalData,
  refValuesUnchanged,
  refValuesChanged,
} = require('./testData/compareTestDataRef');

console.log(someChange(refOriginalData, refValuesChanged));
