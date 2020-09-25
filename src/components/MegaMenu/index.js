import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

const MegaMenuItem=({ to, children, icon,  title, description})=>(
    <div className="navbar-promo-item">
        {
            children || (
    <Link className="navbar-promo-link" to={to}>
      <div className="media align-items-center">
        {
            typeof icon==='string'?
            <img className="navbar-promo-icon" src={ icon } />:
            <div className="navbar-promo-icon">{ icon }</div>
        }
        <div className="media-body">
          <span className="navbar-promo-title">
            {title}
          </span>
    <small className="navbar-promo-text">{ description }</small>
        </div>
      </div>
    </Link>
            )
    }
  </div>
)
const MegaMenu=({ children, title })=>{
    const [isOpen, setIsOpen]=useState(false)
    return (
        <li className="hs-has-mega-menu navbar-nav-item">
        <Link
                        onClick={()=>setIsOpen(prev=>!prev)}
                        onMouseEnter={()=>setIsOpen(true)}
                        onMouseLeave={()=>setIsOpen(false)}
        className="nav-link nav-link-toggle"
        >
            { title }
            </Link>
        <motion.div
    animate={isOpen?"open":"closed"}
    variants={{
        open: { opacity: 1, y: 0, display: "block" },
        closed: { opacity: 0, y:    10, display: "none" },
    }}
    transition={{duration: 0.3}}
    style={{
        minWidth: 330,
        left: "auto",
        right: 0
    }}
    className={`hs-mega-menu dropdown-menu hs-mega-menu-desktop-lg hs-position-right`}
>
          { children }
        </motion.div>
      </li>
    )
}

export { MegaMenu, MegaMenuItem}