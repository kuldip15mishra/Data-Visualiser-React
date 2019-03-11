import React, { Component } from 'react';

class PlotSplitFilter extends Component {
    render() {
        return (
            <div className=" filter-radio-btns mobile-none">

                <div className="img-radio">
                  
                    <label>
                        <input type="checkbox" name="plotSplit"
                          
                            value="true" checked={this.props.option == 'enable'}
                            onClick={this.props.plotSplitChange} />
                        <img src="src/assets/images/icons/PlotSplit2.svg" />
                    </label>
           
                    
                </div>
                <span>Lanes</span>
            </div>

        );
    }
}

export default PlotSplitFilter;
