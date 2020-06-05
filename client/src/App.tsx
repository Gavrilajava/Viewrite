
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss';
import { ChatMessage, ChatState, AppSettings } from './types';
import {connect} from 'react-redux'
import { ChatContext } from './ChatContext';
import Chat from './components/Chat'
import Settings from './components/Settings'
import Navbar from './components/Navbar';

class App extends React.Component {

  static contextType = ChatContext;


    // let initialSettings
    // if (localStorage.settings){
    //   initialSettings =  JSON.parse(localStorage.settings)
    // }
    // else {
    //   initialSettings = props
    // }
    state = {
      messages: [],
      settings: {
        user: "Billy2",
        darkTheme: true,
        clock24hours: false,
        sendByEnter: false
      }
    }
  

  componentDidMount () {
    this.context.init();
    const observable = this.context.onMessage()
    observable.subscribe((m: ChatMessage) => {
      let messages: ChatMessage[] = this.state.messages;
      messages.push(m);
      this.setState({ messages: messages });
    });
    if (localStorage.settings){
      this.setState({settings: JSON.parse(localStorage.settings)})
    }
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

    const changeSettings = (settings: AppSettings) => {
      localStorage.settings = JSON.stringify(settings)
      this.setState({settings})
    }
    
    const {settings, messages} = this.state

    return (
      <BrowserRouter>
        <div className = {settings.darkTheme ? "App bgrd-dark" : "App bgrd-light"}>
          <Navbar />
          <Switch>
            <Route exact path="/" render={(routerProps) => <Chat {...routerProps} messages = {messages} handleMessage = {handleMessage} settings = {settings}/>}/>
            <Route exact path="/settings" render={(routerProps) => <Settings {...routerProps} settings = {settings} changeSettings = {changeSettings}/> }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: ChatState) => {
  return {state: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSettings: ((settings: AppSettings) => dispatch({type: "setSettings", settings: settings}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);



