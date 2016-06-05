import React, {Component, PropTypes} from 'react';
import { Link} from 'react-router';
import fetch from 'isomorphic-fetch';
import toastr from 'toastr';


class NewLakePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lakename: "",
            saving: false
        };
        this.updateLakeState = this.updateLakeState.bind(this);
        this.newLakeClick = this.newLakeClick.bind(this);
    }
    
    updateLakeState(event) {
        return this.setState({lakename: event.target.value });
    }
    
    newLakeClick(e) {
        e.preventDefault();
        this.setState({saving: true});

        
         fetch('http://localhost:3005/api/lakes/newlake', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
            body: JSON.stringify({
                lakeName: this.state.lakename
            })
        }).then((result) => {
            return result.json();

        }).then(() => {
            toastr.success("New Lake Successfully inserted", "Success");
            this.setState({saving: false});
            this.context.router.push('/lakes');
        }).catch(error => {
            this.setState({saving: false});
            throw (error);
        });

    }
    
    render() {
        return (
            <div>
                <h1> New Lake Form </h1>
                <br />
                <Link to="/lakes" className="btn btn-primary" activeClassName="active">Back to lakes list </Link>
                <br />
                <br />
                <br />
                <form>
                    <div className="form-group">
                        <label> Lake Name </label>
                        <input style={{width: '50%'}} onChange={this.updateLakeState} className="form-control" type="text" />
                    </div>
                    <br />
                    <input type="submit" disabled={this.state.saving} onClick={this.newLakeClick} 
                           value={this.state.saving ? 'Saving...' : 'Save'} className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

NewLakePage.contextTypes = {
  router: PropTypes.object.isRequired  
};

export default NewLakePage;