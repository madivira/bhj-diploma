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

    const xhr = createRequest({
      method: 'GET',
      url: '/current',
      responseType: 'json',
      data: data,
      callback( err, response ) {
        let responseCall = new Object();
        if ( response && response.user ) {//если авторизован
          User.setCurrent( response.user );
          responseCall = {
            "success": true, 
            "user": {
              data
           }
          };
        } else {//необходима авторизация
          responseCall = {
            "success": false,
            "error": "Необходима авторизация"
          };
        }
        callback(err, responseCall);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f) {
    let xhr = createRequest({
      data: data, 
      method:'POST',
      url: '/login',
      responseType: 'json',
      callback( err, response ) {
        let responseCall = new Object();
        if ( response && response.user ) {
          User.setCurrent( response.user );
          responseCall = {
            "success": true, 
            "user": {
              data
           }
          }
        } else {
          responseCall = {
            "success": false,
            "error": `Пользователь c email ${data.email} и паролем ${data.password} не найден`
          }
        }
        callback(err, responseCall);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    let xhr = createRequest({
      data: data, 
      method:'POST',
      url: '/register',
      responseType: 'json',
      callback ( err, response ) {
        let responseCall = new Object();
        if ( response && response.user ) {
          User.setCurrent( response.user );
          responseCall = {
            "success": true, 
            "user": {
              data
           }
          }
        } else {
          responseCall = {
            "success": false,
            "error": {
                "email": [
                    "Поле E-Mail адрес должно быть действительным электронным адресом."
                ],
                "password": [
                    "Количество символов в поле Пароль должно быть не менее 3."
                ]
            }
        }
        }
        callback(err, responseCall);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f) {
    let xhr = createRequest({
      data: data, 
      method:'POST',
      url: '/logout',
      responseType: 'json',
      callback( err, response ) {
        let responseCall = new Object();
        if ( response && response.user ) {
          User.unsetCurrent( response.user );
          responseCall = {
            "success": true
          }
        } else {
          responseCall = {
            "success": false
          }
        } 
        callback(err, responseCall);
      },
    });
  }
}
