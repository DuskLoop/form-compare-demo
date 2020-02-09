const { someChange } = require('./compare');
const {
  associatedValueOriginalData,
  associatedValueValuesUnchanged,
  associatedValueValuesChanged,
} = require('./testData/compareTestDataAssociatedValue');

console.log(someChange(associatedValueOriginalData, associatedValueValuesChanged));
