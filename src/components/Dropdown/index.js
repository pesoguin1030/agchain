import React, { useState } from "react";
import { motion } from "framer-motion";

const DropdownItem = (props) => <a {...props} className="dropdown-item" />;

const DropdownList = (props) => (
  <motion.div
    style={props.style}
    onMouseLeave={() => props.setIsOpen(false)}
    animate={props.isOpen ? "open" : "closed"}
    variants={{
      open: { opacity: 1, y: 0, visibility: "visible" },
      closed: { opacity: 0, y: 10, visibility: "hidden" },
    }}
    transition={{ duration: 0.3 }}
    className={`hs-unfold-content dropdown-menu
    ${!props.isOpen ? `hs-unfold-content-hidden` : ""}
    `}
  >
    {props.children}
  </motion.div>
);

const DropdownCard = (props) => (
  <motion.div
    onMouseLeave={() => {
      props.setIsOpen(false);
    }}
    animate={props.isOpen ? "open" : "closed"}
    variants={{
      open: { opacity: 1, y: 0, visibility: "visible" },
      closed: { opacity: 0, y: 10, visibility: "hidden" },
    }}
    transition={{ duration: 0.3 }}
    className={`hs-unfold-content dropdown-menu dropdown-card ${
      props.position ? `dropdown-menu-${props.position}` : ""
    }
    `}
    style={props.style}
  >
    {props.children}
  </motion.div>
);

function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`hs-unfold ${props.className || ""}
    ${!props.isOpen ? `hs-unfold-content-hidden` : ""}
    `}
    >
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
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
}

export { DropdownMenu, DropdownList, DropdownItem, DropdownCard };
