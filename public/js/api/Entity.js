/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f) {
    let xhr = createRequest({
      data: data, 
      method:'GET',
      url: this.URL,
      responseType: 'json',
      callback(err, response){
        if(response){
          callback(err, {response});
        }
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    const newData = Object.assign({ _method: 'PUT' }, data);
    let xhr = createRequest({
      data: newData, 
      method:'POST',
      url: this.URL,
      responseType: 'json',
      callback(err, response){
        if(response){
          callback(err, {success: true});
        }
      }
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {//не понимаю куда пихать айди???
    data.id = id;
    let xhr = createRequest({
      data: data, 
      method:'GET',
      url: this.URL,
      responseType: 'json',
      callback(err, response){
        if(response){
          callback(err, {response, success: true});
        }
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    const newData = Object.assign({ _method: 'DELETE'}, data);
    newData.id = id;
    let xhr = createRequest({
      data: newData, 
      method:'POST',
      url: this.URL,
      responseType: 'json',
      callback(err, response){
        if(response){
          callback(err, {success: true});
        }
      }
    });
  }
}