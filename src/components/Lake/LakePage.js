import React, {PropTypes} from 'react';
import fetch from 'isomorphic-fetch';


class LakePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.lakeUrl = 'http://localhost:3005/api/lakes/getlakes';
        this.state = {
            lakes: []
        };
        this.fetchLakes();
    }
    fetchLakes() {
        fetch(this.lakeUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            }
        }).then((result) => {
            return result.json();

        }).then((result) => {
            this.setState({ lakes: result.lakes });
        }).catch(error => {
            throw (error);
        });
    }
    render() {
        let lakes = this.state.lakes.map(lake => {
            return (
                <div key={lake.id} className="lake">
                    {lake.lakename}
                </div>
            );
        });
        return (
            <div>
                <h1> FishTracker </h1>
                <p> Lakes Page</p>
                {lakes}
            </div>
        );
    }
}

LakePage.contextTypes = {
    router: PropTypes.object.isRequired
};


export default (LakePage);