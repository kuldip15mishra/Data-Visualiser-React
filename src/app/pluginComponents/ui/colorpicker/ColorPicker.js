
/*/#region Copyright(c) 2018 D-Driven All rights are reserved
* =============================================================================================================================================
* <copyright company="D-Driven">
* COPYRIGHT (c) 2018 D-Driven (P) Ltd.
* ALL RIGHTS ARE RESERVED. REPRODUCTION OR TRANSMISSION IN WHOLE OR IN PART,
* ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL OR OTHERWISE,
* WITHOUT THE PRIOR PERMISSION OF THE COPYRIGHT OWNER.
* </copyright>
* =============================================================================================================================================
* Created By :
* Module :
* Description : it is a component which helps to show notificaions on the basis of user clicks.
* Date:03-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/

/**library import section Begin*/
import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
/**library import section End*/

const ColorPicker = props => {
    const styles = reactCSS({
        'default': {
            color: {
                width: '20px',
                height: '20px',
                borderRadius: '2px',
                background: `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`,
            },
            swatch: {
                padding: '0px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });
    return (
        <div>
            <div style={styles.swatch} onClick={props.openColorPicker}>
                <div style={styles.color} />
            </div>
            {props.displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={props.closeColorPicker} />
                <SketchPicker color={props.colorCode} onChange={props.onSetColorCode} />
            </div> : null}
        </div>
    );
};

export default ColorPicker;
