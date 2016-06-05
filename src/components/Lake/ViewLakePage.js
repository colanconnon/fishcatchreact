import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';


class ViewLagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lake: {},
            loading: false
        };
        this.lakeUrl = 'http://localhost:3005/api/lake/'+ props.params.id;
    }
    componentDidMount() {
        this.fetchLake();
    }
    
    fetchLake() {
        this.setState({loading: true});
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
            this.setState({ lake: result, loading: false });
        }).catch(error => {
            this.setState({loading: false});
            throw (error);
        });
    }
    render() {
        var htmlToDisplay;
        if(this.state.loading) {
            htmlToDisplay = ( 
                    
                    <span className="fa fa-spinner fa-spin fa-4x fa-fw" />           
                );
        } else  {
            htmlToDisplay = ( 
                <div>
                    <Link to="/lakes" className="btn btn-primary" activeClassName="active">Back to Lakes </Link>
                    <br />
                    <br />            
                    <h2> Lake Name: {this.state.lake.lakename} </h2>
                </div>
            );
        }
        return (
            <div>
                {htmlToDisplay}
           </div>
        );
    }
}

export default ViewLagePage;