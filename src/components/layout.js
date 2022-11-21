import * as React from "react";
import { Slice } from "gatsby";
import { ThemeProvider } from "styled-components";
import Header5 from "./header5";
import Header6 from "./header6";

const theme = {
  h1Font: "Luminari",
};

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

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
  );
};

export default Layout;

