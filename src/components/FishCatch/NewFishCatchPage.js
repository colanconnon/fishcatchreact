import React, {Component} from 'react';

class NewFishCatchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: "",
            longitude: ""
        };
    }
    
    render() {
        return (
            <div>
                <h1> New Fish Catch </h1>

                <div className="form-group">
                    <label> Latitude </label>
                    <input className="form-control" 
                    value={this.state.latitude} 
                    onChange={(event) => {this.setState({latitude: parseFloat(event.target.value)})}} 
                    type="number" />
                </div>
                <div className="form-group">
                    <label>Longitude </label>
                    <input className="form-control"
                    value={this.state.longitude}
                    onChange={(event) => {this.setState({longitude: parseFloat(event.target.value)})}}
                    type="number" />
                </div>
                    <br />
                    <input type="button" className="btn btn-primary" onClick={() => {console.log(this.state)}} value="Save" />
            </div>
        );
    }
}

export default NewFishCatchPage;