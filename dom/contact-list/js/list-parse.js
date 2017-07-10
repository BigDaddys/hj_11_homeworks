const contactsList = document.querySelector('.contacts-list');
const dataList = JSON.parse(loadContacts());

for (let item of dataList) {
  contactsList.innerHTML += `<li data-email="${item.email}" data-phone="${item.phone}">
                              <strong>${item.name}</strong>
                            </li>`;
}