export const sliceByIndex = (index, items, updatedItem) => {
  if (index < 0) return items;
  const updated = updatedItem ? [updatedItem] : [];
  return [...items.slice(0, index), ...updated, ...items.slice(index + 1)];
};

const findIndexById = (id, items) => items.findIndex(item => item.id === id);

export default findIndexById;
