import * as React from "react"
import { Link } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

const HeaderWraper = styled.div`
  h1 {
    font-family: ${props => props.theme.h1Font};
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

const Header2 = ({ children, size = "medium" }) => {
  let header = (
    <Link className="header-link-home3" to="/">
      {children}
    </Link>
  )

  if (size === "large") {
    header = (
      <h1 className="main-heading3">
        <Link to="/">{children}</Link>
      </h1>
    )
  }

  return (
    <HeaderWraper>
      <header className="global-header3">{header}</header>
    </HeaderWraper>
  )
}

export default Header2
