import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';


class ViewLagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lake: {}
        };
        this.lakeUrl = 'http://localhost:3005/api/lake/'+ props.params.id;
        this.fetchLake();
    }
    fetchLake() {
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
            this.setState({ lake: result });
        }).catch(error => {
            throw (error);
        });
    }
    render() {
        return (
            <div>
                <Link to="/lakes" className="btn btn-primary" activeClassName="active">Back to Lakes </Link>
                <h2> Lake Name: {this.state.lake.lakename} </h2>
            </div>
        );
    }
}

export default ViewLagePage;