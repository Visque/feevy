import fakeApi from "../utils/fakeApi"

const url = "http://localhost:5000/auth";

export async function saveUser(userObj){

    return await fakeApi(function (res, rej) {

        fetch(`${url}/user`, {
            method: 'POST',
            headers: {'Content-type': "application/json"},
            body: JSON.stringify(userObj)
        })
          .then((response) => {
              console.log("mssg: ", response.status);
              return response.json();
          })
          .then((data) => {
            res(data)
          });

    });

}

export async function signin(userObj){
    // console.log("check signin: ", `${url}/signin`);
    return await fakeApi(function(res, rej){

        fetch(`${url}/signin`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(userObj)
        })
        .then((response) => {
            return response.json();
        })
        .then(data => {
            res(data);
        })

        // console.log("yay signed in :)")
    })
}

export async function signout(userObj){

    return await fakeApi(function(res, rej){
        fetch(`${url}/signout`)
        .then(response => {
            if(response.status == 200){
                localStorage.setItem("token", "")
                return response.json()
            }
        })
        .then(data => {
            res(data)
        })
    })
}