import React, {useState} from 'react';
import {ChatMessage, AppSettings} from '../types';
import '../App.scss';

export interface ChatProps {
  messages: ChatMessage[],
  handleMessage: (input: string) => void,
  settings: AppSettings
}

const Chat: React.FC<ChatProps> = ({messages, handleMessage, settings}) => {

  const [input, setInput] = useState<string>('')

  const handleClick = () => {
    handleMessage(input)
    setInput('')
  }

  return(
    <div  className = {settings.darkTheme? "chatbox chtDark" : "chatbox chtLight"}>
      {messages.map((msg: ChatMessage, index: number) => {
        return (
          <div className="messageContainer" key={msg.author + msg.sent}>
            {messages[index-1] && messages[index-1].author === msg.author ? null : <p>{msg.author}</p>}
            <div className = {settings.darkTheme? "message" : "message"}>{msg.message}</div>
            {messages[index+1] && messages[index+1].author === msg.author ?  null : <span>{msg.sent}</span>} 
          </div>
        );
      })}
      <div className="inputContainer">
        <input
          placeholder="Type your messsage here..."
          onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value)}
          value={input}
        />
        <button onClick={handleClick}/>
      </div>
    </div>
  )

}

export default Chat