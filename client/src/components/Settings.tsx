import React from 'react'
import {AppSettings} from '../types';

export interface SettingsProps {
  settings: AppSettings,
  changeSettings: (obj: Object) => void;
}

const Settings: React.FC<SettingsProps> = ({settings, changeSettings}) => {

  return (
    <div></div>
  )
}

export default Settings