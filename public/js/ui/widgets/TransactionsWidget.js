/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    document.querySelector('button.create-income-button').onclick = () => {//доход
      const income = new Modal(App.getModal('newIncome').element);
      income.open(); 
    }
    document.querySelector('button.create-expense-button').onclick = () => {//расход
      const expense = new Modal(App.getModal('newExpense').element);
      expense.open();
    }
  }
}
