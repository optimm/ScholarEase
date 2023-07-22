import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import MarkdownIt from "markdown-it";
import "../styles/markdown.css";
import "../styles/modal.css";
const md = new MarkdownIt({ html: true, linkify: true });

const ReadmeFile = ({ show, setShow, readmeData }) => {
  const handleClose = () => setShow(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    let htm = md.render(readmeData?.readmeData);
    setHtml(htm);
  }, [readmeData]);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Readme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ReadmeFile;
