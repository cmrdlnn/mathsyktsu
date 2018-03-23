export default function request(url, body, method = 'GET', headerOptions = {}) {
  const headers = {
    Mode: 'cors',
    Charset: 'UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    ...headerOptions,
  };

  const JWT = localStorage.getItem('JWT');

  if (JWT) {
    headers.Authorization = `Bearer ${JWT}`;
  }

  return fetch(url, {
    body,
    credentials: 'same-origin',
    headers,
    method,
  })
    .then((response) => {
      if (response.status === 403) localStorage.removeItem('JWT');
      if (response.ok) return response;
      throw response;
    });
}

export function JSONRequest(url, body, method = 'POST', headers = {}) {
  return request(
    url,
    JSON.stringify(body),
    method,
    { 'Content-Type': 'application/json', ...headers },
  );
}
