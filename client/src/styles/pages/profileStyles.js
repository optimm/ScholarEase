import styled from "styled-components";
import { flexch } from "../globalStyle";

export const ProfileWrapper = styled.div`
  padding: 0 6%;
`;

export const TopWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  gap: 40px;
  height: 35vh;

  .text-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 5px;
  }
  .username-section {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  .username {
    font-size: 1.8rem;
    font-weight: 700;
  }
  .followers-section {
    display: flex;
    gap: 50px;
    font-size: 1.1rem;
  }
  .follower-section-sub {
    cursor: pointer;
  }
  span {
    font-weight: 700;
  }
  .name-section {
    font-size: 1rem;
  }
  .name {
    font-weight: 600;
  }
  .bio {
    margin-top: 5px;
    font-size: 0.9rem;
    line-height: 1.2;
  }
  .complete-profile {
    margin-top: 0px;
    font-size: 1rem;
    font-weight: 500;
    color: green;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  height: 10vh;
  margin-top: 5vh;
  border-bottom: 1px solid var(--sepration);

  .wrapper-button {
    background: inherit;
    color: var(--text-3);
    font-weight: 700;
    gap: 7px;
    font-size: 0.9rem;
    border-radius: 0px;
    border-bottom: 3px solid white;
  }

  svg {
    font-size: 1rem;
  }
  .active {
    color: var(--primary-color);
    border-bottom: 3px solid var(--primary-color);
  }
`;

export const MoreDataWrapper = styled.div`
  width: 100%;
  padding-bottom: 30px;
  .about-head {
    margin-top: 50px;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .about {
    width: 100%;
    margin-top: 20px;
    font-size: 1rem;
    color: var(--text-2);
    line-height: 1.4;
  }
  .profiles-section {
    display: flex;
    gap: 25px;
    margin-top: 20px;
  }

  .extra-options {
    display: flex;
    margin-top: 50px;
    padding: 20px 0px;
    gap: 20px;
  }
  .extra-button {
    height: 40px;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
    width: 200px;
  }
`;

export const ExtraButton = styled.button`
  height: 35px;
  font-size: 0.88rem;
  font-weight: 500;
  gap: 5px;
  background: ${(props) => props.primary && "var(--primary-color)"};
  color: ${(props) => (props.primary ? "white" : "var(--text-1)")};
  border-radius: 5px;
  width: 170px;
`;

export const SoloButton = styled.button`
  font-size: 1rem;
  height: 40px;
  width: 130px;
  gap: 7px;
  border-radius: 5px;
  color: var(--text-white);
  background: ${(props) =>
    props?.notActive ? "var(--primary-color-glass)" : "var(--primary-color)"};
`;

export const ProfileIndv = styled.div`
  ${flexch}
  height: 40px;
  width: 40px;
  border-radius: 50%;
  font-size: 1.4rem;
  background: var(--primary-color-light);
  color: var(--primary-color);
  cursor: pointer;
`;
