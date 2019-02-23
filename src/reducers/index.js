import projects from "./projects";
import devices from "./devices";
import requests from "./requests";
import { combineReducers } from "redux";

export default combineReducers({
  projects,
  devices,
  requests,
});
