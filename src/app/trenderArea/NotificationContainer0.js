
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
* Module :  Notification
* Description : it is a component which helps to show notificaions on the basis of user clicks.
* Date:03-JUNE-2018.
* =============================================================================================================================================
 * 
 * #endregion
*/


/**library import section Begin*/
import React, { Component, Fragment } from 'react'
import { Tooltip,Notification } from '@progress/kendo-popups-react-wrapper';
/**library import section End*/

class NotificationContainer extends React.Component {

    // need to optimise in future release

        //  width = this.props.width;
        //  height = this.props.height;
        //  position = this.props.position;
        //  stacking = this.props.stacking;

         width = 381;
         height = 60;
         position = this.props.position;
         stacking = 'up';

       showPopUpNotification(message,notificationType) {
        this.popUpNotificationWidget.show(message,notificationType);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-2 example-col">
                    <Notification
                        widgetRef={(widget) => this.popUpNotificationWidget = widget}
                        width={this.width}
                        height={this.height}
                        stacking={this.stacking}/>
                </div>
            </div>
        );
    }
}

export default NotificationContainer