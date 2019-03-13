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
          <Highlight
            {...defaultProps}
            theme={styledTheme}
            code={JSON.stringify(request, null, "\t")}
            language="jsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
        </Box>
      </Info>
    )
  );
};
