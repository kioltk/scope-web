import React from "react";
import styled from "styled-components";
import {
  Box as BaseBox,
  SubBox,
  MainBox,
  Method as BaseMethod,
  Url as BaseUrl,
  Pre,
  LineNo,
  styledTheme
} from "./shared";

import Highlight, { defaultProps } from "prism-react-renderer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

console.log("BaseBox=", BaseBox);
const Box = styled(BaseBox)`
  align-items: center;
  font-weight: 600;
  font-size: 14px;
`;
const Method = styled(BaseMethod)`
  font-weight: 700;
`;
const UrlBox = styled(SubBox)`
  flex: 1;
  margin-left: 10px;
`;
const Url = styled(BaseUrl)`
  padding: 6px 6px;
`;
const Info = styled.div`
  margin-top: 10px;
`;
const Status = styled.div`
  font-weight: bold;
  color: #fff;
`;
const TabListStyled = styled(TabList)`
  display: flex;
  // flex-direction: row-reverse;
  list-style: none;
  margin: 0;
  padding: 20px 0 5px;
`;
const TabStyled = styled(Tab)`
  margin-right: 30px;
  color: ${props => (props.selected ? "#ae79fb" : "#5e5e5e")};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

export default ({ request }) => {
  return (
    request && (
      <Info>
        <Box>
          <Status status={request.statusCode}>{request.statusCode}</Status>
          <Method method={request.method}>{request.method}</Method>
          <UrlBox>
            <Url className="code">{request.url}</Url>
          </UrlBox>
        </Box>
        <Box>
          <Tabs>
            <TabListStyled>
              <TabStyled>Body</TabStyled>
              <TabStyled>Parameters</TabStyled>
              <TabStyled>Headers</TabStyled>
              <TabStyled>Overview</TabStyled>
            </TabListStyled>

            <TabPanel>
              <Highlight
                {...defaultProps}
                theme={styledTheme}
                code={JSON.stringify(request, null, "\t")}
                language="json"
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps
                }) => (
                  <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div {...getLineProps({ line, key: i })}>
                        <LineNo>{i + 1}</LineNo>
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </Pre>
                )}
              </Highlight>
            </TabPanel>
            <TabPanel>
              <h2>Parameters</h2>
            </TabPanel>
            <TabPanel>
              <h2>Headers</h2>
            </TabPanel>
            <TabPanel>
              <h2>Content</h2>
            </TabPanel>
            <TabPanel>
              <h2>Overview</h2>
            </TabPanel>
          </Tabs>
        </Box>
      </Info>
    )
  );
};
