import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

class ViewLakePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lake: {},
            markers: [],
            loading: false
        };
        this.lakeUrl = 'http://localhost:3005/api/lake/' + props.params.id;
        this.Url = 'http://localhost:3005/api/fishcatch/getall';
        this.coords = {
            lat: 38.22091976683121,
            lng: -86.748046875
        };

        

    }
    componentDidMount() {
        this.fetchLake();
        this.fetchFishCatches();
    }
    fetchFishCatches() {
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
            result.fishCatches = result.fishCatches.filter(x => x.lake_id == this.state.lake.id);
            result.fishCatches.forEach(fishCatch => {
                let mark = this.state.markers;
                mark.push({ latitude: fishCatch.latitude, 
                    longitude: fishCatch.longitude });
                this.setState({markers: mark});
            });            
        }).catch(error => {
            this.setState({ loading: false });
            throw (error);
        });
    }

    fetchLake() {
        this.setState({ loading: true });
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
            this.setState({ loading: false });
            throw (error);
        });
    }
    render() {
        var htmlToDisplay;
        const markers = this.state.markers.map(mapItem => {
            return <Marker key={mapItem.latitude}
                lat={mapItem.latitude}
                lng={mapItem.longitude}
                />;
        });
        if (this.state.loading) {
            htmlToDisplay = (

                <span className="fa fa-spinner fa-spin fa-4x fa-fw" />
            );
        } else {
            htmlToDisplay = (
                <div>
                    <Link to="/lakes" className="btn btn-primary" activeClassName="active">Back to Lakes </Link>
                    <br />
                    <br />
                    <h2> Lake Name: {this.state.lake.lakename} </h2>
                    <br />
                    <Gmaps
                        width={'800px'}
                        height={'600px'}
                        lat={this.coords.lat}
                        lng={this.coords.lng}
                        zoom={5}
                        loadingMessage={'Loading'}
                        params={{ v: '3.exp', key: 'AIzaSyAVJy4mjex7GmYufoTVxV_xZ3y3fo3BWQk' }}
                        >
                        {markers}
                    </Gmaps>
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

export default ViewLakePage;