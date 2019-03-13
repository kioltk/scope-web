import React from "react";
import styled from "styled-components";

import theme from "prism-react-renderer/themes/nightOwl";
theme.plain.backgroundColor = "#1e1e1e";
export const styledTheme = theme;

export const Box = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
`;
export const MainBox = styled(Box)`
  margin-top: 35px;
  flex-direction: column;
  background: #1e1e1e;
  height: calc(100% - 14px);
`;

export const Method = styled.code`
  color: ${props =>
    props.method === "GET"
      ? "#00b894"
      : props.method === "POST"
      ? "#fdcb6e"
      : props.method === "PUT"
      ? "#0984e3"
      : "#e17055"};
`;
export const Url = styled.code`
  color: #fff;
  /* font-family: monospace; */
`;

export const SubBox = styled.div`
  display: flex;
  background: #464646;
  border-radius: 5px;
  display: flex;
`;

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  width: 100%;
  background: red;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

export const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;
