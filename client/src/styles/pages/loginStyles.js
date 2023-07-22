import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../globalStyle";

export const MainWrapper = styled.div`
  ${flexcv}
  height: 100vh;
  width: 100vw;
  background: var(--primary-color-light);
`;

export const MainHomeButton = styled.div`
  ${flexch}
  height:45px;
  width: 45px;
  background: var(--primary-color);
  position: absolute;
  top: 40px;
  left: 40px;
  color: white;
  border-radius: 50%;
`;

export const MainCard = styled.div`
  height: 480px;
  width: 850px;
  background: white;
  margin: auto;
  display: flex;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 15%),
    0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
  border-radius: 5px;
`;

export const MainCardForm = styled.form`
  height: 100%;
  width: 50%;
  padding: 50px 40px 10px 40px;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => (props.login ? "20px" : "10px")};
  }
  .form-head {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-3);
  }
  .form-button {
    height: 35px;
    width: 150px;
    background: var(--primary-color);
    color: white;
    font-size: 0.88rem;
    font-weight: 600;
    margin-top: 15px;
    margin-top: ${(props) => (props.login ? "15px" : "20px")};
  }
  .forgot-password {
    color: var(--text-2);
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
  }

  .MuiFormHelperText-root {
    font-size: 0.7rem;
  }
  .error {
    font-size: 0.88rem;
    color: red;
  }
  .success {
    font-size: 0.88rem;
    color: green;
  }
`;

export const MainCardImage = styled.div`
  height: 100%;
  width: 50%;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const MainCardOverLay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
  width: 100%;
  background: var(--primary-color-glass);
  padding: 50px 40px;
  .heading {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-white);
  }
  .text {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-white);
  }
  .card-button {
    height: 35px;
    width: 150px;
    background: white;
    color: var(--primary-color);
    font-size: 0.88rem;
    font-weight: 600;
  }
`;

export const ForgotPasswdCard = styled.form`
  height: 50vh;
  width: 30%;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 15%),
    0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 45px;
  .form-head {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-3);
  }

  .form-button {
    width: 100%;
    height: 50px;
    background: var(--primary-color);
    color: white;
    font-size: 1.1rem;
  }
`;

export const ResetPasswdCard = styled.form`
  height: 70vh;
  width: 30%;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 15%),
    0px 1px 1px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .form-head {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-3);
  }

  .form-button {
    width: 100%;
    height: 50px;
    background: var(--primary-color);
    color: white;
    font-size: 1.1rem;
  }
`;
