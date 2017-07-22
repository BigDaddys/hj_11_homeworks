window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.getElementById('tabs');
  const tabsNav = tabs.querySelector('.tabs-nav');
  const tabsContent = tabs.querySelector('.tabs-content');
  const articlesList = tabsContent.children;

  Array.from(articlesList).forEach((article, i) => {
    article.classList.add('hidden');
    article.setAttribute('id', 'tab_' + (i + 1));
    renderTab(article, i + 1);
  });

  articlesList[0].classList.remove('hidden');

  function renderTab(article, index) {
    const tabIcon = article.dataset.tabIcon;
    const tabTitle = article.dataset.tabTitle;
    const tabNavLI = document.createElement('li');
    const tabNavA = document.createElement('a');

    tabNavA.setAttribute('href', '#tab_' + index);
    tabNavA.classList.add('fa', tabIcon);
    tabNavA.textContent = tabTitle;

    tabNavA.addEventListener('click', (event) => {
      event.preventDefault();

      const listLi = tabsNav.children;
      const currentLi = event.target.parentElement;
      const currentArticle = tabsContent.querySelector(event.target.getAttribute('href'));

      for (let item of listLi) {
        item.classList.remove('ui-tabs-active');
      }

      for (let itemArticle of articlesList) {
        itemArticle.classList.add('hidden');
      }

      event.target.parentElement.classList.add('ui-tabs-active');
      currentArticle.classList.remove('hidden');
    });

    tabNavLI.appendChild(tabNavA);
    tabsNav.appendChild(tabNavLI);

    if (index === 1) {
      tabNavLI.classList.add('ui-tabs-active');
    }
  }

});