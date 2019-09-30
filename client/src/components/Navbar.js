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

    <NavLink to="/signin">
       <Text size = "xl" color="white">
         Sign In
       </Text>
    </NavLink>

    <NavLink to="/">
    <Box display="flex" alignItems="center">
      <Box margin={20} height={50} width={50}>
        <Image
          alt="Brandname Logo"
          naturalHeight={1}
          naturalWidth={1}
          src="../logo.svg"
        />
       </Box> 
       <Heading size = "xs" color="orange">
         BrewHaha
       </Heading>
      </Box>
    </NavLink>

    <NavLink to="/signup">
       <Text size = "xl" color="white">
         Sign Up
       </Text>
    </NavLink>
      
    </Box>
  )
}
