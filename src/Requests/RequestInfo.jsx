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
let querystring = require("query-string");

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
const TabsStyled = styled(Tabs)`
  flex: 1;
`;
const TabStyled = styled(Tab)`
  margin-right: 30px;
  color: ${props => (props.selected ? "#ae79fb" : "#5e5e5e")};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  background: rgb(30, 30, 30);
  // border-radius: 5px;
`;
const TableHeader = styled.h2`
  color: #fff;
  font-family: monospace;
  padding: 10px;
`;
const TableRow = styled.tr``;
const TableData = styled.td`
  border: 1px solid #2a2a2a;
  color: #fff;
  font-family: monospace;
  padding: 10px;
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
          <TabsStyled>
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
              <Table>
                {request.url &&
                  Object.keys(querystring.parseUrl(request.url).query).map(
                    param => (
                      <TableRow>
                        <TableData>{param}</TableData>
                        <TableData>
                          {querystring.parseUrl(request.url).query[param]}
                        </TableData>
                      </TableRow>
                    )
                  )}
              </Table>
            </TabPanel>
            <TabPanel>
              {request.requestHeaders && (
                <Table>
                  <TableHeader>Request</TableHeader>
                  {Object.keys(request.requestHeaders).map(param => (
                    <TableRow>
                      <TableData>{param}</TableData>
                      <TableData>{request.requestHeaders[param]}</TableData>
                    </TableRow>
                  ))}
                </Table>
              )}
              {request.responseHeaders && (
                <Table>
                  <TableHeader>Response</TableHeader>
                  {Object.keys(request.responseHeaders).map(param => (
                    <TableRow>
                      <TableData>{param}</TableData>
                      <TableData>{request.responseHeaders[param]}</TableData>
                    </TableRow>
                  ))}
                </Table>
              )}
            </TabPanel>
            <TabPanel>
              <h2>Content</h2>
            </TabPanel>
            <TabPanel>
              <h2>Overview</h2>
            </TabPanel>
          </TabsStyled>
        </Box>
      </Info>
    )
  );
};
