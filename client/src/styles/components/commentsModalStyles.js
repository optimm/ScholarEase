import styled from "styled-components";
import { flexch } from "../globalStyle";

export const CommentsWrapper = styled.div`
  height: 45vh;
  padding: 0 1%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentSingle = styled.div`
  .image-section {
    width: 30px;
  }
  .text-section {
    display: flex;
    flex-direction: column;
    width: calc(100% - 120px);
    font-size: 0.88rem;
  }
  span {
    font-weight: 600;
  }
  .action-section {
    width: 65px;
  }
  .action-button {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 1rem;
    background: white;
    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }
`;

export const AddCommentSection = styled.form`
  height: 60px;
  ${flexch}
  justify-content:space-between;

  .input-section {
    width: 75%;
  }
  .button-section {
    width: 20%;
    height: 80%;
    ${flexch}
  }
`;
