import React from 'react';
import { PacmanLoader } from 'react-spinners';
import {Box} from 'gestalt';

const Loader = ({show}) => (
    show && <Box
            position="fixed"
            dangerouslySetInlineStyle={{
            
                __style: {
                    bottom: 300,
                    left: '50%',
                    transform: "translateX(-50%)"
                }
           
            }}>
            <PacmanLoader size={25} margin="5px" color="darkorange" />
        </Box>

   
);

export default Loader;