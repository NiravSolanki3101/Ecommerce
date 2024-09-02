import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { createSearchParams } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (!keyword) {
        keyword = ""
    }

    let pathname = "";

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
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
