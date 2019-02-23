import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const ProjectsList = styled.div`
  padding-top: 30px;
`;
const Project = styled.div`
  margin: 5px;
  padding: 10px 5px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #2a2a2a;
  }
  ${props => props.selected && "background: #aa4465;"};
`;
const ProjectTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.selected ? "#ffffff" : "#9C9C9C")};
`;
const List = ({ projects }) => {
  console.log("Received projects from redux:", projects);
  return (
    <ProjectsList>
      {projects &&
        projects.map(project => (
          <Project key={project.projectName} selected={project.selected}>
            <ProjectTitle selected={project.selected}>
              {project.projectName}
            </ProjectTitle>
          </Project>
        ))}
    </ProjectsList>
  );
};

export default connect(state => ({ projects: state.projects.list }))(List);
