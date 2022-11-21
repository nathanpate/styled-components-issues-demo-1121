import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderWraper = styled.div`
  h1 {
    font-family: ${props => props.h1Font};
    margin: 50px 30px;
  }
  a {
    text-decoration: none;
    color: red;
    padding: 10px 20px;
    border: 3px solid green;
    border-radius: 20px;
  }
`

const Header6 = ({ children, size = "medium" }) => {
  let header = (
    <Link className="header-link-home6" to="/">
      {children}
    </Link>
  )

  if (size === "large") {
    header = (
      <h1 className="main-heading6">
        <Link to="/">{children}</Link>
      </h1>
    )
  }

  return (
    <HeaderWraper h1Font="Luminari">
      <header className="global-header6">{header}</header>
    </HeaderWraper>
  )
}

export default Header6
