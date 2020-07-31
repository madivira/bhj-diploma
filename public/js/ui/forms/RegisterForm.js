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
    console.log(options);

    User.register(options, (response) => {
     
        App.getModal( 'register' ).element.reset();//При успешной регистрации сбрасывает формe
      
        App.setState('user-logged');

        App.getModal( 'register' ).close();
        
      
    });
  }
}
