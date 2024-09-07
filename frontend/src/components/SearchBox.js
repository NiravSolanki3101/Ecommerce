import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate,useLocation, createSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const navigate = useNavigate()
    const location = useLocation();

    let onAdminPage = location.pathname ? location.pathname.includes("admin") : false
    console.log(onAdminPage);

    let pathname = "";

    useEffect(()=>
    {
        if(!onAdminPage)
        {
            pathname = "/"
        }
        else
        {
            pathname = "/admin/productlist/"
        }

    })


    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate({
                pathname: `${pathname}`,
                search: createSearchParams({
                    keyword : `${keyword}`,
                    page : '1'
                }).toString()
              });
        } else {
            navigate(navigate(location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        className='mr-sm-2 ml-sm-5'
                    ></Form.Control>
                </Col>
                <Col xs="auto" className='d-flex align-items-center'>
                    <Button
                        type='submit'
                        variant='outline-success'
                        // className="mb-2"
                    >
                        Submit
                    </Button>
                </Col>
            </Row>

        </Form>
    )
}

export default SearchBox
