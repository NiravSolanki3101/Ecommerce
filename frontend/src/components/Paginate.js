import React, { useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { createSearchParams } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    let pathname = "";

    if (!keyword) {
        keyword = ""
    }

    if(!isAdmin)
    {
        pathname = "/"
    }
    else
    {
        pathname = "/admin/productlist/"
    }

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to = {{
                        pathname : `${pathname}`,
                        search: createSearchParams({
                            keyword : `${keyword}`,
                            page : `${x + 1}`
                        }).toString()
                    }}
                >
                    <Pagination.Item active={x + 1 === page} className={`${x + 1 === page ? "pagination active" : "pagination deactive"}`}>{x + 1}</Pagination.Item>
                    {/* <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item> */}
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
