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
  registerEvents() {
    let dismiss = document.querySelectorAll('button[data-dismiss="modal"]');
     for (let modal of dismiss) {
      modal.onclick = () => {
          this.onClose(modal);
      }
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
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
    this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = "";
  }
}
