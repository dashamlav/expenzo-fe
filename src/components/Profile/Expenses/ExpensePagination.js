import React, { useState, useEffect } from 'react'
import { getArrayForRange } from '../../../utils/generalUtils'

const MAX_PAGE_NUMBER_DISPLAY = 5
const MAX_RESULTS_PER_PAGE = 10

const Pagination = (props) => {

    const [pageRange, setPageRange] = useState([1,2,3,4,5])
    const [maxPageNumber, setMaxPageNumber] = useState(5)

    useEffect(()=>{
        console.log(props.totalCount)
        let lastPageIndex = Math.ceil(props.totalCount/MAX_RESULTS_PER_PAGE)
        setMaxPageNumber(lastPageIndex)
        let range = getArrayForRange(1, Math.min(MAX_PAGE_NUMBER_DISPLAY, lastPageIndex))
        setPageRange(range)
    },[props.totalCount])

    useEffect(()=>{
        props.onPageChange(1)
    },[maxPageNumber])

    const setPrevPageRange = () => {
        setPageRange(currentPageRange=>{
            let lastIndex = currentPageRange[currentPageRange.length-1]
            return getArrayForRange(lastIndex-MAX_PAGE_NUMBER_DISPLAY, lastIndex-1)
        })
    }

    const setNextPageRange = () => {
        setPageRange(currentPageRange=>{
            let lastIndex = currentPageRange[currentPageRange.length-1]
            return getArrayForRange(lastIndex+1, Math.min(lastIndex+5, maxPageNumber))
        })
    }
    return(
        <div class="pagination-container">
            <ul class="pagination-list">
                <li class="page-number">
                    <button 
                        className="page-number-button"
                        type="button" 
                        onClick={setPrevPageRange} 
                        disabled={pageRange[0]===1}>
                        &laquo;
                    </button>
                </li>
                {
                    pageRange.map((pageNumber)=>
                        <li key={pageNumber} className="page-number">
                            <button 
                                className={`page-number-button ${(pageNumber===props.currentPageNo)?'active':''}`}
                                type="button" 
                                onClick={()=>{props.onPageChange(pageNumber)}}>
                                {pageNumber}
                            </button>
                        </li>)
                }
                <li class="page-number">
                    <button 
                        className="page-number-button"
                        type="button" 
                        onClick={setNextPageRange} 
                        disabled={pageRange.length<5 || pageRange[pageRange.length-1]===maxPageNumber}>
                        &raquo;
                    </button>
                    </li>
            </ul>
        </div>
    )
}

export default Pagination