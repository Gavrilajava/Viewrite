import { Action } from "./types"

const initialState = () => {
  if (localStorage.settings){
    return {
      messages: [],
      settings: JSON.parse(localStorage.settings)
    }
  }
  else {
    return {
      messages: [],
      settings: {
        user: "Billy",
        darkTheme: true,
        clock24hours: false,
        sendByEnter: false
      }}
  }
}

export default function settingsReducer(state = initialState(), action: Action){

  switch(action.type){
      case "setSettings":
          localStorage.settings = JSON.stringify(action.settings)
          return action.settings
      default: 
          return state
  }

}