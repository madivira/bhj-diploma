//const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    console.log('register');
    let data = new Object();

    for (let el of options) {//создает объект для передачи его юзер
      el.onchange = () => {
        data[el.getAttribute('name')] = el.value.trim();
      }
    }
    
    User.register(data, (err, response) => {
      if (response['success']) {
        //При успешной регистрации сбрасывает форму
        for (let el of options) {
          el.value = '';
        }
        App.setState('user-logged');
        const element = new Modal(App.getModal('register').element);
        element.close();
      }
    });
  }
}
