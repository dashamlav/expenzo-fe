import React from 'react'
import styled from 'styled-components'
import Card from './Card'


// Make sure to implement the closeModalFn logic while using this model. 

const ModalContainer = styled.div`
    position: fixed;
    display: flex;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin:auto;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
`
const ModalCard = styled.div`
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 50%;
    padding: 1em 3em 1em 3em;
    background-color: white;
    border-radius: 10px;
    border: 0.5px solid #aaaaaa;
    overflow: scroll;
    `

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    border: none;
    color: #23395d;
    font-size: 25px;
    cursor: pointer;
    background-color: white;
`

const Modal = (props) => {
    return(
        <ModalContainer>
            <ModalCard>
                <CloseButton type="button" onClick={props.closeModalFn}>&times;</CloseButton>
                {props.children}
            </ModalCard>
        </ModalContainer>
    )
}

export default Modal