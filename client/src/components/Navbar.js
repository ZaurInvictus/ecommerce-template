import React from 'react'
import { Box, Text, Heading, Image } from 'gestalt'
import { NavLink } from  'react-router-dom'

export default function Navbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent='around'
      height={70}
      color="midnight"
      padding={1}
      shape="roundedBottom"
    >

    <NavLink to="/signin" activeClassName="active" >
       <Text size = "xl" color="white">
         Sign In
       </Text>
    </NavLink>

    <NavLink exact to="/" activeClassName="active" >
    <Box display="flex" alignItems="center">
      <Box margin={2} height={50} width={50}>
        <Image
          alt="Logo"
          naturalHeight={1}
          naturalWidth={1}
          src="../../public/icons/logo.svg"
        />
       </Box> 
       <Heading size = "xs" color="orange">
         BrandName
       </Heading>
      </Box>
    </NavLink>

    <NavLink to="/signup" activeClassName="active" >
       <Text size = "xl" color="white">
         Sign Up
       </Text>
    </NavLink>
      
    </Box>
  )
}
