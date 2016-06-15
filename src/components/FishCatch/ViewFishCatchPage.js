import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';


class FishCatchPage extends Component {
    constructor(props) {
        super(props);
        this.Url = 'http://localhost:3005/api/fishcatch/' + props.params.id;;

        this.state = {
            latitude: "",
            longitude: "",
            temperature: "",
            details: "",
            loading: false
        };
        this.fetchFishCatch = this.fetchFishCatch.bind(this);
    }

    componentDidMount() {
        this.fetchFishCatch();
    }


    fetchFishCatch() {
        this.setState({ loading: true });
        fetch(this.Url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            }
        }).then((result) => {
            return result.json();
        }).then((result) => {
            console.log(result);
            this.setState({
                latitude: result.latitude,
                longitude: result.longitude,
                temperature: result.temperature,
                details: result.details,
                lakename: result.lakename
            });
        }).catch(error => {
            this.setState({ loading: false });
            throw (error);
        });
    }

    render() {
       
        return (
            <div>
                <h1> Fish Catch</h1>
                <br />
                <Link to="/fishcatch" activeClassName="active" className="btn btn-primary">Back to Fish Catches</Link>
                <br />
                <br />
                <h3> <strong> Lake Name: </strong> {this.state.lakename} </h3>
                <br />
                <p><strong>Latitude: </strong>  {this.state.latitude} </p>
                <p><strong>Longitude: </strong>  {this.state.longitude} </p>
                <p><strong>Temperature: </strong>  {this.state.temperature}</p>
                <p><strong>Details: </strong> {this.state.details} </p>
                <Gmaps
                    width={'800px'}
                    height={'600px'}
                    lat={this.state.latitude}
                    lng={this.state.longitude}
                    zoom={13}
                    loadingMessage={'Loading'}
                    params={{ v: '3.exp', key: 'AIzaSyAVJy4mjex7GmYufoTVxV_xZ3y3fo3BWQk' }}
                    onClick={this.onMapClick}
                    >
                    <Marker
                        lat={this.state.latitude}
                        lng={this.state.longitude}
                    />
                </Gmaps>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default FishCatchPage;