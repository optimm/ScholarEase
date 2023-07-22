import styled from "styled-components";
import * as mq from "../mediaQueries";

export const AllProjectsWrapper = styled.div`
  min-height: ${(props) =>
    props.feed ? "calc(90vh - 40px)" : "calc(90vh - 70px)"};
`;

export const AllProjectCardWrapper = styled.div`
  padding: ${(props) => (props.noPad ? "0px" : "0% 6%")};
  margin: 5vh 0px;
  margin-top: 6vh;
  width: 100%;

  display: grid;
  row-gap: 40px;
  column-gap: 80px;
  grid-template-columns: repeat(3, 1fr);
  ${mq.mfn(1400)} {
    column-gap: 70px;
  }
  ${mq.mfn(1300)} {
    column-gap: 50px;
  }

  ${mq.mfn(1200)} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 30px;
  }
`;
