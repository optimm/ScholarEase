import { Avatar, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCommentsQuery,
} from "../app/services/projectApi";
import {
  AddCommentSection,
  CommentSingle,
  CommentsWrapper,
} from "../styles/components/commentsModalStyles";
import "../styles/modal.css";
import { SoloButton } from "../styles/pages/profileStyles";
import commentSchema from "../validationSchemas/comment";
import { createNotification } from "./Notification";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { trimAll } from "../util/utilFunctions";
import { CommentLoader } from "./Loaders";

const CommentsModal = ({ show, setShow, isMine }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: async (values) => {
      values = trimAll(values);
      if (!isAuthenticated) {
        createNotification(`Please Login First`, "error", 2000);
        navigate("/login");
      }
      if (editComment) {
        const { data: editCommentData, error: editCommentError } =
          await editCommentFn({
            id,
            body: { commentId: editCommentId, commentText: values.comment },
          });

        if (editCommentData?.success) {
          createNotification(editCommentData?.msg, "success", 2000);
          resetForm();
        } else if (!editCommentError?.data?.success) {
          createNotification(editCommentError?.data?.msg, "error", 2000);
        }
        setEditComment(false);
      } else {
        const { data: commentData, error: commentError } = await addComment({
          id,
          body: values,
        });

        if (commentData?.success) {
          createNotification(commentData?.msg, "success", 2000);
          resetForm();
        } else if (!commentError?.data?.success) {
          createNotification(commentError?.data?.msg, "error", 2000);
        }
      }
    },
  });

  const { isAuthenticated, myData } = useSelector((state) => state.me);
  const { data, isLoading } = useGetCommentsQuery({ id });

  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editCommentFn] = useEditCommentMutation();
  const comments = data?.data?.comments;

  const [blankLoader, setBlankLoader] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    let success = data?.success;
    if (isLoading) {
      setBlankLoader(true);
    } else if (!isLoading && success === true) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isLoading, data]);

  const handleDeleteComment = async ({ commentId }) => {
    const { data: deleteCommentData, error: deleteCommentError } =
      await deleteComment({ id, body: { commentId } });
    if (deleteCommentData?.success) {
      createNotification(deleteCommentData?.msg, "success", 2000);
      resetForm();
    } else if (!deleteCommentError?.data?.success) {
      createNotification(deleteCommentError?.data?.msg, "error", 2000);
    }
  };
  const handleEditComment = ({ commentId, commentText }) => {
    setEditComment(true);
    setEditCommentId(commentId);
    setFieldValue("comment", commentText);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading || blankLoader ? (
          <CommentLoader />
        ) : (
          <CommentsWrapper auth={isAuthenticated}>
            {comments?.map((item, index) => {
              let isMyComment = false;
              if (isAuthenticated) {
                if (myData?._id === item?.user?._id) isMyComment = true;
              }
              if (editComment && editCommentId === item?._id) {
                return <></>;
              }
              return (
                <CommentSingle className="flex-justify">
                  <div className="image-section">
                    <Avatar sx={{ width: 30, height: 30 }} />
                  </div>
                  <div className="text-section">
                    <span>{item?.user?.username}</span>
                    {item?.comment}
                  </div>
                  <div className="action-section flex-justify">
                    {(isMine || isMyComment) && (
                      <button
                        className="action-button"
                        onClick={() =>
                          handleDeleteComment({ commentId: item?._id })
                        }
                      >
                        <AiOutlineDelete />
                      </button>
                    )}
                    {isMyComment && (
                      <button
                        className="action-button"
                        onClick={() =>
                          handleEditComment({
                            commentId: item?._id,
                            commentText: item?.comment,
                          })
                        }
                      >
                        <RiEditFill />
                      </button>
                    )}
                  </div>
                </CommentSingle>
              );
            })}
          </CommentsWrapper>
        )}
      </Modal.Body>
      {isAuthenticated && (
        <Modal.Footer>
          <AddCommentSection className="flex-justify" onSubmit={handleSubmit}>
            <div className="input-section">
              <TextField
                name="comment"
                label="Comment"
                variant="outlined"
                color="secondary"
                className="form-input"
                fullWidth
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 200 }}
              />
            </div>
            <div className="button-section">
              <SoloButton
                notActive={
                  errors?.comment || values.comment?.length < 1 ? true : false
                }
                type="submit"
                disabled={errors?.comment}
              >
                {editComment ? "Update" : "ADD"}
              </SoloButton>
            </div>
          </AddCommentSection>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommentsModal;
