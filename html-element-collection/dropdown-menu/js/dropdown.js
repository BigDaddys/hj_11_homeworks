;(function () {

  const drpDwnBtn = document.getElementsByClassName('wrapper-dropdown')[0];

  drpDwnBtn.onclick = function () {
    this.classList.toggle('active');
  }

})();