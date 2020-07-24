/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
        
    const xhr = new XMLHttpRequest();
    const formData = new FormData();    
    let urlGET = options.url + "?";

    for ( let form in options.data) {
        console.log(form + " " + options.data[form]) ;
        formData.append(form, options.data[form]);
        urlGET +=`${form}=${options.data[form]}&`;//url для GET запроса
    }

    xhr.open(options.method, options.method == 'GET' ? urlGET.slice(0, -1) : options.url);
   
    if (options.headers) {//если есть заголовки
        for ( let header in options.headers) {
            console.log(header + options.headers[header]);
            xhr.setRequestHeader(header,options.headers[header]);
        }
    };

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(`response  = ${xhr.response}`);
                options.callback(null, xhr.response);
            } else {
                console.log(`err = ${xhr.status}`);
                options.callback(xhr.status, null);
            }
        };
    };

    options.method == 'GET' ? xhr.send() : xhr.send(formData);         
};