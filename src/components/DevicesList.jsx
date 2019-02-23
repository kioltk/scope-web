import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";

const DevicesList = styled.div`
  padding-top: 30px;
`;
const Device = styled.div`
  margin: 5px 14px;
  padding: 10px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #2a2a2a;
  }
  ${props => props.selected && "background: #3A3A3A;"}
`;
const DeviceName = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.selected ? "#fff" : "#9C9C9C")};
`;
const DeviceDescription = styled.div`
  font-size: 10px;
  color: ${props => (props.selected ? "#f0f0f0" : "#9C9C9C")};
`;
const List = ({ devices }) => {
  console.log("Devices are", devices);
  return (
    <DevicesList>
      {devices &&
        devices.map(device => (
          <Device selected={device.selected}>
            <DeviceName selected={device.selected}>{device.deviceName}</DeviceName>
            <DeviceDescription>{device.deviceDescription}</DeviceDescription>
          </Device>
        ))}
    </DevicesList>
  );
};


export default connect(state => ({ devices: state.devices.list }))(List);
