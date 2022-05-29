

export default function fakeApi(callback){
    return new Promise(function (res, rej){
        callback(res, rej);
    })
}