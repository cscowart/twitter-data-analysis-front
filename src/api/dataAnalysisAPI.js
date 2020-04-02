const fetchUser = (handle) => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/api/validate_handle/${handle}`)
    .then((response) => response.json())
}
const fetchUserData = (handle) => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/api/handle_data/${handle}`)
  .then((response) => response.json())
}
const fetchBotScore = (handle) => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/api/handle_bot_score/${handle}`)
  .then((response) => response.json())
}
const fetchGraphicList = () => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/graphics/`)
  .then((response) => response.json())
}
const fetchGraphicListBySearch = (searchText) => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/graphics?search=${searchText}`)
  .then((response) => response.json())
}
const fetchGraphicByID = (graphicID) => {
  return fetch(`https://twitter-analysis-back-end.herokuapp.com/graphics/${graphicID}`)
  .then((response) => response.json())
}

const addGraphic = (GraphicObject) => {
  return fetch('https://twitter-analysis-back-end.herokuapp.com/graphics/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(GraphicObject)
  })
}

export default {
  fetchUser,
  fetchUserData,
  fetchBotScore,
  fetchGraphicList,
  fetchGraphicListBySearch,
  fetchGraphicByID,
  addGraphic,
}