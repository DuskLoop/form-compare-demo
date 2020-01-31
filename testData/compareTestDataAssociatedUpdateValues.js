const associatedUpdateValuesOriginalData = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1: [
      {
        id: 'association1',
        _version: 1,
        attribute2: 'Attribute2Value',
      },
    ],
  },
};

const associatedUpdateValuesValuesUnchanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Update_Values: [
      {
        id: 'association1',
        _version: 1,
        attribute2: 'Attribute2Value',
      },
    ],
  },
};

const associatedUpdateValuesValuesChanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Update_Values: [
      {
        id: 'association1',
        _version: 1,
        attribute2: 'Attribute2ValueChanged',
      },
    ],
  },
};

module.exports = {
  associatedUpdateValuesOriginalData,
  associatedUpdateValuesValuesUnchanged,
  associatedUpdateValuesValuesChanged,
};
