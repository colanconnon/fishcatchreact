import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
          <span>
          <Header />
          <div className="container">
            {this.props.children}
          </div> 
          </span>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};


export default (App);