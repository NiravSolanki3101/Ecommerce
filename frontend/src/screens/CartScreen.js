import React, { useEffect } from 'react'
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const param = useParams()
    const product_id = param.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(()=>
    {
        if(product_id)
        {
            dispatch(addToCart(product_id,qty))
        }
    },[dispatch,product_id,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return(
         <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={3}>                                        
                                            <Row>
                                                <Col>
                                                    <Button variant="outline-secondary btn-sm" onClick={() =>  dispatch(addToCart(item.product, item.qty-1))} disabled = {item.qty==0}>-</Button>
                                                </Col>
                                                <Col className='' style={{margin: "auto"}}>
                                                    {item.qty}
                                                </Col>
                                                <Col>
                                                <Button variant="outline-secondary btn-sm" onClick={() =>  dispatch(addToCart(item.product, item.qty+1))}>+</Button>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='w-100 btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen