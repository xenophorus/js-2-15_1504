function getData(reqUrl) {
     return new Promise((res, rej) => {
        let req = new XMLHttpRequest(); //если не считаем IE
        req.open('GET', reqUrl, true); 
                
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    res(JSON.parse(req.responseText));
                } else {
                    rej('error');
                }
            }
        };
        req.send(); 
    }) 
}

export default function exec(rUrl) {
    getData(rUrl)
        .then(data => {
            console.log(data);
            console.log("exec completed");
            return data;
        })
        .catch(err => {
            console.log(err);
        })
}
