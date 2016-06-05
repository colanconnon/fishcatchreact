import React, {Component} from 'react';
import { Link} from 'react-router';

class NewLakePage extends Component {
    constructor(props) {
        super(props);
        
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
                        <input style={{width: '50%'}} className="form-control" type="text" />
                    </div>
                    <br />
                    <input type="button" className="btn btn-primary" value="save" />
                </form>
            </div>
        );
    }
}

export default NewLakePage;