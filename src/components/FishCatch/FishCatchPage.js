import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';

class FishCatchPage extends Component {
    constructor(props) {
        super(props);
        this.Url = 'http://localhost:3005/api/fishcatch/getall';
        this.state = {
            allFishCatches: [],
            fishCatches: [],
            loading: false
        };
        
        this.search = this.search.bind(this);
    }

    componentDidMount() {
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
            this.setState({ fishCatches: result.fishCatches, allFishCatches: result.fishCatches, loading: false });
        }).catch(error => {
            this.setState({ loading: false });
            throw (error);
        });
    }
    search(event) {
        let searchString = event.target.value.toUpperCase();
        let fishCatches = this.state.allFishCatches;
        fishCatches = fishCatches.filter(x => x.lakename.toUpperCase().includes(searchString));

        this.setState({fishCatches: fishCatches});

    }
    render() {
        let fishCatches = this.state.fishCatches.map((fishcatch, index) => {
            console.log(index % 3);
            return (
                <div  key={fishcatch.id}>
                    {function () {
                        if (index % 3 == 0) {
                            return <div className="clearfix"></div>
                        }
                    }.call(this) }
                    <div className="col-md-4">
                        <div className="card">
                            <div className="content">
                                <h4>Lake Name: {fishcatch.lakename}</h4>
                                <p> Latitude: {fishcatch.latitude}</p>
                                <p> Longitude: {fishcatch.longitude} </p>
                            </div>
                            <div className="action">
                                <Link to={"/viewFishCatch/" + fishcatch.id}> View Details </Link>
                            </div>
                        </div>
                    </div>

                </div>
            );
        });
        return (
            <div>
                <h1> Your Fish Catches</h1>
                <br />
                <Link to="/newfishcatch" className="btn btn-primary" activeClassName="active">Create a new fish catch </Link>
                <br />
                <br />
                <br />
                <div className="form-group">
                    <label> Search: </label>
                    <input onChange={this.search} type="text" className="form-control" />
                </div>
                
                {fishCatches}
            </div>
        );
    }
}

export default FishCatchPage;