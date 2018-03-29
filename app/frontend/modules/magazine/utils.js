export const sliceByIndex = (index, items, updatedData) => {
  if (index < 0) return items;
  const updated = updatedData ? [{ ...items[index], ...updatedData }] : [];
  console.log(updated)
  return [...items.slice(0, index), ...updated, ...items.slice(index + 1)];
};

const findIndexById = (id, items) => items.findIndex(item => item.id === id);

export default findIndexById;
