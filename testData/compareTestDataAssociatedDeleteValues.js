const associatedDeleteValuesOriginalData = {
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

const associatedDeleteValuesValuesUnchanged = {
  id: 'testData',
  _version: 1,
};

const associatedDeleteValuesValuesChanged = {
  id: 'testData',
  _version: 1,
  attribute1: 'Attribute1Value',
  _Associations: {
    association1_Delete_Values: [
      {
        id: 'association1',
        _version: 1,
        attribute2: 'Attribute2Value',
      },
    ],
  },
};

module.exports = {
  associatedDeleteValuesOriginalData,
  associatedDeleteValuesValuesUnchanged,
  associatedDeleteValuesValuesChanged,
};
