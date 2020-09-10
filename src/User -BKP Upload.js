import React, { Component } from "react";
import axios from 'axios'; 

class User extends Component {
   constructor(props) {
      super(props);
        this.state = {
          selectedFile: null
        }
     
    }
   
      
      
    onChangeHandler=event=>{
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
      console.log(event.target.files[0]);
    }

    onClickHandler = () => {
      const data = new FormData()
      data.append('file', this.state.selectedFile);
      console.log(data);
      axios.post('http://localhost:4000/upload', data)
      .then(res => {
        console.log(res.data);
        console.log(res.data.filename);
        console.log(res.statusText);
      })
      
   }
      
      render() { 
      
      return ( 
         <div> 
            <h1> 
            GeeksforGeeks 
            </h1> 
            <h3> 
            File Upload using React! 
            </h3> 
            <div> 
            <input type="file" name="file" onChange={this.onChangeHandler}/>
            <button type="button" onClick={this.onClickHandler}>Upload</button> 
            </div> 
         </div> 
      ); 
      }
   
}
export default User;