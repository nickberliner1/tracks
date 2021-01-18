import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import MyDatePicker from './MyDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


import './grid.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const endDate = new Date();
const startDate = new Date();
// Default start date is 10 weeks ago 
startDate.setDate(startDate.getMonth() - 70);

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
            rowData: [],
            startDate: startDate,
            endDate: endDate
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    componentDidMount() {
        // add js to start from and end date/ time, then make date picture set state of start and end
        fetch(`https://raw.githubusercontent.com/nickberliner1/tracks-data/master/shipments-2.json`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }

    defaultEndDate() {
        const date = new Date();
        date.setDate(date.getMonth() - 70);
        return date;
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        })
    }

    render() {

        const lightTheme = this.props.lightTheme;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const rowData = this.state.rowData;
        const columnDefs = this.state.columnDefs;

        return (
            <div>
                <div className={`ag-theme-alpine${lightTheme ? '' : '-dark'}`}
                    style={{ height: '50vh', width: '60vw' }}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label='Start Date'
                            value={startDate}
                            onChange={this.handleStartDateChange}
                            animateYearScrolling
                        />
                        <KeyboardDatePicker
                            label='End Date'
                            value={endDate}
                            onChange={this.handleEndDateChange}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                    <AgGridReact
                        lightTheme={lightTheme}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableSorting={true}
                        filter={true}
                        pagination={true}
                        paginationPageSize={10}
                        colResizeDefault='shift'
                    ></AgGridReact>

                </div>
            </div>
        )
    }
};
