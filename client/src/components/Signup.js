import React, { Component } from 'react'
import { Container, Box, Heading, Text, Button, TextField } from "gestalt"
import { setToken } from "../utils";
import ToastMessage from './ToastMessage'

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Signup extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: '',
    loading: false
  }


   handleChange = ({ event, value }) => {
     event.persist()
     this.setState({ [event.target.name]: value })
   }


   // SIGN UP A USER
   handleSubmit = async event => {
     event.preventDefault()
     const { username, email, password } = this.state

     if(this.isFormEmpty(this.state)){
       this.showToast('PLease fill in all fields')
       return
     }
    
     try {
       // set loading to true
       this.setState({ loading: true })
       // make request to register user with strapi
       const response = await strapi.register( username, email, password )
       // set loading to false
       this.setState({ loading: false })
       // put token to local storage
       setToken(response.jwt);
       // redirect user to home page
       this.redirectUser('/')
     } catch (err) {
       // set loading to false
       this.setState({ loading: false })
       // show error message with toast message
       this.showToast(err.message)
     }
   }

   // REDIRECT USER
   redirectUser = path => this.props.history.push(path)

    // SUBMIT THE FORM ONLY IF IT IS NOT EMPTY
   isFormEmpty = ({ username, email, password }) => {
      return !username || !email || !password
   }


   // WARNING MESSAGE
   showToast = toastMessage => {
     this.setState({ toast: true, toastMessage })
     setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 2000)
   }


  render() {
    const { toastMessage, toast, loading } = this.state

    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
             __style: {
               backgroundColor: '#ebe2da'
             }
          }}
           margin={4}
           padding={4}
           shape="rounded"
           display="flex"
           justifyContent='center'
          >

           {/* SIGN UP FORM */}
           <form style={{
             display: 'inlineBlock',
             textAlign: 'center',
             maxWidth: 450
           }}
           onSubmit={this.handleSubmit}
           >

           {/* SIGN UP FORM HEADING */}
           <Box 
             marginBottom={2}
             display="flex"
             direction="column"
             alignItems="center"
           >
            <Heading color="midnight">Let's Get Started</Heading>
            <Text italic color="orchid">Sign up to order some brews!</Text>
           </Box>

             {/* USER INPUTS */}
             <TextField
               id="username"
               type="text"
               name="username"
               placeholder="Username"
               onChange={this.handleChange}
             />
             <TextField
               id="email"
               type="email"
               name="email"
               placeholder="Email Address"
               onChange={this.handleChange}
             />
             <TextField
               id="password"
               type="password"
               name="password"
               placeholder="Password"
               onChange={this.handleChange}
             />
               <Button 
                 inline
                 disabled={loading}
                 color="blue"
                 text="Submit"
                 type="submit"
               />
           </form>
        </Box>
        {/* WARNING MESSAGE */}
        <ToastMessage 
           show={toast} 
           message={toastMessage} 
         />
      </Container>
    )
  }
}


export default Signup 