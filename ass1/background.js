function check_input(input){
    let temp = false;
    let pattern = /<[\s\+]*script[\s\+]*(.*=.*)*[\s\+]*>[^]*<[\s\+]*\/[\s\+]*script[\s\+]*>/im;
    temp = pattern.test(input);
    // console.log(input, temp ? "wrong" : "correct");
    return temp;
}

function callback(details){
    let tempb = false;
    if (details.method == "GET"){
        let url = decodeURIComponent(details.url);
        // console.log(url);
        let index = url.indexOf('?');
        url = url.split('?');
        if (index != -1){
            const params = new URLSearchParams(url[1]);
            params.forEach(function(value, name) {
                // console.log("value", value);
                if (check_input(value)){
                    tempb = true;
                }
            });
            // var params = url[1].split('&');
            // for(var i = 0; i < params.length; i++){
            //     var temp = params[i].split('=');
            //     var name = temp[0];
            //     var value = temp[1];
            //     console.log("value", value);
            //     if (check_input(value)){
            //         tempb = true;
            //     }
            // }
            if(tempb){
                alert("Detected XSS attack, blocking...");
                return {cancel: true};
            }
        }
    }
    if (details.method == "POST"){
        let data = details.requestBody.formData;
        if(data){
            for (var [key, value] of Object.entries(data)){
                // console.log(key, value);
                if (check_input(value)){
                    tempb = true;
                }
            }
        }
        if(tempb){
            alert("Detected XSS attack, blocking...");
            return {cancel: true};
        }
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    callback,
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);