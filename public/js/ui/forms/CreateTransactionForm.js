/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({name: this.element.name, id: this.element.id}, (err, response) => {

    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if(response) {
        options = '';//сбрасывает форму??
       // закрывает окно??
       App.update();
      }
    })
  }
}
/*Account.create(User.current(), (err, response) => {
      if (response) {
        let form = new Modal(this.element);
        form.close();
        //закрывает окно (в котором находится форма)?
        //сбрасывает форму??
        App.update();
      }
    })*/