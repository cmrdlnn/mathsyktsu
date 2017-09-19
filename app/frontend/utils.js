export function encodeFile(event, callback, valid_type) {
  const file = event.target.files[0]

  if (!file) {
    callback(null)
    return
  }

  if (valid_type) {
    let typeValidationFailed

    if (Array.isArray(valid_type)) {
      typeValidationFailed = !(file.type == valid_type[0] && file.name.includes(valid_type[1]))
    } else {
      typeValidationFailed = file.type != valid_type
    }

    if (typeValidationFailed) {
      callback(null)
      alert('Неверный тип файла')
      return
    }
  }

  const {
    name,
    size,
    last_modified,
    type
  } = file

  new Promise(resolve => {
    const fr = new FileReader()
    fr.addEventListener('load', () => {
      resolve({
        name,
        size,
        last_modified,
        type,
        content: fr.result
      })
    })
    fr.readAsDataURL(file)
  })
    .then(result => callback(result))
}
