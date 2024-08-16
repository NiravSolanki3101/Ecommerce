import React, {useState, useEffect} from 'react'
import { Link , useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from "../components/Loader"
import Message from "../components/Message"
// import products from '../products'


function ProductScreen(){
    let naviagte = useNavigate()
    // for quantity
    const [qty,setQty] = useState(1)


    // for fetch product data
    const param = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector( state => state.productDetails)
    const {error, loading, product} = productDetails
    
    useEffect(()=> {
        dispatch(listProductDetails(param.id))
    },[dispatch])

    const addToCartHandler = () => {
        naviagte(`/cart/${param.id}?qty=${qty}`)
    }

    return(
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader />
                    :   error ? <Message variant="danger">{error}</Message>
                        : 
                <Row>
                    <Col md={6}>
                        <Image src = {product.image} alt={product.name} fluid/>
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item  >
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 &&
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col xs = 'auto' className='my-1'>
                                            <Row>
                                                <Col>
                                                    <Button variant="outline-secondary btn-sm" onClick={() => setQty(qty-1)} disabled = {qty==0}>-</Button>
                                                </Col>
                                                <Col className='' style={{margin: "auto"}}>
                                                    {qty}
                                                </Col>
                                                <Col>
                                                <Button variant="outline-secondary btn-sm" onClick={() => setQty(qty+1)} disabled = {qty==product.countInStock}>+</Button>
                                                </Col>
                                            </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                }

                                <ListGroup.Item>
                                    <Button className='w-100 btn-block' disabled={product.countInStock == 0} type='button'  onClick={addToCartHandler}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default ProductScreen