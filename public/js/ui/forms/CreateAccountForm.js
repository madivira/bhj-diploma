/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm{
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options, (err,response) => {
      if (response) {
        this.element.reset();//сбрасывает форму
        let createAccount = new Modal( App.getModal( 'createAccount' ).element);
        createAccount.close();
        App.update();
      }
    })
  }
}
