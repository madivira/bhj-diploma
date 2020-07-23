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
  onSubmit( options ) {
    console.log('loginForm');
    let data = new Object();

    for (let el of options) {//создает объект для передачи его юзер
      el.onchange = () => {
        data[`${el.getAttribute('name')}`] = el.value.trim();
      }
    }
    
    User.login(data, (err, response) => {
      if (response[success]) {
        //При успешной регистрации сбрасывает форму
        for (let el of options) {
          el.value = '';
        }
        App.setState('user-logged');
        const element = new Modal(options);
        element.close();
      }
    });
  }
}
