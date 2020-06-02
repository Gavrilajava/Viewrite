
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss';
import { ChatMessage, ChatState } from './types';
import { ChatContext } from './ChatContext';
import Chat from './components/Chat'
import Settings from './components/Settings'
import Navbar from './components/Navbar';

class App extends React.Component {

  static contextType = ChatContext;

  state: ChatState = {
      messages: [],
      settings: {
        user: "Billy",
        darkTheme: true,
        clock24hours: false,
        sendByEnter: false
      }
    }
 

  componentDidMount () {
    this.context.init();
    const observable = this.context.onMessage()
    observable.subscribe((m: ChatMessage) => {
      let messages = this.state.messages;
      messages.push(m);
      this.setState({ messages: messages });
    });
  }

  componentWillUnmount () {
    this.context.disconnect();
  }

  render () {
    const handleMessage = (input: string): void => {
      if (input !== '') {
        this.context.send({
          message: input,
          author: this.state.settings.user,
          sent: new Date()
        });
      }
    };

    const {settings} = this.state

    const changeSettings = (obj: Object) => {
      this.setState({...settings, obj})
    }

    return (
      <BrowserRouter>
        <div className = {settings.darkTheme ? "App bgrd-dark" : "App bgrd-light"}>
          <Navbar />
          <Switch>
            <Route exact path="/" render={(routerProps) => <Chat {...routerProps} messages = {this.state.messages} handleMessage = {handleMessage} settings = {settings}/>}/>
            <Route exact path="/settings" render={(routerProps) => <Settings {...routerProps} settings = {settings} changeSettings = {changeSettings}/> }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;