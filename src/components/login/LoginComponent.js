import React, {PropTypes} from 'react';
import fetch from 'isomorphic-fetch';
import toastr from 'toastr';


class LoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
       
        this.state = {
            username: "",
            password: ""
        };
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
        fetch('http://localhost:3005/public/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((result) => {
            return result.json();

        }).then((result) => {
            console.log(result);
            toastr.success("You are now logged in", "Success");
            this.props.login();
            localStorage.setItem('Token', result.token),
            this.context.router.push('/');
        }).catch(error => {
            throw (error);
        });

    }

    render() {
        return (
            <div>
                <form>
                    <div className="col-md-8 col-md-offset-2">
                    <h1> Login Form </h1>
                    <br />
                    <input className="form-control" name="username" type="text" onChange={this.updateUsername} />
                    <br />
                    <br />
                    <input className="form-control"  name="password" type="password" onChange={this.updatePassword} />
                    <br />
                    <input className="btn btn-primary" type="submit" onClick={this.Login} value="Login" />
                    </div>
                </form>
            </div>
        );
    }
}

LoginComponent.contextTypes = {
  router: PropTypes.object.isRequired  
};

export default (LoginComponent);