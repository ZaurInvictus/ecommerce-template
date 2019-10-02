import React, { Component } from 'react';
import { Container, Icon, SearchField, Text, Box, Heading, Card, Image } from 'gestalt';
import '../index.css';
import Strapi from 'strapi-sdk-javascript/build/main'; 
import { Link } from "react-router-dom";
import Loader from './Loader';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);


class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true
  }
  async componentDidMount(){
    try{
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: 
          `query{
           brands {
             _id
             name
             description
             image{
               url
             }
           }
         }`
        }   
     })
     this.setState({
       brands: response.data.brands, loadingBrands: false
     })
    }catch(err){
      console.log(err)
      this.setState({
        loadingBrands: false
      })
    }

  }

  handleChange = ({ value }) => {
      this.setState({ searchTerm: value })
  }

  filteredBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand => {
      return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  render() {
    
    const {loadingBrands, searchTerm} = this.state;

    console.log('BRANDS:', this.state.brands)

    return (
      <Container >
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            value={searchTerm} // to use state as a single source of truth
            placeholder="Search Brands"
            
          />
          <Box margin={3}>
            <Icon 
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter icon"
             />
          </Box>
        </Box>

        <Box  
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
        <Heading color="midnight" size="md">
            StoreBrands
        </Heading>
        </Box>
        <Box
        dangerouslySetInlineStyle={{
          __style:{
            backgroundColor: '#d6c8ec'
          }
        }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
        {this.filteredBrands(this.state).map(brand => (
          <Box paddingY={4} margin={2} width={200} key={brand._id}>
            <Card 
              image={
                <Box height={200} width={200}>
                  <Image 
                    fit="cover"
                    alt="Brand"
                    src={`${apiUrl}${brand.image[0].url}`}
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Box>
              }>
              <Box 
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column">
                <Text bold size="xl">{brand.name}</Text> 
                <Text>{brand.description}</Text>
                <Text size="xl">
                  <Link bold to={`${brand._id}`}>See Brews</Link>
                </Text>
              </Box>

            </Card>
          </Box>
        ))}
        </Box>
             <Loader show={loadingBrands} />
      </Container>
    );
  }
}

export default App;
