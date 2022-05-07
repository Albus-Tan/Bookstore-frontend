let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: formData,
        credentials: "include"
    };

    console.log("postRequest_v2: ", url, data);

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("postRequest_v2 response data: ", data);
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    console.log("postRequest: ", url, json);

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("postRequest response data: ", data);
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};


let postRequestNoPara = (url, callback) => {

    let opts = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    console.log("postRequestNoPara: ", url);

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("postRequestNoPara response data: ", data);
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};



export {postRequest,postRequest_v2,postRequestNoPara};