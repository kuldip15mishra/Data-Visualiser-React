import React, { Component } from "react";
import { connect } from 'react-redux'
import * as addSeriesActions from '../addSeries/addSeriesActions';
import HttpClient from "../services/apiService";
import { apiURL } from "../constants/Constants";
import { Redirect } from 'react-router-dom';

const httpClient = new HttpClient();

class Header extends Component {
    state={
        logout: false,
        username:localStorage.getItem("username") 
    }
   onLogout = (e) => {
  

   
    
    var userID= localStorage.getItem("userID")
    var sessionID= localStorage.getItem("sessionID")
    var resource= localStorage.getItem("resource")
    var headers= {
        'user-id': userID,
        'session-id':sessionID,
        'app-id':resource
    }

  
        httpClient.get(apiURL.LOGOUT,headers)
        .then(response => {
            console.log(response)
            localStorage.removeItem("userID");
            localStorage.removeItem("username"); 
            this.setState({logout: true})
        })
        .catch(error => {
            console.log(error);
        });
    

        

    }

    render(){


        if(this.state.logout== true){
               
            return(
                <Redirect to="/login" />
            )
        }

        else{

        
        return (

        
             
            <header id="topnav">
             <div className="topbar-main">
                   <div className="container-fluid">
                 
                     <div className="logo">
                      
                         <a href="index.html" className="logo" style={{'marginLeft':'-14px'}}>
                             <img src="src/assets/images/unleash-logo.png" alt="" />
                             <span className="logo-title ml-3">
                             <img src="src/assets/images/trender-logo.svg" alt="" />
                         </span>
                             
                         </a>
                         {/*   */}
                     </div>
           
           
                     <div className="menu-extras topbar-custom">
           
                         <ul className="list-unstyled topbar-right-menu float-right mb-0">
                             <li className="dropdown notification-list">
                                 <a className="nav-link dropdown-toggle waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    
                                   <span className="mobile-none">Welcome, </span> <span className="mr-2 pro-user-name"> {this.state.username} </span>
                                     
                                    <img src="src/assets/images/user-avatar.png" alt="" className="rounded-circle" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    
                                    
           
                                     <a href="javascript:void(0);" className="dropdown-item notify-item" onClick={this.onLogout}>
                                         <i className="fi-power"  ></i> <span >Logout</span>
                                     </a>
           
                                 </div>
                             </li>
                             
                         </ul>
                     </div>
                    
           
                     <div className="clearfix"></div>
           
                 </div>
             </div>
            
           
           </header>
           
           
        );
        }
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
     
        newTrend: () => dispatch(addSeriesActions.resetStore())
      
    };
  };
  
  
  export default connect(
    null,
    mapDispatchToProps,
  )(Header)

