import axios from 'axios';

let endPoint = 'https://api.iextrading.com/1.0';
let baseURL = 'https://api.iextrading.com/1.0';
let url = '';
let headers = {'Content-Type': "application/json"};

function make_server_request(server_call, params) {

    switch (server_call) {
      case "get_stock":
        url = `${endPoint}/tops/last?symbols=${params.stock}`;
        return get_function(url);
        break;
      case "post":
        url = `${endPoint}/post`;
        let post_data = {test: params.test}
        return post_function(url, headers, post_data);
        break;
     
    }
}

function get_function(url) {
  console.log(url)

let request =  axios({
      method: 'get',
      headers: headers,
      url: url,
      baseURL: baseURL
    })

  return request;
}

function post_function(url, headers, data) {
  console.log(url)

let request =  axios({
      method: 'post',
      headers: headers,
      url: url,
      data: data,
      baseURL: baseURL
    })

  return request;
}

export { make_server_request }