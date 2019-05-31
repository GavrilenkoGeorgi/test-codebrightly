import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_COMMENTS_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

// get one comment by its id
export async function getComment (Id) {
  const response = await http.get(Id)
  if (response.status === 200) {
    let comment = {
      commentTitle: response.data.title,
      commentBody: response.data.body
    }
    return comment
  } else {
    console.log(`Can't get comment.`)
  }
}

// get all comments
export async function getAllComments () {
  const response = await http.get()
  if (response.status === 200) {
    return response.data
  } else {
    console.log(`Can't get all comments.`)
  }
}

// delete comment
export async function deleteComment (Id) {
  const response = await http.delete(Id)
  if (response.status === 200) {
    return true
  } else {
    console.log(`Can't delete comment.`)
  }
}

// send comment
export async function sendComment (comment) {
  const response = await http.post(axios.baseURL, comment)
  if (response.status === 201) {
    return response.data
  } else {
    console.log(`Can't send comment.`)
  }
}

// update comment
export async function updateComment (comment) {
  const response = await http.put(comment.id, comment)
  if (response.status === 200) {
    return response.data
  } else {
    console.log(`Can't update your comment.`)
  }
}
