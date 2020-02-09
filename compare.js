const r = require('ramda');

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

const hasUpdateOnKey = (fieldName, values) => {
  return Object.keys(values._Associations).some(key => {
    const valuesFieldName = key.substring(0, key.indexOf('_'));

    return valuesFieldName === fieldName;
  })
}

const updatedDeep = (data, values) => {
  let result = updated(data, values);
  if (result) {
    return true;
  }

  if (r.has('_Associations', data) && r.has('_Associations', values)) {
    for (key in data['_Associations']) {
      if (
        r.has(key, data['_Associations']) &&
        hasUpdateOnKey(key, values)
      ) {
        if (r.type(data['_Associations'][key]) === 'Array' && 
        r.has(`${key}_Update_Values`, values['_Associations'])) {
          result = data['_Associations'][key].some((hej, index) =>
            updatedDeep(hej, values['_Associations'][`${key}_Update_Values`][index])
          );
          if (result) {
            return true;
          }
        } else if(r.has(`${key}_Values`, values['_Associations'])) {
          result = updatedDeep(
            data['_Associations'][key],
            values['_Associations'][`${key}_Values`]
          );
          if (result) {
            return true;
          }
        } else if(r.has(`${key}_Ref`, values['_Associations'])) {
          result = data['_Associations'][key].id !== values._Associations[`${key}_Ref`];
          if (result) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

const someChange = (data, formValues) => {
  const containsAddedOrDeletedAssociations =
    containsSuffix(formValues, '_Add_Values') ||
    containsSuffix(formValues, '_Delete_Values');

  if (containsAddedOrDeletedAssociations) {
    return true;
  }

  return updatedDeep(data, formValues);
};

module.exports = { someChange };
