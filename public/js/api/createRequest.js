/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
        
    const xhr = new XMLHttpRequest();
    const formData = new FormData();    
    let urlGET = options.url + "?";
    console.log(options);
    for ( let form in options.data) {
        for(let data in options.data[form]) {
            formData.append(data,options.data[form][data]);
            urlGET +=`${data}=${options.data[form][data]}&`;
        }

        /*console.log(form + " " + options.data[form]) ;
        console.log(form);
        console.log(options.data[form]);
        console.log(options.data);
        formData.append(options.data, options.data[form]);*/
       // urlGET +=`${form}=${options.data[form]}&`;//url для GET запроса
        console.log(urlGET);
    }

    xhr.open(options.method, options.method == 'GET' ? urlGET.slice(0, -1) : options.url);
   
    if (options.headers) {//если есть заголовки
        for ( let header in options.headers) {
            xhr.setRequestHeader(header,options.headers[header]);
        }
    };

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response)
                options.callback(null, xhr.response);
            } else {
                options.callback(xhr.status, null);
            }
        };
    };

    options.method == 'GET' ? xhr.send() : xhr.send(formData);         
};