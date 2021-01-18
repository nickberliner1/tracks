import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import './grid.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: 'ID', field: 'id' },
                { headerName: 'Type of Goods', field: 'type_of_goods' },
                { headerName: 'CO2 Emitted', field: 'total_co2_emitted' },
                { headerName: 'Weight', field: 'weight' }
            ],
            rowData: []
        };
    }

    componentDidMount() {
        fetch(`https://raw.githubusercontent.com/nickberliner1/tracks-data/master/shipments-2.json`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }

    render() {

        const lightTheme = this.props.lightTheme;
        const rowData = this.state.rowData;
        const columnDefs = this.state.columnDefs;

        return (
            <div>
                <div className={`ag-theme-alpine${lightTheme ? '' : '-dark'}`}
                    style={{ height: '50vh', width: '60vw' }}
                >
                    <AgGridReact
                        lightTheme={lightTheme}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableSorting={true}
                        filter={true}
                        pagination={true}
                        paginationPageSize={10}
                    ></AgGridReact>

                </div>
            </div>
        )
    }
}

