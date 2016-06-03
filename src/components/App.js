import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
          <div className="container-fluid">
            {this.props.children}
          </div>  
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  
}
export default connect(mapStateToProps)(App);