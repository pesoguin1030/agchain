import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Sidebar(props){
    const [initialized, setInitialized]=useState(false)
    
    useEffect(()=>{
        if(props.isVisible){
            setInitialized(true)
        }else{
            setTimeout(()=>{
                setInitialized(false)
            },300)
        }
    },[props.isVisible])
    
    return (
        <>
<aside 
id="sidebarContent" 
className={
    `${props.isVisible?'fadeInRight':'fadeOutRight'} ${initialized?"":"hs-unfold-hidden"} hs-unfold-content sidebar hs-unfold-content-initialized hs-unfold-css-animation animated ` 
}
data-hs-target-height="0" 
data-hs-unfold-content="" 
data-hs-unfold-content-animation-in="fadeInRight" 
data-hs-unfold-content-animation-out="fadeOutRight" 
style={{
    animationDuration: "300ms"
    }}>
    <div className="sidebar-scroller">
      <div className="sidebar-container">
        <div className="sidebar-footer-offset" style={{
            paddingBottom: "7rem"
            }}>
          <div className="d-flex justify-content-end align-items-center pt-4 px-4">
            <div className="hs-unfold">
              <a className="btn btn-icon btn-xs btn-soft-secondary" onClick={props.onClose}
                 data-hs-unfold-options="{
                  &quot;target&quot;: &quot;#sidebarContent&quot;,
                  &quot;type&quot;: &quot;css-animation&quot;,
                  &quot;animationIn&quot;: &quot;fadeInRight&quot;,
                  &quot;animationOut&quot;: &quot;fadeOutRight&quot;,
                  &quot;hasOverlay&quot;: &quot;rgba(55, 125, 255, 0.1)&quot;,
                  &quot;smartPositionOff&quot;: true
                 }" data-hs-unfold-target="#sidebarContent" data-hs-unfold-invoker="">
                <svg width="10" height="10" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"></path>
                </svg>
               </a>
            </div>
          </div>
        
        {props.children}
        </div>
      </div>
    </div>
    </aside>
          <motion.div 
      animate={props.isVisible ? "open" : "closed"}
    variants={{
      open: { opacity: 1 },
      closed: { opacity: 0 },
    }}
    style={{
        display: initialized?"block":"none"
    }}
    transition={{ duration: 0.3 }}
      className="hs-unfold-overlay" />
  </>
    )
}

const SidebarContent=(props)=>(
    <div className="scrollbar sidebar-body">
    <div className="sidebar-content py-4 px-7">
    {props.children}
    </div>
    </div>
)

const SidebarFooter=(props)=>(
    <footer className="sidebar-footer border-top py-2 px-7">
        {props.children}
    </footer>
)
export { Sidebar, SidebarFooter, SidebarContent }