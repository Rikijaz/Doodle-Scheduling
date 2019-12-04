import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FiberNewOutlinedIcon from '@material-ui/icons/FiberNewOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'



export default class Notifcations extends Component {
    
    getMessage = () =>{
        const {data} = this.props
        if(data.typeOf === 1){
            return "You've been invited to " + data.eventTitle +  "!"
        } else if(data.typeOf === 2){
            return data.eventTitle  +  " has been deleted!"
        }
        else if(data.typeOf === 3){
            return data.eventTitle + " has been changed by the owner!"
        }
        else{
            console.log("Error, should not appear!")
            return "typeOf returned bad"
        }
    }
    render() {
    
      let New = !this.props.data.seen ? <FiberNewOutlinedIcon/> : null
    return (
      <div>
        <Paper>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
                {New}
              <Typography>{this.getMessage()}</Typography>
                <IconButton aria-label="delete" onClick = {() => this.props.handleDelete(this.props.data.id) }> 
                  <DeleteIcon/>
                </IconButton>

            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
