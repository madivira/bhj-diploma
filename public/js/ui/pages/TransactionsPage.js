/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    try{
      this.element = element;
      this.registerEvents();
      if (!element) {//если элемент пуст
        throw new Error('Error');
      }
    } catch(e){
      console.log(e);
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.element);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    document.querySelector('button.remove-account').addEventListener('click', this.removeAccount());
    document.querySelector('button.transaction__remove').addEventListener('click', this.removeTransaction());
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions){
      const clear = confirm('Вы действительно хотите удалить счёт?');
      alert(clear);
      if(clear) {
        this.clear();
        Account.remove(this.lastOptions[account_id], this.lastOptions, (err, response) => {
          if(response) {
            App.update();
          }
        })
      }
      
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    const clear = confirm('Вы действительно хотите удалить эту транзакцию?');
    alert(clear);
    if(clear) {
      Transaction.remove(id, this.lastOptions, (err, response) => {
        if(response) {
          App.update();
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if(options) {
      this.lastOptions = options;//Для работы метода update следует сохранить options в свойство lastOptions.
      Account.get(options[account_id], options, (err,response) => {
        if (response) {
          this.renderTitle(response[name])//name?
        }
      });
      Transaction.list(options, (err,response) => {
        this.renderTransactions(options);
      })
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector(".content-title").innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let dateNew = new Date(date);
  
    let formatterDate = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    let formatterTime = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric"
    });

    return `${formatterDate.format(dateNew)} в ${formatterTime.format(dateNew)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let element = createElement('div');
    if(item[type] == "expense") {
      element.className = "transaction transaction_expense row";
    } else if (item[type] == "income") {
      element.className = "transaction transaction_income row";
    }
    date = this.formatDate(item[date]);
    element.innerHTML = `<div class="col-md-7 transaction__details">
    <div class="transaction__icon">
        <span class="fa fa-money fa-2x"></span>
    </div>
    <div class="transaction__info">
        <h4 class="transaction__title">${item[name]}</h4>
        <div class="transaction__date">${date}</div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="transaction__summ">
    <!--  сумма -->
        ${item[sum]} <span class="currency">₽</span>
    </div>
  </div>
  <div class="col-md-2 transaction__controls">
      <!-- в data-id нужно поместить id -->
      <button class="btn btn-danger transaction__remove" data-id="${item[id]}">
          <i class="fa fa-trash"></i>  
      </button>
  </div>`;
  return element;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    for(let element of data) {
      document.querySelector('section.content').insertAdjacentHTML('beforeend', this.getTransactionHTML(element));
    };
  }
}
