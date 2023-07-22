import styled from "styled-components";
import { backgroundGeneral } from "../globalStyle";

export const FAllWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FIndvWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  gap: 4%;

  .profile-image {
    height: 50px;
    width: 50px;
    background: url(${(props) => props.url});
    ${backgroundGeneral}

    border-radius: 50%;
  }

  .username {
    font-size: 0.88rem;
    font-weight: 600;
  }
  .name {
    text-transform: capitalize;
    font-size: 0.8rem;
  }
`;
