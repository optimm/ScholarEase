import styled from "styled-components";
import { flexch, flexcv } from "../globalStyle";

export const FooterWrapper = styled.div`
  margin-top: 5vh;
  height: 150px;
  width: 100%;
  ${flexcv}
  gap:15px;
  .icons-section {
    ${flexch}
    gap:25px;
    font-size: 1.5rem;
    color: var(--text-4);
  }
  .text-section {
    font-size: 1rem;
    color: var(--text-3);
  }
`;
