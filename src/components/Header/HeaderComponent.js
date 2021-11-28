import React, {useState} from 'react'
import './header.scss'
import '../../index.css'
import Modal from '../UI/Modal'
import {AboutMe, Feedback, HowItWorks} from './ModalContent/ModalContent'

const Header = () => {

    const [modalToShow, setModalToShow] = useState(null)

    const showModalFn = (modalName) => {
        setModalToShow(modalName)
    }

    const closeModalFn = () => {
        setModalToShow(null)
    }

    const getClickedField = (event) => {
        showModalFn(event.target.id)
    }
    return(
        <nav>
            <div className="brand-name">EXPENZO</div>
            <ul className="nav-ul" onClick={getClickedField}>
                <li className="nav-list"><p id="how-it-works">HOW IT WORKS</p></li>
                <li className="nav-list"><p id="feedback">FEEDBACK</p></li>
                <li className="nav-list"><p id="about-me">ABOUT ME</p></li>
            </ul>
                {   
                    (modalToShow===null)?
                    <React.Fragment></React.Fragment> :
                    <Modal closeModalFn={closeModalFn}>
                        {
                            (modalToShow==='how-it-works')?
                            <HowItWorks></HowItWorks>:
                            (modalToShow==='feedback')?
                            <Feedback></Feedback>:
                            <AboutMe></AboutMe>
                        }
                    </Modal>
                }
        </nav>
    )
}

export default Header