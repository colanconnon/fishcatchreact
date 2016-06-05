import React, {Component, PropTypes} from 'react';
import toastr from 'toastr';


class LogoutPage extends Component {

    constructor(props, context) {
        super(props, context);


    }


    componentWillMount() {
        this.props.logout();
        toastr.success("You are now logged out", "Logged out");
        this.context.router.push('/login');
    }


    render() {
        return (
            <div>
                Logout Page
            </div>
        );
    }
}
LogoutPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LogoutPage;