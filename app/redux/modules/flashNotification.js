
const SHOW_FLASH_NOTIFICATION = "SHOW_FLASH_NOTIFICATION"
const HIDE_FLASH_NOTIFICATION = "HIDE_FLASH_NOTIFICATION"

export function showFlashNotification({text, permenant = false, location = 'top'}){
  return{
    type: SHOW_FLASH_NOTIFICATION,
    text,
    permenant,
    location,
  }
}


export function hideFlashNotification(){
  return{
    type: HIDE_FLASH_NOTIFICATION,
  }
}


const initialState = {
  showFlashNotification : false,
  text: '',
  permenant: false,
  location: 'top',
}

export default function flashNotification(state = initialState, action){
  switch( action.type){
    case SHOW_FLASH_NOTIFICATION:
      return{
        showFlashNotification: true,
        text: action.text,
        permenant: action.permenant,
        location: action.location,
      }
    case HIDE_FLASH_NOTIFICATION:
      return initialState
    default:
      return state
  }
}
