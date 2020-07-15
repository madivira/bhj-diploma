//const { response } = require("express");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    try {
        
        const urlStr = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;//преобразование для GET
        
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        if (options.method != 'GET') {//если отличный от GET
            xhr.open(options.method, options.url);
            formData.append('mail', options.data.mail);
            formData.append('password', options.data.password);

        } else {
            xhr.open(options.method, urlStr);
        };

        if (options.headers) {//если есть заголовки
            xhr.setRequestHeader(Object.keys(options.headers),options.headers[Object.keys(options.headers)]);
        };

        if(options.responseType) {//если есть тип
            xhr.responseType = options.responseType;
        };
        
        xhr.withCredentials = true;
        xhr.onload = options.callback(null, xhr.response);
        xhr.onerror = options.callback(xhr.status);
        /*function () {
            if (xhr.status === 200) {//если удачно
                console.log('super');
                options.callback;
            } else {//неудачно
                console.log('fail');
                options.callback(xhr.status);
            };
        });*/
        
        if(options.method == 'GET') {
            xhr.send()
        } else {
            xhr.send(formData);
        } 
    } catch (e) {
    };
};
