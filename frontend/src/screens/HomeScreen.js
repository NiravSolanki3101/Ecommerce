import React, {useState, useEffect} from 'react'
import { Container, Row, Col} from 'react-bootstrap'

import Product from "../components/Product"
import axios from "axios"
// import products from '../products'

function HomeScreen(){
    const [products,setProducts] = useState([])
    
    useEffect(()=> {
        async function fetchProducts() {         
            
            const {data} = await axios.get("/api/products/")
            setProducts(data)
        }

        fetchProducts()
    },[])
    return(    
        <div>
            <Container>
               <h1> 
                Latest Product  
               </h1>
               <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                    )
                )}
               </Row>
            </Container>
        </div>
    )
}

export default HomeScreen;