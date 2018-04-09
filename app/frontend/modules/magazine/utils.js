export const sliceByIndexes = (indexes, items, updatedData) => {
  let updated;

  if (updatedData) {
    updated = Array.isArray(updatedData) ? updatedData : [updatedData];
  } else {
    updated = [];
  }

  const preparedIndexes = [-1].concat(Array.isArray(indexes) ? indexes : [indexes]);

  const itemsParts = preparedIndexes.reduce((result, itemIndex, index) => {
    const part = items.slice(itemIndex + 1, preparedIndexes[index + 1]);
    if (updated[index]) part.push(updated[index]);
    result.push(part);
    return result;
  }, []);

  return [].concat(...itemsParts);
};

const findIndexesByProp = (prop, val, items) => (
  items.reduce((result, item, index) => {
    if (item[prop] === val) {
      result.push(index);
    }
    return result;
  }, [])
);

export default findIndexesByProp;
