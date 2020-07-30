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
  constructor(element){
    super(element);
  }
  onSubmit( options ) {
    console.log('register');

    User.register(options, (err, response) => {
      if (response[success]) {
        
        this.element.reset();//При успешной регистрации сбрасывает формe
      
        App.setState('user-logged');

       let reg = new Modal(App.getModal( 'register' ).element);
        reg.close();
        
      }
    });
  }
}
