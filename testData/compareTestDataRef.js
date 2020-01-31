const refOriginalData = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1: {
      id: 'association1',
      _version: 1,
    },
  },
};

const refValuesUnchanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Ref: 'association1',
  },
};

const refValuesChanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Ref: 'association1Changed',
  },
};

module.exports = {
  refOriginalData,
  refValuesUnchanged,
  refValuesChanged,
};
