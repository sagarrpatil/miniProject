import React from "react";
import Header from "../CommonScreens/Header";
import Deleteicon from "../Assets/delete-icon.png"
import Editicon from "../Assets/iconEdit.png"
import white from "../Assets/white-bg.png"
import {  IconButton  } from "@material-ui/core";
import Donut from "react-donut";
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tableDate:null,
            showfirstScreen:true,
            pushvalue:"",
            flag:true,
            dataViewinPieChart:null,
            value :{    
                name: "",
                riskCategory: "",
                listOfSecurity:[],
                
            }
        }
    }
    componentDidMount() {
      this.showTableAPI()
    }
    showTableAPI=() => {
        axios.get("http://localhost:8080/api/tutorials").then(res=>{
            this.setState({tableDate: res.data})
        })
    }
    render(){
        return(<div>
            <Header />
            <div>
                {this.state.showfirstScreen?this.showTableView():this.showCreateUpdateView()}
            </div>
            
        </div>)
    };
    
    showTableView=() => {
        return(<div className="view-table">
            <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between'}}> 
                <div> 
                    <p>All Models</p>
                </div>
                <div> 
                    <button onClick={()=>this.setState({showfirstScreen:false})} style={{marginTop:12}}>Create</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Risk category</th>
                    <th>Action</th>
                </tr>
                { this.state.tableDate && this.state.tableDate.map((res)=>  <tr>
                    <td>{res.name}</td>
                    <td>{res.riskCategory}</td>
                    <td>
                        
                        <IconButton onClick={()=>this.DeleteData(res.id)}>
                            <img src={Deleteicon} />
                        </IconButton>
                        <IconButton>
                            <img src={Editicon}/>
                        </IconButton>
                    </td>
                </tr>)}
            </table>

        </div>)
    }
  
 
    showCreateUpdateView=() => {
        var total=0
        this.state.value.listOfSecurity.filter(res=>res.AssetAllocation).map((value, i)=>{
            total=total+value.AssetAllocation;
        })
        var dataViewinPieChart=[{ data: 100 }];
        this.state.value.listOfSecurity.filter(res=>res.AssetAllocation).map((value, i)=>{
            dataViewinPieChart.push({data:value.AssetAllocation})
            dataViewinPieChart[0].data= dataViewinPieChart[0].data-value.AssetAllocation
        })
        this.state.dataViewinPieChart=dataViewinPieChart;
        console.log(this.state.dataViewinPieChart)
        return(<div className="view-table">
            <form onSubmit={this.saveDate}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between'}}> 
                <div> 
                    <h3>Create/Update Model</h3>
                </div>
            </div>
            <div className="input-field-view">
                <div> 
                    <label for="username">Name</label><br/>
                    <input type="text" id="username" name="name" required  value={this.state.value.name} onChange={(e)=>this.setData(e.target.value, "name")}/>
                </div>
                <div> 
                    <label for="username">Risk category</label><br/>
                    <input type="text" id="username" name="username" required value={this.state.value.riskCategory} onChange={(e)=>this.setData(e.target.value, "riskCategory")}/>
                </div>
                <div style={{marginTop: "-90px", zIndex:-20}}> 
                    {this.state.flag && this.chartview()}
                <img src={white} style={{position:'relative', marginTop:-51}}/>
                <p style={{position:'absolute', marginTop:"-73vh", marginLeft:"129px"}}>{total}%</p>
                
                </div>
            </div>
            <div className="input-field-view marginTOP">
                <div> 
                    <label for="username">Add security to your model</label><br/><br/>
                    {/* <input type="text" id="username" name="name"/> */}
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top50}
                        value={this.state.pushvalue}
                        onChange={(e, newValue)=>this.setData(newValue, "pushintotheArray")}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="" />}
                        />
                </div>
                <div> 
                    <table style={{width:700, marginRight:82}}>
                    <tr>
                        <th style={{width:"39vw"}}>Name</th>
                        <th>Asset allocation</th>
                        
                    </tr>
                    { this.state.value.listOfSecurity && this.state.value.listOfSecurity.map((res, i)=> 
                    <tr>
                        <td>{res.company}</td>
                        <td>
                            <center>
                            <input type="text" id="username" name="name" value={res.AssetAllocation} onChange={(e)=>this.setDateFromTable(e.target.value, i)} className="inputpercentage" style={{width:100}}/>
                            </center></td>
                    </tr>)}
                    <tr> 
                            <td style={{textAlign:'right'}}>Total</td>
                            <td><center>
                                {this.state.value.listOfSecurity.length>0 ? total:0}%
                                
                                </center></td>
                    </tr>
                    
                    </table>
                </div>  
            </div>

            <div className="input-field-view bottom"> 
            <button style={{marginTop:12}} className="buttonCancel" onClick={()=>this.resetState()}>Cancel</button>
            <button style={{marginTop:12}} type="submit" className="buttonSave" >Save</button>
            </div>
            </form>
        </div>)
    }
    DeleteData=(id) => {
        axios.delete("http://localhost:8080/api/tutorials/"+id).then((response) => {
            this.showTableAPI()
        })
    }
    setData=(value, attr) => {
        if(attr=="name"){
            var data= this.state.value;
            data.name=value;
            this.setState({value: data})
        }
        if(attr=="riskCategory"){
            var data= this.state.value;
            data.riskCategory=value;
            this.setState({value: data})
        } 
        if(attr=="pushintotheArray"){
            if(value && value.label){
            var data= this.state.value;
            data.listOfSecurity.push({
                company:value.label,
            })
            this.setState({value: data})
            }
        }
    }
    setDateFromTable=(value, i)=>{
        let data= this.state.value;
        data.listOfSecurity[i].AssetAllocation=Number(value)
        console.log(data, i, value)
        
        this.setState({value: data},()=>{
            this.setState({flag:false}, ()=>this.setState({flag:true}))
        })
    }
    chartview=()=>{
        return(  <Donut
                chartData={
                    this.state.dataViewinPieChart
                }
                chartWidth={300}
                chartHeight={300}
                showChartLabel={false}
                title=""
                chartThemeConfig={{
                    series: {
                        colors: ["#c3c3c3","#b5e61d", "#00a2e8", "#ff7f27"]
                    }
                }}
            />)
    }
    saveDate=(e)=>{
        if(e)
        e.preventDefault();
        axios.post("http://localhost:8080/api/tutorials", this.state.value).then(res=>{
          this.resetState()
        })
    }
    resetState=()=>{
        this.showTableAPI();
        this.setState({showfirstScreen:true, 
            value :{    
                name: "",
                riskCategory: "",
                listOfSecurity:[],
                
            }
        })
    }
}

const top50 = [
    { label: 'TITAN', disp: "TITAN" },
    { label: 'POWERGRID', disp: "POWERGRID" },
    { label: 'NTPC', disp: "NTPC" },
    { label: 'ONGC', disp: "ONGC" },
    { label: 'GRASIM', disp: "GRASIM" },
    { label: 'TATACONSUM', disp: "TATACONSUM" },
   ]