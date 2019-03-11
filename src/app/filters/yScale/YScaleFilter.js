import React, { Component } from "react";

const YScaleFilter = (props) => {

  return (
    <div className=" filter-radio-btns mobile-none">
      <div className="img-radio">
       
        <label>

            <input type="checkbox" name="yScale"
              
              value="true" checked={props.option == 'enable'}
              onChange={props.YscaleChange} />

            <img src="src/assets/images/icons/yscale-separate.svg" />
            </label>

            

           

        
      </div>
      <span>Scale</span>
    </div>
  );
}

export default YScaleFilter;
