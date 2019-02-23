import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import ProjectsList from "./ProjectsList";
import DevicesList from "./DevicesList";
import RequestsList from "./Requests/RequestsList";

const Navigation = styled.div`
  display: flex;
`;
const Projects = styled.div`
  width: 104px;
  height: 100vh;
  background: #232323;
`;
const Devices = styled.div`
  width: 154px;
  height: 100vh;
  background: #262626;
`;
const Requests = styled.div`
  flex: 1;
  height: 100vh;
  background: #323232;
`;
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navigation style={{ background: "black" }}>
          <Projects>
            <ProjectsList />
          </Projects>
          <Devices>
            <DevicesList />
          </Devices>
          <Requests>
            <RequestsList />
          </Requests>
        </Navigation>
      </div>
    );
  }
}

export default App;
