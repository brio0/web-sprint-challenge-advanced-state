import * as types from './action-types'
import axios from 'axios'
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: types.MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() {
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer(index) {
  return {
    type: types.SET_SELECTED_ANSWER,
    payload: index
  }
}

export function setMessage() {
  return {
    type: types.SET_INFO_MESSAGE,
  }
}

export function setQuiz() {
  return {
    type: types.SET_QUIZ_INTO_STATE
  }
}

export function inputChange({ name, value }) {
  return {
    type: types.INPUT_CHANGE,
    payload: { name, value }

  }
}

export function resetForm() { }

const getURL = 'http://localhost:9000/api/quiz/next/'
// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({
      type: types.SET_QUIZ_INTO_STATE,
      payload: null
    })
    axios.get(getURL)
      .then(res => {
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data })
      })
      .catch(err => console.log({ err }))
  }
}
const postURL = 'http://localhost:9000/api/quiz/answer'
export function postAnswer(quiz) {
  return function (dispatch) {

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post(postURL, quiz)
      .then(res => {
        dispatch({
          type: types.SET_SELECTED_ANSWER,
          payload: null
        })
        dispatch({
          type: types.SET_INFO_MESSAGE,
          payload: res.data.message
        })
        dispatch(fetchQuiz())

      })
      .catch(err => { console.log(err) })



  }
}
const newURL = 'http://localhost:9000/api/quiz/new/'
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(newURL, newQuiz)
      .then(res => {
        dispatch({
          type: types.SET_INFO_MESSAGE,
          payload: `Congrats: "${res.data.question}" is a great question!`
        })
        dispatch({
          type: types.RESET_FORM,
        })
      })
      .catch(err => { console.log(err) })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
