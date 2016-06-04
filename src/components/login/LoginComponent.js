import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';


export class LoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: ""
        }
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.Login = this.Login.bind(this);
    }

    updateUsername(event) {
        
        return this.setState({ username: event.target.value });
    }
    updatePassword(event) {
        
        return this.setState({ password: event.target.value });
    }
    Login(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.actions.login(this.state.username, this.state.password).then((result) => {
            toastr.success("You are now logged in","Sucess");
        }).catch((err) => {
            toastr.error("Incorrect username or password", "Error");
        });
        
    }

    render() {
        return (
            <div>
                <h1> Login Form </h1>
                <form>
                    <input className="form-control" name="username" type="text" onChange={this.updateUsername} />
                    <br />
                    <br />
                    <input className="form-control"  name="password" type="password" onChange={this.updatePassword} />
                    <br />
                    <input className="btn btn-primary" type="submit" onClick={this.Login} value="Save" />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);