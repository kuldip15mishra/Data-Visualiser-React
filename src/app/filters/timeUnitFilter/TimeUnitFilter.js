import React, {Component} from 'react';

class TimeUnitFilter extends Component{
    render(){
        return(
            <div className="time-btns">
            <ul>
                <li><button className="time-filter-btn active">S</button></li>
                <li><button className="time-filter-btn">M</button></li>
                <li><button className="time-filter-btn">H</button></li>
                <li><button className="time-filter-btn">D</button></li>
                <li><button className="time-filter-btn">M</button></li>
            </ul>
            <span className="filter-name">Time Unit</span>
            </div>
        );
    }
}

export default TimeUnitFilter;