import React, { useState } from 'react'

const Pagination = (props) => {
    // const [currentPage, setCurrentPage] = useState(1)
    const [pageRange, setPageRange] = useState([1,2,3,4,5])


    const changePageRange = (direction) => {
        setPageRange((prevRange)=>{
            return prevRange.map(pageNum=>pageNum+5*direction)
        })
    }

    return(
        <div class="container">
            <div class="pagination">
                <ul class="pagination-2">
                    <li class="page-number prev" onClick={()=>changePageRange(-1)}>&laquo;</li>

                    {
                        pageRange.map((pageNumber)=>
                            <li className="page-number" onClick={()=>props.onPageChange(pageNumber)}>
                                {pageNumber}
                            </li>)
                    }
                    <li class="page-number prev" onClick={()=>changePageRange(1)}>&raquo;</li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination