import React, {PropTypes, cloneElement} from 'react';
import Header from './common/Header';

class App extends React.Component {
     constructor(props, context) {
        super(props, context);
       
        this.state = {
            loggedIn: false
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login(){
       this.state.loggedIn = true;
    }
    logout() {
        this.state.loggedIn = false;
    }
    render() {        
        let component = cloneElement(this.props.children, Object.assign({}, ...this.props.children.props, {login: this.login, logout: this.logout} ));
       
        return (
          <span>
          <Header loggedIn={this.state.loggedIn} />
          <div className="container">
            {component}
          </div> 
          </span>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};


export default (App);