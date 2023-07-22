import styled from "styled-components";
import { backgroundGeneral } from "../globalStyle";

export const UserCardWrapper = styled.div`
  height: 290px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 0px 0px 5px 5px;

  .image-section {
    width: 100%;
    height: 200px;
    background: ${(props) => (props.loading ? "white" : `url(${props.image})`)};
    ${backgroundGeneral}
    ${(props) =>
      props.loading &&
      "opacity: 0.7; animation: skeleton-loading 1s linear infinite alternate;"}
  }
  .data-section {
    width: 100%;
    height: 90px;
    padding: 10px;
  }
  .name {
    margin-top: 5px;
    font-size: 14px;
  }
  .user-name {
    font-weight: 600;
    font-size: 18px;
  }
  .user-button {
    margin-top: 5px;
    display: flex;
    gap: 10px;
  }
`;
