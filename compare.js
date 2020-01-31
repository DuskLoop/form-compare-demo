const r = require('ramda');

const operationSuffixes = ['_Values', '_Add_Values'];

const mapKeys = r.curry((fn, obj) =>
  r.fromPairs(r.map(r.adjust(0, fn), r.toPairs(obj)))
);

const removeNoneAssociations = values => {
  let valuesClone = r.clone(values);

  const keys = Object.keys(values);
  keys.forEach(key => {
    if (key !== '_Associations') {
      valuesClone = r.dissoc(key, valuesClone);
    }
  });

  return valuesClone;
};

const removeAssociations = values => {
  let valuesClone = r.clone(values);

  const keys = Object.keys(values);
  keys.forEach(key => {
    if (key === '_Associations') {
      valuesClone = r.dissoc(key, valuesClone);
    }
  });

  return valuesClone;
};

const stripSuffix = (values, suffix) => {
  let valuesClone = r.clone(values);

  valuesClone = removeNoneAssociations(valuesClone);
  if (values._Associations) {
    const associatedKeys = Object.keys(valuesClone._Associations);

    associatedKeys.forEach(key => {
      const prefixStart = key.indexOf('_');

      if (prefixStart === -1) {
        console.log('No Suffix found');
      } else {
        const currentSuffix = key.substring(prefixStart, key.length);

        if (currentSuffix !== suffix) {
          valuesClone = r.dissocPath(['_Associations', key], valuesClone);
        }
      }
    });

    // Remove suffix
    valuesClone = r.assoc(
      '_Associations',
      mapKeys(key => {
        const prefixStart = key.indexOf('_');

        if (prefixStart === -1) {
          console.log('No Suffix found');
        } else {
          const currentSuffix = key.substring(prefixStart, key.length);

          return key.replace(currentSuffix, '');
        }

        return key;
      }, valuesClone._Associations),
      valuesClone
    );
  }

  return valuesClone;
};

const removeOtherSuffixes = (values, suffix) => {
  let valuesClone = r.clone(values);

  valuesClone = removeNoneAssociations(valuesClone);
  if (values._Associations) {
    const associatedKeys = Object.keys(valuesClone._Associations);

    associatedKeys.forEach(key => {
      const prefixStart = key.indexOf('_');

      if (prefixStart === -1) {
        console.log('No Suffix found');
      } else {
        const currentSuffix = key.substring(prefixStart, key.length);

        if (currentSuffix !== suffix) {
          valuesClone = r.dissocPath(['_Associations', key], valuesClone);
        }
      }
    });
  }

  return valuesClone;
};

const containsSuffix = (values, suffix) => {
  if (values._Associations) {
    const associatedKeys = Object.keys(values._Associations);

    const someKeyContainsSuffix = associatedKeys.some(key => {
      const prefixStart = key.indexOf('_');

      if (prefixStart === -1) {
        console.log('No Suffix found');
        return false;
      } else {
        const currentSuffix = key.substring(prefixStart, key.length);

        return currentSuffix === suffix;
      }
    });

    return someKeyContainsSuffix;
  }

  return false;
};

const mergeValues = (key, left, right) => {
  // if (r.type(left) === 'Object' && r.type(right) === 'Array') {
  //   return {...left}
  // } else if (r.type(left) === 'Array' && r.type(right) === 'Object') {

  // } else

  if (r.type(left) === 'Array' && r.type(right) === 'Array') {
    return r.concat(left, right);
  } else {
    console.log('Not array:', left, right);

    return right;
  }
};

// enum ChangeType {

// }

// interface IChangedInfo {
//   path: string[];
//   changeType: ChangeType;
// }

const updated = (data, values) => {
  let key;

  for (key in data) {
    if (r.has(key, data) && key !== '_Associations') {
      if (r.has(key, values)) {
        if (data[key] !== values[key]) {
          return true;
        }
      }
    }
  }
};

const updatedDeep = (data, values) => {
  let result = updated(data, values);
  if (result) {
    return true;
  }

  if (r.has('_Associations', data) && r.has('_Associations', values)) {
    for (key in data['_Associations']) {
      if (
        r.has(key, data['_Associations']) &&
        r.has(key, values['_Associations'])
      ) {
        if (r.type(data['_Associations'][key]) === 'Array') {
          result = data['_Associations'][key].some((hej, index) =>
            updatedDeep(hej, values['_Associations'][key][index])
          );
          if (result) {
            return true;
          }
        } else {
          result = updatedDeep(
            data['_Associations'][key],
            values['_Associations'][key]
          );
          if (result) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

const resolveRefs = values => {
  let result = {};

  if (values._Associations) {
    const associatedKeys = Object.keys(values._Associations);

    associatedKeys.forEach(key => {
      const prefixStart = key.indexOf('_');

      if (prefixStart === -1) {
        console.log('No Suffix found');
      } else {
        const currentSuffix = key.substring(prefixStart, key.length);

        const association = key.replace(currentSuffix, '');

        if (currentSuffix === '_Ref') {
          result = r.assocPath(
            ['_Associations', association],
            { id: values['_Associations'][key] },
            result
          );
        }
      }
    });
  }

  return result;
};

const someChange = (data, formValues) => {
  const containsAddedOrDeletedAssociations =
    containsSuffix(formValues, '_Add_Values') ||
    containsSuffix(formValues, '_Delete_Values');

  if (containsAddedOrDeletedAssociations) {
    return true;
  }

  const withoutAssociations = removeAssociations(formValues);
  const updatedValues = stripSuffix(formValues, '_Values');
  const updatedManyValues = stripSuffix(formValues, '_Update_Values');
  const valuesWithRefResolved = resolveRefs(
    removeOtherSuffixes(formValues, '_Ref')
  );

  const mergedValues = [
    valuesWithRefResolved,
    withoutAssociations,
    updatedValues,
    updatedManyValues,
  ].reduce((mergedObject, currentObject) => {
    return r.mergeDeepWithKey(mergeValues, mergedObject, currentObject);
  }, {});

  return updatedDeep(data, mergedValues);
};

module.exports = { someChange };
