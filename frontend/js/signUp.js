/* eslint-disable no-undef */

const hasToken = window.localStorage.getItem('@token') === null ? false : true;

if (hasToken) {
  window.location.href = window.location.href.replace(
    'pages/signUp.html',
    'index.html',
  );
}

const submitButton = document.querySelector('#submitSignUp');

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const setInputError = (element, text) => {
  element.nextElementSibling.innerHTML = text;
  element.parentElement.children[2].style.color = '#d92804';
};

const submitSignUp = () => {
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  if (!regex.test(data.email)) {
    setInputError(email, 'Invalid email');
    return;
  }

  if (data.username.length < 3 || data.username.length > 255) {
    setInputError(
      username,
      'The field must be between 3 and 255 characters long',
    );
    return;
  }

  if (data.password.length < 6 || data.password.length > 255) {
    setInputError(
      password,
      'The field must be between 6 and 255 characters long',
    );
    return;
  }

  fetch('https://talkware-backend.velloware.com/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      if (response.status !== 200 && response.status !== 201) {
        document.querySelector('.sign__message').innerHTML =
          'Error creating user';
        document.querySelector('.sign__message').style.color = '#d92804';
        return;
      }
      response.json().then(function (data) {
        if (data.token) {
          document.querySelector('.sign__message').innerHTML =
            'Success creating user';
          document.querySelector('.sign__message').style.color = '#1d9431';
          localStorage.setItem('@token', data.token);
          window.location.href = window.location.href.replace(
            'pages/signUp.html',
            'index.html',
          );
        }
      });
    })
    .catch(function (err) {
      document.querySelector('.sign__message').innerHTML =
        'Error creating user';
      console.log('Fetch Error :-S', err);
    });
};

submitButton.addEventListener('click', submitSignUp);
