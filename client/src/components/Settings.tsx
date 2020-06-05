import React, {useState} from 'react'
import {AppSettings} from '../types';

export interface SettingsProps {
  settings: AppSettings,
  changeSettings: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({settings, changeSettings}) => {



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let {name, value, type, checked} = e.target
    changeSettings({...settings, [name]: type === "checkbox" ? checked : value})
  }
  

  return (
    <div className = {settings.darkTheme? "chatbox chtDark" : "chatbox chtLight"}>
      <label>Username</label>
      <input className="settingsInput"  type="text" name="user" defaultValue={settings.user} onChange={handleChange}/>
      <input className="checkBox" type="checkbox" name="darkTheme" defaultChecked = {settings.darkTheme} onChange={handleChange}/>
      <label htmlFor="theme">Theme</label><br/>
      <input className="checkBox" type="checkbox" name="clock24hours" defaultChecked = {settings.clock24hours} onChange={handleChange}/>
      <label htmlFor="theme">Time format</label><br/>
    </div>
  )
}

export default Settings