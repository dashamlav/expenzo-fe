import styled from 'styled-components'
import React from 'react'

const BurgerWrapper = styled.div``

const BurgerStick = styled.div`
    width: 20px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: background-color .5s;
    ${BurgerWrapper}:hover & {
        background-color: #999999;
      }
`

const VegBurger = (props) => {
    return (
        <BurgerWrapper>
            <BurgerStick></BurgerStick>
            <BurgerStick></BurgerStick>
            <BurgerStick></BurgerStick>
            {props.children}
        </BurgerWrapper>
    )
}

export default VegBurger