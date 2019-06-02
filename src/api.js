import axios from 'axios'

const http = axios.create({
  url: process.env.VUE_APP_COMMENTS_URL,
  baseURL: process.env.VUE_APP_COMMENTS_URL,
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' }
})

// Add a response interceptor
http.interceptors.response.use(response => {
  // Do something with response data
  return response
}, error => {
  // Do something with response error
  if (error.response) {
    // The request was made and the server
    // responded with a status code
    // that falls out of the range of 2xx
    console.error(error)
  } else if (error.request) {
    // The request was made but no response
    // was received `error.request` is an instance
    // of XMLHttpRequest in the browser and an
    // instance of http.ClientRequest in node.js
    console.error(error.request)
  } else {
    // Something happened in setting up the
    // request that triggered an Error
    console.log(`Error ${error.message}`)
  }
  return Promise.reject(error)
})

// get one comment by its id
export async function getComment (id) {
  try {
    const response = await http.get(id)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// get all comments
export async function getAllComments () {
  try {
    const response = await http.get()
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// delete comment
export async function deleteComment (id) {
  try {
    await http.delete(id)
    return true
  } catch (error) {
    console.error(error)
  }
}

// send comment
export async function sendComment (comment) {
  try {
    const response = await http.post(http.url, comment)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// update comment
export async function updateComment (comment) {
  try {
    const response = await http.put(comment.id, comment)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
