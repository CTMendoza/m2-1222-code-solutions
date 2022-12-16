var $userList = document.querySelector('#user-list');
var userDataReq = new XMLHttpRequest();
userDataReq.open('GET', 'https://jsonplaceholder.typicode.com/users');
userDataReq.responseType = 'json';
userDataReq.addEventListener('load', function () {
  console.log('userDataReq status is ', userDataReq.status);
  console.log('userDataReq response is ', userDataReq.response);
  for (var i = 0; i < userDataReq.response.length; i++) {
    var newLi = document.createElement('li');
    newLi.textContent = userDataReq.response[i].name;
    $userList.appendChild(newLi);
  }
});
userDataReq.send();
