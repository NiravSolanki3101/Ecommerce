import React from "react"
import { Card } from "react-bootstrap"
import Rating from "./Rating"
import { Link } from 'react-router-dom'

function product({product})
{
    return(
        <Card className="my-3 p-3 rounded h-100">
            <Link to={`/product/${product._id}`}>
                <Card.Img src = {product.image}></Card.Img>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="div" className="fs-5">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3 fs-5">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                     ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default product;