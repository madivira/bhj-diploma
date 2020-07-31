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
    console.log(options);

    User.login(options, (response) => {
      
        App.getModal( 'login' ).element.reset();//При успешной регистрации сбрасывает формe
        

        App.getModal( 'login' ).close();
        
        App.setState('user-logged');
        
    });
  }
}
