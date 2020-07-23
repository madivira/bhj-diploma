//const { response } = require("express");

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
    Account.create(User.current(), (err, response) => {
      if (response) {
        let form = new Modal(this.element);
        form.close();
        //закрывает окно (в котором находится форма)?
        //сбрасывает форму??
        App.update();
      }
    })
  }
}
