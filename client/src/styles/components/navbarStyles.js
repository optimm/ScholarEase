import styled from "styled-components";
import { flexch } from "../globalStyle";

export const NavContainerMain = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 6%;
  height: 70px;
  width: 100%;
  background: var(--primary-color);
  position: sticky;
  top: 0px;
  z-index: 10;
  opacity: 95%;
  gap: 2.5%;
`;

export const Logo = styled.div`
  font-family: "Zen Dots", cursive;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 20px;
  color: var(--text-white-light);
  transition: all 0.2s ease;
  &:hover {
    color: var(--text-white);
  }
`;

export const NavContainerRight = styled.div`
  ${flexch}
  gap:2.5vw;
  margin-left: auto;

`;

export const Item = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-white-light);
  transition: all 0.2s ease;
  &:hover {
    color: var(--text-white);
  }
`;

export const NavButton = styled.button`
  width: 100px;
  height: 35px;
  background: white;
  color: var(--primary-color);
  font-size: 14px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.2s ease;
  opacity: 95%;
  &:hover {
    opacity: 100%;
  }
`;
