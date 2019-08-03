import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import Api from '../../services/api';
import styles from './addLocation.module.css';
import BoxLocation from '../../models/boxLocation';

type AddLocationProps = {

}

type AddLocationState = {
    latitude:string;
    longitude:string;
    siteName:string;
    operator:string;
    box:string;
    habitat:string;
    otherHabitat:string;
    boxes:Array<string>,
    operators:Array<string>,
    habitats:Array<string>
}

class AddLocationComponent extends Component<{}, AddLocationState> {

    constructor(props:AddLocationProps){
        super(props);
        this.state = {
            latitude:"",
            longitude:"",
            siteName:"",
            operator:"",
            box:"",
            habitat:"",
            otherHabitat:"",
            boxes : [],
            operators:[],
            habitats:[]
        };

        this.addBoxLocation = this.addBoxLocation.bind(this);
        this.handleChangeOperator = this.handleChangeOperator.bind(this);
        this.handleBoxChange = this.handleBoxChange.bind(this);
        this.handleHabitatChange = this.handleHabitatChange.bind(this);
        this.handlerOtherHabitatChange = this.handlerOtherHabitatChange.bind(this);
        this.handleSiteChange = this.handleSiteChange.bind(this);
        this.getBoxes = this.getBoxes.bind(this);
        this.getOperators = this.getOperators.bind(this);
        this.getHabitats = this.getHabitats.bind(this);
        this.getBoxes();
        this.getOperators();
        this.getHabitats();
    }

    async getBoxes(){
        const boxes = await Api.getBoxes();
        this.setState({boxes:boxes});
    }

    async getOperators(){
        const operators = await Api.getOperators();
        this.setState({operators:operators})
    }

    async getHabitats(){
        const habitats = await Api.getHabitat();
        this.setState({habitats:habitats});
    }

    addBoxLocation(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((res)=>{
                this.setState({latitude:res.coords.latitude.toString(), longitude:res.coords.longitude.toString()});
                let boxLocation:BoxLocation = {
                    id:null,
                    startDay:new Date(),
                    endDay:null,
                    latitude:this.state.latitude,
                    longitude:this.state.longitude,
                    siteName:this.state.siteName,
                    habitat1:this.state.habitat === 'autres' ? this.state.otherHabitat : this.state.habitat,
                    habitat2:null,
                    operatorId:this.state.operator,
                    boxId:this.state.box
                }
                Api.addNewLocation(boxLocation);
            });
            
        }
    }

    handleChangeOperator(evt:any){
        this.setState({
            operator : evt.target.value
        })
    }

    handleBoxChange(evt:any){
        this.setState({box : evt.target.value});
    }

    handleSiteChange(evt:any){
        this.setState({siteName : evt.target.value});
    }

    handleHabitatChange(evt:any){
        this.setState({habitat:evt.target.value});
    }

    handlerOtherHabitatChange(evt:any){
        this.setState({otherHabitat:evt.target.value});
    }

    render() {
        if(this.state.boxes.length === 0 || this.state.operators.length === 0 || this.state.habitats.length === 0)
            return(
                <div className="AppContent AddLocationPage">

                </div>
            );
        return(
            <div className="AppContent AddLocationPage">
                <InputLabel htmlFor="box">Box placed</InputLabel>
                <Select
                    value={this.state.box}
                    onChange={this.handleBoxChange}
                    inputProps={{
                        name: 'Box',
                        id: 'Box',
                    }}
                    className={styles.spacing}
                >
                    {
                        this.state.boxes.map(b => {return <MenuItem key={b} value={b}>{b}</MenuItem>;})
                    }
                </Select>                

                <InputLabel htmlFor="Op">Operator</InputLabel>
                <Select
                    value={this.state.operator}
                    onChange={this.handleChangeOperator}
                    inputProps={{
                        name: 'Op',
                        id: 'Op',
                    }}
                    className={styles.spacing}
                >
                    {
                        this.state.operators.map(o => {return <MenuItem key={o} value={o}>{o}</MenuItem>;})
                    }
                </Select>

                <InputLabel htmlFor="habitat">Habitat</InputLabel>
                <Select
                    value={this.state.habitat}
                    onChange={this.handleHabitatChange}
                    inputProps={{
                        name: 'habitat',
                        id: 'habitat',
                    }}
                    className={styles.spacing}
                >
                    {
                        this.state.habitats.map(h => {return <MenuItem key={h} value={h}>{h}</MenuItem>;})
                    }
                </Select>

                {this.state.habitat === 'autres' ? <div className={styles.spacing}><TextField id='habitat' label='Habitat' value={this.state.otherHabitat} onChange={this.handlerOtherHabitatChange}/></div> : null}
                <div className={styles.spacing}>
                    <TextField
                        id="siteName"
                        label="Site name"
                        value={this.state.siteName}
                        onChange={this.handleSiteChange} 
                    />
                </div>
                

                <Button onClick={()=>this.addBoxLocation()} variant="contained" color="primary">Add box location</Button>
            </div>
        );
    }
}

export default AddLocationComponent;