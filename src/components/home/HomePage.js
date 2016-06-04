import React, {PropTypes} from 'react';

class HomePage extends React.Component {
     constructor(props, context) {
        super(props, context);
     }
    componentDidMount() {
       
    }
     render() {
        return (
            <div>
                <h1> FishTracker </h1>
                <p> Testing fishtracker using react and redux</p>
            </div>
        );
    }  
}
HomePage.contextTypes = {
  router: PropTypes.object.isRequired  
};


export default (HomePage);