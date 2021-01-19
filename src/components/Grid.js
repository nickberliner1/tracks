import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import CarrierInfo from './CarrierInfo';
import GetDetailsButton from './GetDetailsButton';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


import './grid.css';
import './carrier-info.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { id } from 'date-fns/locale';

const endTime = new Date();
const startTime = new Date();
// Default start date is 10 weeks ago 
startTime.setDate(startTime.getMonth() - 70);

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
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
    },
    browserDatePicker: true,
    minValidYear: 2000,
  };
export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                // { headerName: 'ID', field: 'id' },
                { 
                    headerName: 'Type of Goods', 
                    field: 'type_of_goods',
                    cellRenderer: 'GetDetailsButton',
                    cellRenderer: function(params) {
                        return (
                            <div className="carrier-container">
                                <h1>{params.id}</h1>
                            </div>
                        )
                    }
                },
                { headerName: 'CO2 Emitted', field: 'total_co2_emitted' },
                { headerName: 'Weight', field: 'weight' },
                { 
                    headerName: 'Date', 
                    field: 'start_time',
                    filter: 'agDateColumnFilter',
                    filterParams: filterParams
                }
            ],
            rowData: [],
            // rowData: null,
            dateFilteredData: [],
            startTime: startTime,
            endTime: endTime,
            apiLoaded: false,
            filtered: false,
            infoModalOpen: false
        };
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleInfoModal = this.handleInfoModal.bind(this);
    }

    // onGridReady = (params) => {
    //     this.gridApi = params.api;
    //     this.gridColumnApi = params.columnApi;
    
    //     const httpRequest = new XMLHttpRequest();
    //     const updateData = (data) => {
    //       this.setState({ rowData: data });
    //     };
    
    //     httpRequest.open(
    //       'GET',
    //       `https://raw.githubusercontent.com/nickberliner1/tracks-data/master/shipments-2.json`
    //     );
    //     httpRequest.send();
    //     httpRequest.onreadystatechange = () => {
    //       if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //         updateData(JSON.parse(httpRequest.responseText));
    //       }
    //     };
    //   };

    componentDidMount() {
        // add js to start from and end date/ time, then make date picture set state of start and end
        fetch(`https://raw.githubusercontent.com/nickberliner1/tracks-data/master/shipments-2.json`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}));

        this.apiLoaded = !this.apiLoaded;
    }

    handleStartTimeChange(date) {
        this.setState({
            startTime: date
        })
        this.gridApi.onFilterChanged();

    }

    handleEndTimeChange(date) {
        this.setState({
            endTime: date
        })
        this.gridApi.onFilterChanged();
    }

    filterData() {
        const chosenDates = this.rowData.filter(function(item) {
            let date = new Date(item.start_date);
            return (date >= this.startTime && date <= this.endTime);
        })
        this.setState({
            dateFilteredData: chosenDates
        })
        this.filtered = !this.filtered;
    }

    isExternalFilterPresent = () => {
        if ( this.startTime.getTime() !== startTime.getTime() || 
            this.endTime.getTime() !== endTime.getTime() ) {
            return true;
        }
    }

    doesExternalFilterPass = (node) => {
        if ( node.start_time.getTime() > this.startTime.getTime() || 
            node.end_time.getTime() < this.endTime.getTime() ) {
                return true;
        } else {
            return false;
        }
        // switch (startTime) {
        //     case this.startTime:
        //         return node.start_time >= this.startTime;
        // }
        // switch (endTime) {
        //     case this.endTime:
        //         return node.end_time <= this.endTime;
        // }
    }

    handleInfoModal() {
        this.setState(prevState => ({
            infoModalOpen: !prevState.infoModalOpen
        }));
    }

    render() {

        const lightTheme = this.props.lightTheme;
        const startTime = this.state.startTime;
        const endTime = this.state.endTime;
        const rowData = this.state.rowData;
        const columnDefs = this.state.columnDefs;
        const infoModalOpen = this.state.infoModalOpen;

        return (
            <div>
                <div 
                    className={`ag-theme-alpine${lightTheme ? '' : '-dark'} grid-container`}
                >
                    {/* <MuiPickersUtilsProvider 
                        utils={DateFnsUtils}
                    >
                        <KeyboardDatePicker
                            label='Start Date'
                            value={startTime}
                            onChange={this.handleStartTimeChange}
                            animateYearScrolling
                        />
                        <KeyboardDatePicker
                            label='End Date'
                            value={endTime}
                            onChange={this.handleEndTimeChange}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
<button onClick={this.filterData}>filter</button> */}
                    {/* <div>
                    {rowData
                        // .filter(item =>
                        //     item.start_time >= startTime &&
                        //     item.end_time <= endTime)
                        .map(item => (
                            <div>{item.id}</div>
                        ))        
                    }
                    </div> */}
                        
                    {/* { !this.state.infoModalOpen ? null :
                    
                    <>
                        <button onClick={this.handleInfoModal}>Close</button>
                        <br />
                        <CarrierInfo /> 
                    </>
                    // <h1>HI</h1>
                    } */}
                    
                    
                    
                    {/* <CarrierInfo /> */}
                    {/* <div
                        style={{
                            zIndex: 2,
                            backgroundColor: `${this.state.infoModalOpen ? 'rgba(0,0,0,0.5)' : 'none' }` 
                        }}
                    > */}
                        <AgGridReact
                            lightTheme={lightTheme}
                            // rowData={this.state.dateFilteredData}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            enableSorting={true}
                            filter={true}
                            pagination={true}
                            paginationPageSize={10}
                            colResizeDefault='shift'
                            onGridReady={this.onGridReady}
                            onCellClicked={this.handleInfoModal}
                            // isExternalFilterPresent={this.isExternalFilterPresent}
                            // doesExternalFilterPass={this.doesExternalFilterPass}
                        ></AgGridReact>
                    {/* </div> */}
                </div>
            </div>
        )
    }
};


function CarrierInfo(props) {
    return (
        <div className="carrier-container">
            
            <h1>{props.weight}</h1>
        </div>
    )
}