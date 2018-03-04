export function request(url, data, type, headerOptions) {
  const headers = {
    Mode: 'cors',
    Charset: 'utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    ...headerOptions,
  };
  const token = localStorage.getItem('auth_token');

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    method: type || 'get',
    headers,
    credentials: 'same-origin',
    body: data,
  })
    .then(response => response)
    .catch(error => console.log(error))
}

export function JSONRequest(url, data, type, headerOptions = {}) {
  return request(
    url,
    JSON.stringify(data),
    type,
    { 'Content-Type': 'application/json', ...headerOptions },
  );
}
