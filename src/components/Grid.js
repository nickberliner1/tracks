import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import './grid.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
        let dateAsString = cellValue;

        if ( dateAsString == null ) {
            return -1;
        }

        let getRidOfTime = dateAsString.split('T')[0];
        let dateParts = getRidOfTime.split('-');
        let cellDate = new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])
        );

        if ( filterLocalDateAtMidnight.getTime() === cellDate.getTime() ) {
            return 0;
        }

        if ( cellDate < filterLocalDateAtMidnight ) {
            return -1;
        }

        if ( cellDate > filterLocalDateAtMidnight ) {
            return 1;
        }
    },

    browserDatePicker: true

};

const endTime = new Date();
const startTime = new Date();
// Default start date is 10 weeks ago 
startTime.setDate(startTime.getMonth() - 70);



export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: 'Type of Goods', field: 'type_of_goods', sortable: true, filter: true },
                { headerName: 'CO2 Emitted', field: 'total_co2_emitted', sortable: true, filter: true },
                { headerName: 'Weight', field: 'weight', sortable: true, filter: true },
                { 
                    headerName: 'Date', 
                    field: 'start_time',
                    filter: 'agDateColumnFilter',
                    filterParams: filterParams, 
                    sortable: true
                }
            ],
            rowData: [],
            startTime: startTime,
            endTime: endTime,
            filtered: false,
            infoModalOpen: false
        };
    }

    componentDidMount() {
        fetch(`https://raw.githubusercontent.com/nickberliner1/tracks-data/master/shipments-2.json`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}));
    }

    render() {

        const lightTheme = this.props.lightTheme;
        const rowData = this.state.rowData;
        const columnDefs = this.state.columnDefs;

        return (
            <div>
                <div 
                    className={`ag-theme-alpine${lightTheme ? '' : '-dark'} grid-container`}
                >
                    <AgGridReact
                        lightTheme={lightTheme}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableSorting={true}
                        filter={true}
                        pagination={true}
                        paginationPageSize={10}
                        colResizeDefault='shift'
                        onGridReady={this.onGridReady}
                        onCellClicked={this.handleInfoModal}
                    ></AgGridReact>
                </div>
            </div>
        )
    }
};
