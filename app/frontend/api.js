function ajaxRequest(url, data, type, headerOptions){
  let headers = Object.assign({
    'Mode': 'cors',
    'Charset': 'utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }, headerOptions)
  return fetch(url, {
    method: type || 'get',
    headers,
    credentials: 'same-origin',
    body: data
  }).then(response => {
    return response
  })
}

export function ajaxRequestToServer(url, data, type, headerOptions={}){
  return ajaxRequest(url, JSON.stringify(data), type, Object.assign({'Content-Type':'application/json'}, headerOptions))
}
