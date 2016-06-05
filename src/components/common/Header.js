import React from 'react';
import { Link, IndexLink } from 'react-router';
class Header extends React.Component {
    render() {
        var navLinks;
        if(this.props.loggedIn){
            navLinks =   <ul className="nav navbar-nav">
                            <li>
                                <IndexLink to="/" activeClassName="active">Home </IndexLink>
                            </li>
                           <li>
                                <Link to="/fishcatch" activeClassName="active">Fish Catch</Link>
                            </li>
                            <li>
                                <Link to="/lakes" activeClassName="active">Lakes </Link>
                            </li>
                             <li>
                                <Link to="/logout" activeClassName="active">Logout </Link>
                            </li>
                        </ul>;
        } else {
             navLinks =   <ul className="nav navbar-nav">
                            <li>
                                <IndexLink to="/" activeClassName="active">Home </IndexLink>
                            </li>
                            <li>
                                <Link to="/login" activeClassName="active">Login </Link>
                            </li>
                            
                        </ul>;
        }
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">Fishtracker</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                      {navLinks}
                        
                    </div>
                </div>
            </nav>
        );
    }
}


export default Header; 