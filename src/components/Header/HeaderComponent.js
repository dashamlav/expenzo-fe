import React, {useState, useContext} from 'react'
import './header.scss'
import '../../index.css'
import Modal from '../UI/Modal'
import {AboutMe, Feedback, HowItWorks} from './ModalContent/ModalContent'
import VegBurger from '../UI/Burger'
import useComponentVisible from '../../utils/outsideClick'
import AuthContext from '../../contextManager/AuthContextManager'
import { Link } from 'react-router-dom'

const Header = () => {

    const [modalToShow, setModalToShow] = useState(null)
    const [ref, isDropdownVisible, setIsDropdownVisible] = useComponentVisible(false)
    const authCtx = useContext(AuthContext)

    const closeModalFn = () => {
        setModalToShow(null)
    }

    const showModalFn = () => {
        switch (modalToShow) {
            case "how-it-works":
                return <Modal closeModalFn={closeModalFn}><HowItWorks></HowItWorks></Modal>
            case "feedback":
                return <Modal closeModalFn={closeModalFn}><Feedback></Feedback></Modal>
            case "about-me":
                return <Modal closeModalFn={closeModalFn}><AboutMe></AboutMe></Modal>
            default:
                <React.Fragment></React.Fragment>
        }
    }


    const getClickedField = (event) => {
        const modalName = event.target.id
        setModalToShow(modalName)
        showModalFn(modalName)
    }

    const clickDropdownHandler = () => {
        setIsDropdownVisible(!isDropdownVisible)
    }

    const logout = () => {
        authCtx.logoutHandler()
    }

    return(
        <nav>
            <div className="brand-name">EXPENZO</div>
            <ul className="nav-ul" onClick={getClickedField}>
                <li className="nav-list"><p id="how-it-works">HOW IT WORKS</p></li>
                <li className="nav-list"><p id="feedback">FEEDBACK</p></li>
                <li className="nav-list"><p id="about-me">ABOUT ME</p></li>

                {
                    (authCtx.isLoggedIn)?
                    <React.Fragment>
                        <li className="nav-list"><p id="collections">MY COLLECTIONS</p></li>
                        <li className="nav-list"><p id="statistics">STATISTICS</p></li>
                        <li className="nav-list" style={{float:'right'}}>
                            <p>
                                <div className="dropdown" ref={ref} onClick={clickDropdownHandler}>
                                    <VegBurger>
                                        {
                                            (isDropdownVisible) ?
                                            <div className="dropdown-content" >
                                                <Link to="/account-settings">Account Settings</Link>
                                                <a onClick={logout}>Logout  <i style={{"font-size":"15px"}} className="fa">&#xf08b;</i></a>
                                            </div> :
                                            <React.Fragment></React.Fragment>
                                        }
                                    </VegBurger>
                                </div>
                            </p>
                        </li>
                    </React.Fragment>:
                    <React.Fragment></React.Fragment>
                }

            </ul>
                {   
                    showModalFn()
                }
                   
                    
                
        </nav>
    )
}

export default Header