const url = "http://localhost:5000/comment";

export async function saveComment(userComment) {
  console.log("logging comment: ", userComment);

  let response = await fetch(`${url}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userComment),
  });

  if (response.status == 200) {
    console.log("yay its 200 :)");
    return response.json();
  }

  let saved = response.json();
  return saved;
}

export async function getComment(feedId) {
  let response = await fetch(`${url}?feedId=${feedId}`);
  let comments = await response.json();
  return comments;
}
