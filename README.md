# Issues Description
Gatsby v5 introduced [Slice API](https://www.gatsbyjs.com/blog/gatsby-slice-api/). After I refit some components, which use Styled Components, into Slice, seems no problem under `gatsby develop`, but no CSS under `gatsby build`. (whatever do `gatsby clean` or not).

After detailed testing, confirmed that only those use `${props => props.theme.varName}` are affected, `${props => props.varName}` does not.

This repo, is based on [gatsby-starter-slices starter](https://github.com/gatsbyjs/gatsby-starter-slices), could replicate this issue.

# Demo Explaination
1. Cleared all content in `src/style.css`, to exclude influencing factors.

2. Installed `"styled-components": "^5.3.6"`.

3. Duplicated `src/components/header.js` 5 copies, named them `header1 ... 5.js`

4. In `header1.js`, created Inline CSS:
```javascript
// src/components/header1.js

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
```
5. In `header2.js`, created the same CSS using Styled Components. All hard-coded, no `props`:
```javascript
// src/components/header2.js

const HeaderWraper = styled.div`
  h1 {
    font-family: "Luminari";
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
```
6. In `header3.js`, same as `header2,js`, but has a `theme props`:
```javascript
// src/components/header3.js
...
  h1 {
    font-family: ${props => props.theme.h1Font};
...
```
7. In `header4.js`, changed the `theme props` in `header3.js` to a `component props`:
```javascript
// src/components/header4.js
...
  h1 {
    font-family: ${props => props.h1Font};
...
```
8. In `header5.js`, same as `header3.js`, has a `theme props`, but will not use as a Slice.

9. In `gatsby-node.js` create slices:
```javascript
// gatsby-node.js
  ...
  createSlice({
    id: `header1`,
    component: require.resolve(`./src/components/header1.js`),
  })
  createSlice({
    id: `header2`,
    component: require.resolve(`./src/components/header2.js`),
  })

  createSlice({
    id: `header3`,
    component: require.resolve(`./src/components/header3.js`),
  })
  createSlice({
    id: `header4`,
    component: require.resolve(`./src/components/header4.js`),
  })

  createSlice({
    id: `header5`,
    component: require.resolve(`./src/components/header4.js`),
  })
  ...
```

10. In `src/components/layout.js`:
```javascript
import * as React from "react"
import { Slice } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

// the theme for ThemeProvider of Styled Components
const theme = {
  h1Font: "Luminari",
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <ThemeProvider theme={theme}>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        // comment out the original `header`, for reference
        {/* <Slice alias="header" size={isRootPath ? "large" : "medium"}>
          {title}
        </Slice> */}
        
        // header1-4 are used as Slice
        <Slice alias="header1" size={isRootPath ? "large" : "medium"}>
          Header1: Inline CSS
        </Slice>
        <Slice alias="header2" size={isRootPath ? "large" : "medium"}>
          Header2: Styled-components (no props)
        </Slice>
        <Slice alias="header3" size={isRootPath ? "large" : "medium"}>
          Header3: Styled-components (has props from theme)
        </Slice>
        <Slice alias="header4" size={isRootPath ? "large" : "medium"}>
          Header4: Styled-components (has props from component)
        </Slice>
        
        // header5 is used as a normal component in legacy way.
        <Header5 size={isRootPath ? "large" : "medium"}>
          Header5: Styled-components (has props from theme, not a Slice)
        </Header5>
        
        <main>{children}</main>
        <Slice alias="footer" />
      </div>
    </ThemeProvider>
  )
}

export default Layout
```

