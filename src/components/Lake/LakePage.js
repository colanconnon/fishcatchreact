import React, {PropTypes} from 'react';


class LakePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h1> FishTracker </h1>
                <p> Lakes Page</p>
            </div>
        );
    }
}

LakePage.contextTypes = {
    router: PropTypes.object.isRequired
};


export default (LakePage);