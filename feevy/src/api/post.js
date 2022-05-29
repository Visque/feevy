import fakeApi from "../utils/fakeApi";

const url = "http://localhost:5000/post";

export async function savePost(userPost){

    console.log("logging: ", userPost)

    return await fakeApi(function(res, rej){

        fetch(`${url}`, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(userPost)
        })
        .then(response => {
            if(response.status == 200){
                console.log("yay its 200 :)")
                return response.json()
            }
        })
        .then(data => {
            res(data)
        })
    })
}

export async function getPosts(userId){

    return await fakeApi(function(res, rej){

        fetch(`${url}?userId=${userId}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            res(data)
        })
    })
}