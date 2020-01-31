const associatedValueOriginalData = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1: {
      id: 'association1',
      _version: 1,
      attribute2: 'Attribute2Value',
    },
  },
};

const associatedValueValuesUnchanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Values: {
      id: 'association1',
      _version: 1,
      attribute2: 'Attribute2Value',
    },
  },
};

const associatedValueValuesChanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Values: {
      id: 'association1',
      _version: 1,
      attribute2: 'Attribute2ValueChanged',
    },
  },
};

module.exports = {
  associatedValueOriginalData,
  associatedValueValuesUnchanged,
  associatedValueValuesChanged,
};
