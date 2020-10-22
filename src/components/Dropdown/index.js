import React, { useState } from "react";
import { motion } from "framer-motion";

const DropdownItem = (props) => <a {...props} className="dropdown-item" />;

const DropdownList = (props) => (
  <motion.div
    animate={props.isOpen ? "open" : "closed"}
    variants={{
      open: { opacity: 1, y: 0 },
      closed: { opacity: 0, y: 10 },
    }}
    transition={{ duration: 0.3 }}
    className="hs-unfold-content dropdown-menu"
  >
    {props.children}
  </motion.div>
);

const DropdownCard = (props) => (
  <motion.div
    animate={props.isOpen ? "open" : "closed"}
    variants={{
      open: { opacity: 1, y: 0 },
      closed: { opacity: 0, y: 10 },
    }}
    transition={{ duration: 0.3 }}
    className={`hs-unfold-content dropdown-menu dropdown-card ${
      props.position ? `dropdown-menu-${props.position}` : null
    }`}
    style={props.style}
  >
    <div className={`card ${props.className || ""}`} />
    {props.children}
  </motion.div>
);

function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className={`hs-unfold ${props.className || ""}`}>
        {props.title ? (
          <a
            className="dropdown-nav-link dropdown-toggle d-flex align-items-center"
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseEnter={() => setIsOpen(true)}
          >
            <span className="d-inline-block d-sm-none">{props.title}</span>
            <span className="d-none d-sm-inline-block">{props.title}</span>
          </a>
        ) : null}
        {props.icon ? (
          <a
            className="btn btn-xs btn-icon btn-ghost-secondary"
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseEnter={() => setIsOpen(true)}
          >
            {props.icon}
          </a>
        ) : null}
        <div onMouseLeave={() => setIsOpen(false)}>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child, { isOpen })
          )}
        </div>
      </div>
    </div>
  );
}

export { DropdownMenu, DropdownList, DropdownItem, DropdownCard };
