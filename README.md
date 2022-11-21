# Issues Description
Gatsby v5 introduced [Slice API](https://www.gatsbyjs.com/blog/gatsby-slice-api/). After I refit some components, which use Styled Components, into Slice, seems no problem under `gatsby develop`, but no CSS under `gatsby build`. (whatever do `gatsby clean` or not).

After detailed testing, confirmed that only those use `${props => props.theme.varName}` are affected, `${props => props.varName}` does not.

This repo, is based on [gatsby-starter-slices starter](https://github.com/gatsbyjs/gatsby-starter-slices), could replicate this issue.

# Demo Explaination
## 1. Cleared all content in `src/style.css`, to exclude influencing factors.

## 2. Installed `"styled-components": "^5.3.6"`.

## 3. Duplicated `src/components/header.js` 5 copies, named them `header1 ... 6.js`
![alt text](https://github.com/nathanpate/styled-components-issues-demo-1121/blob/7f7ce1ea214f067f9ca0a0683bd9e817f2d524e9/pics-for-readme/6-header-files.png?raw=true)

## 4. In `header1.js`, created Inline CSS:
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
## 5. In `header2.js`, created the same CSS using Styled Components. All hard-coded, no `props`:
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
## 6. In `header3.js`, same as `header2,js`, but has a `theme props`:
```javascript
// src/components/header3.js
...
  h1 {
    font-family: ${props => props.theme.h1Font};
...
```
## 7. In `header4.js`, changed the `theme props` in `header3.js` to a `component props`:
```javascript
// src/components/header4.js
...
  h1 {
    font-family: ${props => props.h1Font};
...
```
## 8. In `header5.js`, same as `header3.js`, has a `theme props`, but will not be used as a Slice.

## 9. In `header6.js`, same as `header4.js`, has a `component props`, but also, will not be used as a Slice.

## 10. In `gatsby-node.js` create slices:
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
  ...
```

## 11. In `src/components/layout.js`:
```javascript
import * as React from "react"
import { Slice } from "gatsby"
import { ThemeProvider } from "styled-components"
import Header5 from "./header5"
import Header6 from "./header6";

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
        <Slice alias="header" size={isRootPath ? "large" : "medium"}>
          {title}
        </Slice>
        <Slice alias="header1" size={isRootPath ? "large" : "medium"}>
          {"Header1: Inline CSS"}
        </Slice>
        <Slice alias="header2" size={isRootPath ? "large" : "medium"}>
          {"Header2: Styled-components (no props)"}
        </Slice>
        <Slice alias="header3" size={isRootPath ? "large" : "medium"}>
          {"Header3: Styled-components (has props from theme)"}
        </Slice>
        <Slice alias="header4" size={isRootPath ? "large" : "medium"}>
          {"Header4: Styled-components (has props from component)"}
        </Slice>
        <Header5 size={isRootPath ? "large" : "medium"}>
          {"(Not a Slice) Header5: Styled-components (has props from theme)"}
        </Header5>
        <Header6 size={isRootPath ? "large" : "medium"}>
          {
            "(Not a Slice) Header6: Styled-components (has props from component)"
          }
        </Header6>
        <main>{children}</main>
        <Slice alias="footer" />
      </div>
    </ThemeProvider>
  )
}

export default Layout
```

## 12. run `gatsby clean && gatsby develop --verbose`, works with no problem:
![gatsby develop result](https://github.com/nathanpate/styled-components-issues-demo-1121/blob/7f7ce1ea214f067f9ca0a0683bd9e817f2d524e9/pics-for-readme/gatsby-develop-result.png?raw=true)

## 13. run `gatsby clean && gatsby build --verbose`, after `gatsby serve`, problems come:

  the 1st frame when loading `http://localhost:9000/`
  ![the first frame when loading `http://localhost:9000/`](https://github.com/nathanpate/styled-components-issues-demo-1121/blob/7f7ce1ea214f067f9ca0a0683bd9e817f2d524e9/pics-for-readme/gatsby-build-result-frame-01.png?raw=true)

  the 2nd frame when loading `http://localhost:9000/`
  ![the 2nd frame when loading `http://localhost:9000/`](https://github.com/nathanpate/styled-components-issues-demo-1121/blob/7f7ce1ea214f067f9ca0a0683bd9e817f2d524e9/pics-for-readme/gatsby-build-result-frame-02.png?raw=true)
