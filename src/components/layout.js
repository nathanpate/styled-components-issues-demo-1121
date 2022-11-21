import * as React from "react"
import { Slice } from "gatsby"

import styled, { ThemeProvider } from "styled-components"

const theme = {
  h1Font: "Luminari",
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme}>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        {/* <Slice alias="header" size={isRootPath ? "large" : "medium"}>
          {title}
        </Slice> */}
        <Slice alias="header1" size={isRootPath ? "large" : "medium"}>
          Header1: Inline CSS
        </Slice>
        <Slice alias="header2" size={isRootPath ? "large" : "medium"}>
          Header2: Styled-components (no props)
        </Slice>
        <Slice alias="header3" size={isRootPath ? "large" : "medium"}>
          Header3: Styled-components (only props from theme)
        </Slice>
        <Slice alias="header4" size={isRootPath ? "large" : "medium"}>
          Header4: Styled-components (only props from component)
        </Slice>
        <main>{children}</main>
        <Slice alias="footer" />
      </div>
    </ThemeProvider>
  )
}

export default Layout
