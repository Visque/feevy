const url = "http://localhost:5000/post";

export async function savePost(userPost){

    console.log("logging: ", userPost)


    let response = await fetch(`${url}`, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(userPost)
    })
    if(response.status == 200){
        console.log("yay its 200 :)")
        return response.json()
    }

    let saved = response.json()
    return saved
}

export async function getPosts(userId) {
  let response =  await fetch(`${url}?userId=${userId}`)
  let posts = await response.json()
  return posts
}