import JsonP from 'jsonp'
//import resolve from 'resolve'

export default class axios {
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
}
