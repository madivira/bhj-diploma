/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try{
      this.element = element;
      this.registerEvents();
      this.update();
      if (!element) {//если элемент пуст
        throw new Error('Error');
      }
    } catch(e){
      console.log(e);
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('span.create-account').onclick = () => {
      const newAccount = new Modal(App.getModal('createAccount').element);
      newAccount.open();
    } 

    let sidebarAccount = document.querySelectorAll('ul.sidebar-menu account');
    sidebarAccount.forEach(element => {
      element.addEventListener('click', this.onSelectAccount(element));
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()){
      Account.list(User.current(), (err, response) => {
        if(response){
          this.clear();
          this.renderItem(response);
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = document.querySelector('.main-sidebar').querySelectorAll('.account');
    for(let acc of accounts){
      acc.remove();
    } 
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    element.classList.add('active');
    let accounts = document.querySelector('.main-sidebar').querySelectorAll('.account');
    for(let acc of accounts) {
      if(acc.classList.contains('active')) {
        acc.classList.toggle('active');
      }
    }
    App.showPage( 'transactions', { account_id: id_счёта });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `<li class="active account" data-id="${item[id]}">
      <a href="#">
        <span>${item[name]}</span> /
        <span>${item[sum]}</span>
      </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    item.forEach(element => {
      this.element.innerHTML = this.getAccountHTML(element);
    })
  }
}
