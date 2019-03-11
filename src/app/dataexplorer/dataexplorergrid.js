
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
* Module :  Add Series dump Component (presentaion Component)
* Description : it is a dump component which helps to add series into grid
* Date:01-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/
/**library import section Begin*/
import React from 'react'
import { ExcelExport } from "@progress/kendo-react-excel-export";
import {
    Grid,
    GridColumn as Column
  } from "@progress/kendo-react-grid";


export const DataExplorerGrid = (props) => {
  return (

    <ExcelExport

  >

    <Grid
      style={{ height: "62vh" }}
      rowHeight={40}
      data={props.data}
      pageSize={props.pageSize}
      total={props.total}
      skip={props.skip}
      pageable={true}
      take={props.take}
      onPageChange={props.onPageChange}
      cellRender={props.loadingCell}
    >

      <Column field="timestamp" title="DATE & TIME" />
      <Column field="value" title="VALUE" />
      <Column field="quality" title="QUALITY" />
    </Grid>
  </ExcelExport>

);
}
