import React, {Component} from 'react';
import {Gmaps, Marker} from 'react-gmaps';
import fetch from 'isomorphic-fetch';
import toastr from 'toastr';


class NewFishCatchPage extends Component {
    constructor(props) {
        super(props);
        this.lakeUrl = 'http://localhost:3005/api/lakes/getlakes';
    
        this.state = {
            latitude: "",
            longitude: "",
            temperature: "",
            details: "",
            lakeId: "",
            markers: [],
            lakes: []
        };
        this.coords = {
            lat: 38.22091976683121,
            lng: -86.748046875
        };
        this.onMapClick = this.onMapClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    onMapClick(event) {
        this.setState({latitude: event.latLng.lat(), longitude: event.latLng.lng(), 
            markers: [{latitude: event.latLng.lat(), longitude: event.latLng.lng() }] });
    }
    componentDidMount() {
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
    handleSave() {
        toastr.success("You have saved the fish catch in the database","Success");
    }

    render() {
         const selectOptions = this.state.lakes.map(lake => {
            return <option value={lake.id}> {lake.lakename} </option>;
            
        });
        const markers = this.state.markers.map(mapItem => {
            return  <Marker
          lat={mapItem.latitude}
          lng={mapItem.longitude}
          />;
        });
        return (
            <div>
                <h1> New Fish Catch </h1>
                <h4> Click on map to select location of the catch </h4>
                <br />
                <Gmaps
                    width={'800px'}
                    height={'600px'}
                    lat={this.coords.lat}
                    lng={this.coords.lng}
                    zoom={5}
                    loadingMessage={'Loading'}
                    params={{ v: '3.exp', key: 'AIzaSyAVJy4mjex7GmYufoTVxV_xZ3y3fo3BWQk' }}
                    onClick={this.onMapClick}
                    >
                    {markers}
                </Gmaps>
                <br />
                <br />
                <div className="form-group">
                    <label> Latitude </label>
                    <input className="form-control"
                        value={this.state.latitude}
                        onChange={(event) => { this.setState({ latitude: event.target.value }) } }
                        type="number" />
                </div>
                <div className="form-group">
                    <label>Longitude </label>
                    <input className="form-control"
                        value={this.state.longitude}
                        onChange={(event) => { this.setState({ longitude: event.target.value }) } }
                        type="text" />
                </div>
                <div className="form-group">
                    <label>Temperature</label>
                    <input className="form-control"
                        value={this.state.temperature}
                        onChange={(event) => { this.setState({ temperature: event.target.value }) } }
                        type="text"
                        />
                </div>
                <div className="form-group">
                    <label> Select Lake </label>
                    <select value={this.state.lakeId} onChange={(event) => {this.setState({lakeId: event.target.value })}} className="form-control">
                        <option value=""> Select a lake </option>
                        {selectOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label>Details </label>
                    <textarea
                        className="form-control"
                        value={this.state.details}
                        onChange={(event) => { this.setState({ details: event.target.value }) } }
                        rows="10"
                        >
                    </textarea>
                </div>
                <br />
                <input type="button" className="btn btn-primary btn-lg" onClick={this.handleSave} value="Save" />
                <br />
                <br />
            </div>
        );
    }
}

export default NewFishCatchPage;