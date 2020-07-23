/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body =  document.querySelector('body');
    document.querySelector('.sidebar-toggle').onclick = () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() { 
    document.querySelector('li.menu-item_register a').onclick = () => {
      const reg = new Modal(App.getModal('register').element);
      reg.open();
      return false;
    };
    document.querySelector('li.menu-item_login a').onclick = () => {
      const log = new Modal(App.getModal('login').element);
      log.open();
      return false;
    };
    document.querySelector('li.menu-item_logout a').onclick = () => {
     User.logout(User.current(),(err, response) => {
       if(response[success]) {
        App.setState( 'init' );
       }
     })
    };
  }

}
