;(function () {

  const slider = document.getElementById('slider');
  const imagesList = ['airmax', 'airmax-jump', 'airmax-on-foot', 'airmax-playground', 'airmax-top-view'];
  let ind = 0;

  setInterval(() => {
    slider.src = `i/${imagesList[ind]}.png`;
    ind = ind >= imagesList.length-1 ? 0 : ind + 1;
  }, 1000);

})();