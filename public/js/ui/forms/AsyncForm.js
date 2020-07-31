/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    try{
      this.element = element;
      this.registerEvents();
    
      if (!element) {//если элемент пуст
        throw new Error('Error');
      }
    } catch(e){
      console.log(e);
    }
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.onsubmit = (e) => {
      this.submit();
      e.preventDefault();
    };
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    
    const formData = new FormData(this.element);
    const entries = formData.entries();
    const object = new Object();
    for (let item of entries) {
     
      const value = item[ 1 ];
      object[item[ 0 ]] = value;
    }

    return object;
  }

  onSubmit( options ) {//пустой метод

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    //const data = this.getData();
    this.onSubmit(this.getData());
  }
}
