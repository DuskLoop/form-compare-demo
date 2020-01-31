const associatedAddValuesOriginalData = {
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

const associatedAddValuesValuesUnchanged = {
  id: 'testData',
  _version: 1,
};

const associatedAddValuesValuesChanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Add_Values: [
      {
        attribute2: 'Attribute2Value',
      },
    ],
  },
};

module.exports = {
  associatedAddValuesOriginalData,
  associatedAddValuesValuesUnchanged,
  associatedAddValuesValuesChanged,
};
