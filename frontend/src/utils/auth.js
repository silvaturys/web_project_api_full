const base_url = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else {
      return Promise.reject(res.status);}
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

export const authorize = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        return data;
      } else {
        return;
      }
    })

    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
};

export const getToken = (token) => {
  return fetch(`${base_url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
};