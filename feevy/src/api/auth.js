const url = "http://localhost:5000/auth";

export async function saveUser(userObj){

    let response = await fetch(`${url}/user`, {
        method: 'POST',
        headers: {'Content-type': "application/json"},
        body: JSON.stringify(userObj)
    })
    // console.log("mssg: ", response.status);
    let data = await response.json()
    return data;

}

export async function signin(userObj){

    let response = await fetch(`${url}/signin`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(userObj)
    })

    let data = await response.json()
    return data
    
}

export async function signout(userObj){

    let response = await fetch(`${url}/signout`)
    
    let data = await response.json()
    
    if(response.status == 200){
        localStorage.setItem("token", "")
        return data
    }
    else{
        return data
    }
    
    // return await fakeApi(function(res, rej){
        // .then(response => {
        //     if(response.status == 200){
        //         localStorage.setItem("token", "")
        //         return response.json()
        //     }
        // })
        // .then(data => {
        //     res(data)
        // })
    // })
}