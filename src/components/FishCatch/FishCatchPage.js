import React, {Component, PropTypes} from 'react';
import fetch from 'isomorphic-fetch';
import {Promise} from 'es6-promise';
import { Link } from 'react-router';
import moment from 'moment';

class FishCatchPage extends Component {
    constructor(props) {
        super(props);
        this.lakeUrl = 'http://localhost:3005/api/lakes/getlakes';
        this.Url = 'http://localhost:3005/api/fishcatch/getall';
        this.state = {
            allFishCatches: [],
            fishCatches: [],
            loading: false,
            lakes: [],
            lake_id: null,
            month: null
        };
        this.search = this.search.bind(this);
        this.lakeSearch = this.lakeSearch.bind(this);
        this.displayResults = this.displayResults.bind(this);
        this.loadData = this.loadData.bind(this);

    }


    componentDidMount() {
        var params = this.props.location.query;
        if (params.lake_id != null) {
            this.setState({ month: params.month, lake_id: params.lake_id })
        }
        this.loadData();
    }
    componentWillReceiveProps(nextProps) {
        var params = nextProps.location.query;
        this.setState({ month: params.month, lake_id: params.lake_id }, this.displayResults);

    }

    loadData() {
        var promise1 = new Promise((resolve, reject) => {
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
                resolve(result);
            }).catch(error => {
                this.setState({ loading: false });
                throw (error);
            });
        });

        var promise2 = new Promise((resolve, reject) => {
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
                resolve(result);
            }).catch(error => {
                throw (error);
            })
        });

        Promise.all([promise1, promise2]).then(values => {
            this.setState({ allFishCatches: values[0].fishCatches, fishCatches: values[0].fishCatches, lakes: values[1].lakes }, this.displayResults);
        }, function (reason) {
            console.log(reason)
        });
    }

    lakeSearch(event) {
        if (event.target.value != 'null') {
            this.context.router.push({ pathname: 'fishcatch', query: { month: this.props.location.query.month, lake_id: event.target.value } });
        }
    }
    displayResults() {
        let fishCatches = this.state.allFishCatches;

        if (this.state.lake_id != null) {
            fishCatches = fishCatches.filter(x => {
                return x.lake_id == this.state.lake_id
            });
            if (this.state.month != null) {
                fishCatches = fishCatches.filter(x => {
                    if (x.date_caught != 'null') {
                        return moment(x.date_caught).month() == this.state.month;
                    } else {
                        return x;
                    }
                });
            }
        } else if (this.state.month != null) {
            fishCatches = fishCatches.filter(x => {
                console.log(x.date_caught);
                if (x.date_caught != null) {
                    return moment(x.date_caught).month() == this.state.month;
                }
            });
        }
        this.setState({ fishCatches: fishCatches });
    }
    search(event) {
        if (event.target.value != 'null') {
            this.context.router.push({ pathname: 'fishcatch', query: { month: event.target.value, lake_id: this.props.location.query.lake_id } });
        }
    }
    render() {
        const selectOptions = this.state.lakes.map(lake => {
            return <option key={lake.id} value={lake.id}> {lake.lakename} </option>;
        });
        const fishCatches = this.state.fishCatches.map((fishcatch, index) => {
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
                <div className="container">
                    <h1> Your Fish Catches</h1>
                    <br />
                    <Link to="/newfishcatch" className="btn btn-primary" activeClassName="active">Create a new fish catch </Link>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="container-fluid">
                    <div className="col-md-2">
                        <div className="form-group">
                            <label> Select Lake: </label>
                            <select onChange={this.lakeSearch} className="form-control">
                                <option value="null">--- Select Lake---</option>
                                {selectOptions}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Month: </label>
                            <select onChange={this.search} className="form-control">
                                <option value="null">--- Select Month--- </option>
                                <option value="0">Januarary</option>
                                <option value="1">Feburary</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-10">
                        {fishCatches}
                    </div>
                </div>
            </div>
        );
    }
}
FishCatchPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default FishCatchPage;