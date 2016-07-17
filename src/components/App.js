import React, {PropTypes, cloneElement} from 'react';
import Header from './common/Header';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loggedIn: false
        };
        if(localStorage.getItem("Token") !== null){
            this.state.loggedIn = true;
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login() {
        this.state.loggedIn = true;
    }
    logout() {
        localStorage.clear();
        this.state.loggedIn = false;
    }
    render() {
        //clone the element and and login and logout to it.
        let component = cloneElement(this.props.children, Object.assign({}, ...this.props.children.props, { login: this.login, logout: this.logout }));

        return (
            <span>
                <Header loggedIn={this.state.loggedIn} />
                <div style={{marginBottom: "60px"}}>
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