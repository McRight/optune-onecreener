import get from 'lodash/get'

const flattenArray = array =>
  array.reduce(
    (flat, toFlatten) =>
      flat.concat(
        Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
      ),
    []
  )

const setObjectValues = (key, values, initialValues) => {
  let updateValue
  let addedField
  let updatedField
  let removedField

  const value = get(values, key)
  const initialValue = get(initialValues, key)

  if (value === undefined) {
    // Do nothing
  } else if (Array.isArray(value)) {
    // Array
    updateValue = value

    if (initialValue && Array.isArray(initialValue)) {
      if (!initialValue.length && value.length) {
        addedField = [key]
      } else if (initialValue.length && !value.length) {
        removedField = [key]
      } else if (initialValue.length !== value.length) {
        updatedField = [key]
      }
    } else if (value.length) {
      addedField = [key]
    }
  } else if (typeof value === 'boolean') {
    // Boolean
    updateValue = value
    if (initialValue === undefined) {
      addedField = [key]
    } else if (initialValue !== value) {
      updatedField = [key]
    }
  } else if (!value > '' && initialValue > '') {
    // Removed Value
    updateValue = null
    removedField = [key]
  } else if (value instanceof Object) {
    updateValue = {}
    addedField = []
    updatedField = []
    removedField = []

    // Object (recursive)
    Object.keys(value).map(valueKey => {
      const childValues = setObjectValues(valueKey, value, initialValue)

      if (childValues.updateValue !== undefined) {
        updateValue[valueKey] = childValues.updateValue

        if (childValues.addedField)
          addedField = addedField.concat(
            childValues.addedField.map(field => `${key}.${field}`)
          )
        if (childValues.updatedField)
          updatedField = updatedField.concat(
            childValues.updatedField.map(field => `${key}.${field}`)
          )
        if (childValues.removedField)
          removedField = removedField.concat(
            childValues.removedField.map(field => `${key}.${field}`)
          )
      }
    })
  } else {
    // Value
    updateValue = value
    if (initialValue > '' && value !== initialValue) {
      updatedField = [key]
    } else if (!initialValue > '') {
      addedField = [key]
    }
  }

  return {
    updateValue,
    addedField,
    updatedField,
    removedField,
  }
}

export const getUpdateFields = ({ values, initialValues }) => {
  const addedFields = []
  const updatedFields = []
  const removedFields = []

  const cleanedValues = { ...values }
  delete cleanedValues.users

  // Set update values and determine added, updated and removed fields
  const updateValues = Object.keys(cleanedValues).reduce(
    (prevValues, nextKey) => {
      const nextValue = setObjectValues(nextKey, cleanedValues, initialValues)

      if (nextValue.updateValue !== undefined) {
        addedFields.push(nextValue.addedField)
        updatedFields.push(nextValue.updatedField)
        removedFields.push(nextValue.removedField)
      }

      return nextValue.updateValue === undefined
        ? prevValues
        : { ...prevValues, [nextKey]: nextValue.updateValue }
    },
    {}
  )

  return {
    updateValues,
    addedFields: flattenArray(addedFields).filter(f => f),
    updatedFields: flattenArray(updatedFields).filter(f => f),
    removedFields: flattenArray(removedFields).filter(f => f),
  }
}
