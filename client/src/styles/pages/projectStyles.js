import styled from "styled-components";
import { backgroundGeneral, flexcv } from "../globalStyle";

export const ProjectMainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: 0% 6%;

  .main-left {
    width: 50%;
  }
  .data-wrapper {
    margin-top: 8vh;
  }
  .profile-section {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .username {
    font-size: 1rem;
    font-weight: 600;
  }
  .created-at {
    font-size: 0.88rem;
  }

  .title {
    margin-top: 40px;
    font-size: 1.5rem;
    font-weight: 700;
    width: 90%;
    line-height: 1.2;
  }

  .desc {
    margin-top: 15px;
    font-size: 1.1rem;
    width: 90%;
    line-height: 1.2;
  }

  .likes-data {
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  .tags-section {
    margin-top: 25px;
  }
  .tags-head {
    font-weight: 600;
    font-size: 1.3rem;
  }
  .tags {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
  }
  .view-more {
    font-size: 0.88rem;
    color: var(--blue);
    cursor: pointer;
  }
  .links-section {
    margin-top: 25px;
    display: flex;
    gap: 20px;
  }
  .edit-button {
    height: 35px;
    width: 120px;
    gap: 5px;
  }

  .main-right {
    width: 50%;
    ${flexcv}
    align-items:flex-start;
    margin-left: 5%;
  }
  .likes-section {
    margin-top: 20px;
    display: flex;
    gap: 25px;
  }
`;

export const LikesIndv = styled.div`
  padding: 4px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: ${(props) => (props?.checked ? "var(--blue)" : "var(--text-2)")};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background: rgb(0, 0, 0, 0.1);
  }
`;
export const ProjectImageWrapper = styled.div`
  width: 92%;
  height: 50vh;
  position: relative;

  .project-image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background: ${(props) => (props.loading ? "white" : `url(${props.url})`)};
    ${backgroundGeneral}
    ${(props) =>
      props.loading &&
      "animation: skeleton-loading 1s linear infinite alternate;"}
  }
  .project-back {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--primary-color-glass);
    z-index: -1;
    top: -12%;
    left: 8%;
  }
`;

export const AllTagsWrapper = styled.div`
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 10px;
`;

export const TagSingle = styled.div`
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--blue);
  }
`;
