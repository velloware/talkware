/* eslint-disable no-undef */

const hasToken = window.localStorage.getItem('@token') === null ? false : true;

if (hasToken) {
  window.location.href = window.location.href.replace(
    'pages/login.html',
    'index.html',
  );
}

function submitLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { email: email, password: password };

  fetch(`${config.URLBACKEND}/users/auth`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      if (response.status !== 200) {
        document.querySelector('.sign__message').innerHTML =
          'Incorrect username or password';
        document.querySelector('.sign__message').style.color = '#d92804';
        return;
      }

      response.json().then(function (data) {
        if (data.token) {
          document.querySelector('.sign__message').innerHTML = 'Login success';
          document.querySelector('.sign__message').style.color = '#1d9431';
          localStorage.setItem('@token', data.token);
          window.location.href = window.location.href.replace(
            'pages/login.html',
            'index.html',
          );
        }
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

document.getElementById('loginSubmit').addEventListener('click', submitLogin);
