import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../globalStyle";

export const Head = styled.div`
  width: 100%;
  padding: 0px 6%;
  text-align: center;
  margin-top: 3vh;
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--text-3);
  span {
    color: var(--blue);
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  padding: 0px 6%;
`;

export const MainLeft = styled.div`
  width: 50%;
`;

export const MainForm = styled.form`
  width: 90%;
  margin: 6% 0px;

  .form-questions {
    margin-top: 20px;
    ${flexcv}
    gap:25px;
  }
  .submit-button {
    width: 100%;
    height: 45px;
    background: var(--primary-color);
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
`;
export const MainRight = styled.div`
  width: 50%;
  height: calc(97vh - 100px);
  ${flexcv}
  .paper-for-image {
    height: 47vh;
    width: 78%;
    padding: 20px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 15%),
      0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
    border-radius: 5px;
    ${flexch}
  }
  .image-wrapper {
    height: 100%;
    width: 100%;
    ${flexcv}
    gap:20px;
    font-size: 1rem;
    font-weight: 600;
    border: 3px var(--blue) dashed;
    border-radius: 10px;
  }


  svg {
    font-size: 4rem;
    color: var(--blue);
  }
  .file-chooser {
    margin-top: 30px;
    font-size: 0.88rem;
  }
`;


export const UploadedImage = styled.div`
height: 100%;
width: 100%;
background: url(${(props) => props.src});
${backgroundGeneral}
`;