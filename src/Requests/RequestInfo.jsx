import React from "react";
import styled from "styled-components";
import {
  Box as BaseBox,
  SubBox,
  MainBox,
  Method as BaseMethod,
  Url as BaseUrl
} from "./shared";

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

export default ({ request }) => {
  return (
    <Info>
      <Box>
        <Method method={request.method}>{request.method}</Method>
        <UrlBox>
          <Url className="code">{request.url}</Url>
        </UrlBox>
      </Box>
      <Box>
        <SubBox>
          <p>{JSON.stringify(request, null, "\t")}</p>
        </SubBox>
      </Box>
    </Info>
  );
};
