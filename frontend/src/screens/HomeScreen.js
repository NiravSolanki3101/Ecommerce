import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import { useNavigate, useSearchParams } from 'react-router-dom'


function HomeScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword = searchParams.get('keyword')
    let page_number = searchParams.get('page')

    useEffect(() => {
        if(!keyword)
        {
            keyword = ''
        }
        if(!page_number)
        {
            page_number = 1
        }
        dispatch(listProducts(keyword,page_number))

    }, [dispatch, keyword,page_number])

    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col>
                                <Paginate page={page} pages={pages} keyword={keyword} />
                            </Col>
                        </Row>
                    </div>
            }
        </div>
    )
}

export default HomeScreen