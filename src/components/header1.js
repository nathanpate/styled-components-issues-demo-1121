import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const largeH1Style = {
  fontFamily: "Luminari",
  margin: "50px 30px",
}
const linkStyle = {
  textDecoration: "none",
  color: "red",
  padding: "10px 20px",

  border: "3px solid green",
  borderRadius: "20px",
}

const Header1 = ({ children, size = "medium" }) => {
  let header = (
    <Link className="header-link-home1" to="/">
      {children}
    </Link>
  )

  if (size === "large") {
    header = (
      <h1 style={largeH1Style} className="main-heading1">
        <Link style={linkStyle} to="/">
          {children}
        </Link>
      </h1>
    )
  }

  return <header className="global-header1">{header}</header>
}

export default Header1
