/* eslint-disable no-undef */

document.getElementById('loginSubmit').addEventListener('click', submitLogin);

function submitLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { email: email, password: password };

  console.log(data);

  fetch('https://talkware-backend.velloware.com/users/auth', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status,
        );
        return;
      }
      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          // window.location.replace('https://talkware.velloware.com');
        }
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}
