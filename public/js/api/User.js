/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    
    localStorage.user = JSON.stringify(user);
   
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {

    if(localStorage.length) {
      delete localStorage.user;
    } else{
      return undefined;
    };

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {

    if(localStorage.length) {
      return JSON.parse(localStorage.user);
    } else{
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f) {

    return createRequest({
      method: 'GET',
      url: this.URL + '/current',
      responseType: 'json',
      data: data,
      callback( err, response ) {
        if ( response && response.user ) {
          User.setCurrent( response.user );
          callback(response);
      }
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f) {
    return createRequest({
      data: data, 
      method:'POST',
      url: this.URL + '/login',
      responseType: 'json',
      callback( err, response ) {
        if ( response.success && response.user ) {
          User.setCurrent( response.user );
          callback(response);
      }
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    return createRequest({
      data: data, 
      method:'POST',
      url: this.URL + '/register',
      responseType: 'json',
      callback ( err, response ) {
        if ( response.success && response.user ) {
          User.setCurrent( response.user );
          callback(response);
        }
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f) {
    return createRequest({
      data: data, 
      method:'POST',
      url: this.URL + '/logout',
      responseType: 'json',
      callback( err, response ) {
        if ( response.success && response.user ) {
          User.unsetCurrent();
          callback(response);
      }
    }
  })
}
}
