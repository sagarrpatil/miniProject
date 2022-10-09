import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem  } from "@material-ui/core";


 class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
           anchorEl:'',
           gymId: localStorage.getItem("userid"),
           gymName:'',
           sidebarOpen:false,
        }
    }
    onSetSidebarOpen=()=> {
        if(this.state.sidebarOpen === undefined || this.state.sidebarOpen === false)
        this.setState({ sidebarOpen: true })
        else
        this.setState({ sidebarOpen: false })
      }
    componentDidMount() {

    }
    render(){
        return( <div style={{margin:'-8px', zIndex:'1'}}>
            <AppBar position="fixed">
            <Toolbar style={{background:'white', color:'black'}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                   
                    >
                    <MenuIcon style={{fontSize:30}}/>
                </IconButton>
                <h3 style={{marginLeft:20}}>LOGO</h3> 
                
                <Typography variant="p" noWrap style={{zIndex:9999, marginLeft:20}} onClick={()=>this.props.history.push('/')}>
                <p>| PROJECT NAME</p>
                </Typography>
                <div className="iconcircle" >
                    
             </div>
             
            </Toolbar>
            </AppBar> 
        </div>)
    }

}
export default Header;