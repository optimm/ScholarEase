import styled from "styled-components";
import * as mq from "../mediaQueries";

export const SearchBarWrapper = styled.div`
  width: 40%;
  margin: auto;
  height: 50px;
  margin-top: 5vh;
`;

export const AllUsersWrapper = styled.div`
  min-height: calc(90vh - 70px);
`;

export const AllUsersCardWrapper = styled.div`
  margin: 5vh 0px;
  margin-top: 6vh;
  width: 100%;
  padding: 0% 6%;
  display: grid;
  row-gap: 40px;
  column-gap: 40px;
  grid-template-columns: repeat(5, 1fr);
  ${mq.mfn(1300)} {
    column-gap: 25px;
  }

  ${mq.mfn(1200)} {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 70px;
  }
`;
