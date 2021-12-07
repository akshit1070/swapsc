import React, {Component} from 'react';
class Navbar extends Component{
 

    render(){
      
        return (
            <div>
              <nav className="navbar navbar-light bg-dark fixed-top  flex-md-nowrap p-0 shadow">
              <ul className="navbar-nav px-3">
                 <div  className="text-secondary">
                  Exchange Here
                  </div>
                  </ul>
                  <ul className="navbar-nav px-3">
                 <small className="text-secondary">
                  <small id="account">{this.props.account}</small>
                  </small>
                  </ul>
              </nav>
            </div>
          );
    }

}
export default Navbar;
