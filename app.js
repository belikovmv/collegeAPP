if('serviceWorker'in navigator){
  navigator.serviceWorker.register('sw.js')
  .then(() => console.log('service worker registered'))
  .catch(() => console.log('service worker not registered'))
}


     info__close.onclick = function() {
  document.getElementById('info').style.display="none";
};

contant.onclick = function() {
  document.getElementById('info').style.display="inline-block";
};

contant.onclick = function() {

  document.getElementById('info').style.display="inline-block";
};

