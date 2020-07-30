/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm{
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */

  constructor(element){
    super(element);
  }

  onSubmit( options ) {
    console.log('loginForm');

    User.login(options, (err, response) => {
      console.log(response);
      if (response[success]) {

        this.element.reset();//При успешной регистрации сбрасывает формe
        
        App.setState('user-logged');

        let log = new Modal(App.getModal( 'login' ));
        log.close();
        
      }
    });
  }
}
