const { someChange } = require('./compare');
const {
  simpleAttributeOriginalData,
  simpleAttributeValuesUnchanged,
  simpleAttributeValuesChanged,
} = require('./testData/compareTestDataSimpleAttribute');
const {
  associatedValueOriginalData,
  associatedValueValuesUnchanged,
  associatedValueValuesChanged,
} = require('./testData/compareTestDataAssociatedValue');
const {
  associatedAddValuesOriginalData,
  associatedAddValuesValuesUnchanged,
  associatedAddValuesValuesChanged,
} = require('./testData/compareTestDataAssociatedAddValues');
const {
  associatedUpdateValuesOriginalData,
  associatedUpdateValuesValuesUnchanged,
  associatedUpdateValuesValuesChanged,
} = require('./testData/compareTestDataAssociatedUpdateValues');
const {
  associatedDeleteValuesOriginalData,
  associatedDeleteValuesValuesUnchanged,
  associatedDeleteValuesValuesChanged,
} = require('./testData/compareTestDataAssociatedDeleteValues');
const {
  refOriginalData,
  refValuesUnchanged,
  refValuesChanged,
} = require('./testData/compareTestDataRef');

describe('compare', () => {
  it('Returns false when attribute has not changed', () => {
    expect(
      someChange(simpleAttributeOriginalData, simpleAttributeValuesUnchanged)
    ).toEqual(false);
  });
  it('Returns true when attribute has changed', () => {
    expect(
      someChange(simpleAttributeOriginalData, simpleAttributeValuesChanged)
    ).toEqual(true);
  });

  it('Returns false when association has not changed', () => {
    expect(
      someChange(associatedValueOriginalData, associatedValueValuesUnchanged)
    ).toEqual(false);
  });
  it('Returns true when association has changed', () => {
    expect(
      someChange(associatedValueOriginalData, associatedValueValuesChanged)
    ).toEqual(true);
  });

  it('Returns false when no association has been added', () => {
    expect(
      someChange(
        associatedAddValuesOriginalData,
        associatedAddValuesValuesUnchanged
      )
    ).toEqual(false);
  });
  it('Returns true when association has been added', () => {
    expect(
      someChange(
        associatedAddValuesOriginalData,
        associatedAddValuesValuesChanged
      )
    ).toEqual(true);
  });

  it('Returns false when associations has not changed', () => {
    expect(
      someChange(
        associatedUpdateValuesOriginalData,
        associatedUpdateValuesValuesUnchanged
      )
    ).toEqual(false);
  });
  it('Returns true when associations has changed', () => {
    expect(
      someChange(
        associatedUpdateValuesOriginalData,
        associatedUpdateValuesValuesChanged
      )
    ).toEqual(true);
  });

  it('Returns false when no association has been deleted', () => {
    expect(
      someChange(
        associatedDeleteValuesOriginalData,
        associatedDeleteValuesValuesUnchanged
      )
    ).toEqual(false);
  });
  it('Returns true when association has been deleted', () => {
    expect(
      someChange(
        associatedDeleteValuesOriginalData,
        associatedDeleteValuesValuesChanged
      )
    ).toEqual(true);
  });

  it('Returns false when ref has not changed', () => {
    expect(someChange(refOriginalData, refValuesUnchanged)).toEqual(false);
  });
  it('Returns true when ref has changed', () => {
    expect(someChange(refOriginalData, refValuesChanged)).toEqual(true);
  });
});
