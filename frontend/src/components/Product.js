import React from "react"
import { Card } from "react-bootstrap"
import Rating from "./Rating"
import { Link } from 'react-router-dom'

function product({product})
{
    return(
        <Card className="p-3 rounded h-100">
            <Link to={`/product/${product._id}`} className="m-auto">
                {/* <Card.Img src = {`${product.image}`} height="180"></Card.Img> */}
                <Card.Img src = {`${product.image}`} style={{width: "auto", height: "200px", margin:'auto'}}></Card.Img>
            </Link>

            <Card.Body className="mb-0">   
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="div" className="fs-6">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3 fs-6">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>

                <Card.Text as="h5">
                    &#8377; {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default product;