//const e = require("express");

/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
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
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {//wtf
   
   /* for (let modal of this.element) {
      modal.onclick = () => {
        if (modal.dataset.dismiss == 'modal'){
          this.onClose(this.element);
          console.log('click');
        }
      }
    }*/
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    console.log(e);
    e.addEventListener('click', this.close());
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() { //пока вопрос
    //.removeEventListener('click', this.close());
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    console.log(this.element);
    this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.removeAttibute("style");
  }
}
