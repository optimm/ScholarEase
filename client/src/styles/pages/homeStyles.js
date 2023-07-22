import styled from "styled-components";
import { backgroundGeneral, flexcv } from "../globalStyle";

export const LandingContainer = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const LandingOverlay = styled.div`
  ${flexcv}
  padding: 0% 6%;
  width: 100%;
  height: 100%;
  background: var(--back-drop);
  color: var(--text-white);
  .section-main {
    text-align: center;
    width: fit-content;
  }
  .text-main {
    font-size: clamp(40px, 5vw, 5vw);
  }
  .text-main-span {
    font-family: "Zen Dots", cursive;
  }
  .text-sub {
    font-size: clamp(16px, 1.5vw, 1.5vw);
    font-weight: 500;
    width: 65%;
    margin: 0% auto;
    margin-top: 3%;
  }
  .button-container {
    display: flex;
    gap: 5px;
    margin-top: 5%;
  }
  .button-main {
    margin: 0% auto;
    height: 75px;
    width: 230px;
    border-radius: 5px;
    font-size: clamp(16px, 1.5vw, 1.5vw);
    background: var(--glass-morph);
    color: var(--text-white);
    transition: all 0.5s ease;
    &:hover {
      background: white;
      color: var(--primary-color);
    }
  }
`;
