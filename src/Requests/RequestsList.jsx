import React from "react";
import styled from "styled-components";
import moment from "moment";
import Resizable from "re-resizable";
import RequestInfo from "./RequestInfo";
import { Box, MainBox, SubBox, Method, Url } from "./shared";
import { connect } from "react-redux";

import store from "../index.js";

const Resizer = styled.div`
  height: 4px;
  width: 20%;
  margin: 10px auto 0;
  background: #464646;
  border-radius: 2px;
  cursor: row-resize;
`;
const Request = styled.div`
  cursor: pointer;
  display: flex;
  &:hover {
    background: #2a2a2a;
  }
  ${props => props.selected && "background: #aa4465;"}
`;
const Header = styled.div`
  display: flex;
  background: #464646;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const HeaderTitle = styled.div`
  color: #fff;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 14px;
  ${props => (props.width ? `width: ${props.width}px;` : "flex: 1;")}
`;

const Requests = styled.div`
  flex: 1;
  overflow: scroll;
`;

const Column = styled.div`
  font-size: 14px;
  font-weight: 600;
  ${props => (props.width ? `width: ${props.width}px;` : "flex: 1;")}
  padding: 4px 8px;
  border-right: 1px solid #2a2a2a;
  &::last-child {
    border-right: none;
  }
  border-bottom: 1px solid #2a2a2a;
  &:hover {
    background: 1px solid #2a2a2a;
  }
  overflow: auto;
`;

const Status = styled.code`
  color: ${props =>
    props.code < 300 ? "#2ECC71" : props.code < 400 ? "#F1C40F" : "#E74C3C"};
`;

const Date = styled.code`
  font-family: monospace;
  color: #898989;
`;

const Filter = styled.input`
  background: #1e1e1e;
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 12px;
  color: #fdfdfd;
  &::placeholder {
    color: #393939;
  }
  font-weight: 600;
  border: none;
  width: 200px;
  margin: 5px;
`;
const Clear = styled.div`
  background: #1e1e1e;
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 12px;
  color: ${props => (props.on ? "#fff" : "#393939")};
  font-weight: 600;
  margin: 5px;
  cursor: ${props => (props.on ? "pointer" : "initial")};
`;
const Footer = styled(SubBox)`
  justify-content: space-between;
`;
const List = ({ requests, selected }) => {
  function selectRequest(e, request) {
    e.preventDefault();
    store.dispatch({
      type: "select",
      request
    });
  }
  function clearRequests(e) {
    store.dispatch({
      type: "clear"
    });
  }

  return (
    <div>
      <Resizable
        enable={{
          top: false,
          right: false,
          left: false,
          bottom: true
        }}
        minHeight={150}
        defaultSize={{
          width: "100%",
          height: "40vh",
          maxHeight: "50vh"
        }}
      >
        <MainBox>
          <Header>
            <HeaderTitle width={50}>Status</HeaderTitle>
            <HeaderTitle width={76}>Method</HeaderTitle>
            <HeaderTitle>URL</HeaderTitle>
            <HeaderTitle width={148}>Date</HeaderTitle>
          </Header>
          <Requests>
            {requests &&
              requests.map(request => (
                <Request
                  key={request.packetId}
                  selected={request.selected}
                  onClick={e => selectRequest(e, request)}
                >
                  <Column selected={request.selected} width={50}>
                    <Status code={request.statusCode}>
                      {request.statusCode}
                    </Status>
                  </Column>
                  <Column width={76}>
                    <Method method={request.requestMethod}>
                      {request.requestMethod}
                    </Method>
                  </Column>
                  <Column>
                    <Url>{request.url}</Url>
                  </Column>
                  <Column width={148}>
                    <Date>
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false
                      }).format(request.startDate * 1000)}
                    </Date>
                  </Column>
                </Request>
              ))}
          </Requests>
          <Footer>
            <Filter placeholder="Filter" />
            <Clear on={requests ? true : false} onClick={e => clearRequests(e)}>
              Clear
            </Clear>
          </Footer>
        </MainBox>
        <Resizer />
      </Resizable>
      <RequestInfo request={selected ? selected : null} />
    </div>
  );
};

export default connect(state => ({
  requests: state.requests.list,
  selected: state.requests.selected
}))(List);
