import { Autocomplete, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  useEditProjectMutation,
  useGetSingleProjectQuery,
} from "../app/services/projectApi";
import {
  Head,
  MainForm,
  MainLeft,
  MainRight,
  MainWrapper,
  UploadedImage,
} from "../styles/pages/createProjectStyles";
import { tags } from "../util/options";
import createProjectSchema from "../validationSchemas/createProject";
import { createNotification } from "../components/Notification";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { arraysEqual, trimAll } from "../util/utilFunctions";
import { ProfileLoader } from "../components/Loaders";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [update] = useEditProjectMutation();
  const { data, isLoading, isFetching } = useGetSingleProjectQuery(
    { id },
    { skip: err }
  );

  const { myData } = useSelector((state) => state.me);
  const [image, setImage] = useState(null);

  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      live_link: "",
      github_link: "",
      tags: [],
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      values = trimAll(values);
      let temp = { ...values };
      let pData = data?.data;
      if (!pData?.live_link && temp.live_link === "") delete temp["live_link"];
      if (!pData?.github_link && temp.github_link === "")
        delete temp["github_link"];
      if (!pData?.tags && temp?.tags?.length === 0) delete temp["tags"];
      if (!pData?.desc && temp?.desc?.length === 0) delete temp["desc"];

      if (
        pData?.title === temp?.title &&
        pData?.desc === temp?.desc &&
        pData?.live_link === temp?.live_link &&
        pData?.github_link === temp?.github_link &&
        arraysEqual(pData?.tags, temp?.tags) &&
        pData?.image?.url === image
      ) {
        createNotification("Nothing to update", "error", 2000);
        return;
      }
      if (pData?.image?.url !== image) {
        temp.image = image;
      }

      try {
        const updateData = await update({ body: temp, id }).unwrap();
        createNotification(updateData?.msg, "success", 2000);
        navigate(`/projects/${id}`);
      } catch (error) {
        setErr(true);
        createNotification(error?.data?.msg, "error", 2000);
      }
    },
  });

  useEffect(() => {
    if (data?.success) {
      let pData = data?.data;
      setFieldValue("title", pData?.title);
      pData?.desc && setFieldValue("desc", pData?.desc);
      pData?.live_link && setFieldValue("live_link", pData?.live_link);
      pData?.github_link && setFieldValue("github_link", pData?.github_link);
      pData?.tags && setFieldValue("tags", pData?.tags);
      setImage(pData?.image?.url);
    }
  }, [data, setFieldValue]);

  const handleImageChange = (e) => {
    let pData = data?.data;
    const selectedFile = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(selectedFile);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        if (
          selectedFile &&
          (selectedFile.type === "image/jpeg" ||
            selectedFile.type === "image/png" ||
            selectedFile.type === "image/jpg")
        ) {
          if (selectedFile.size <= 3000000) {
            setImage(Reader.result);
          } else {
            createNotification("File size greater than 3MB", "warning", 2000);
            e.target.value = "";
            setImage(pData?.image?.url);
          }
        } else {
          createNotification("File type not supported", "warning", 2000);
          setFieldValue("image", null);
          e.target.value = "";
          setImage(pData?.image?.url);
        }
      }
    };
  };

  return (
    <>
      {isLoading || isFetching ? (
        <ProfileLoader />
      ) : (
        <>
          <Head>
            Edit Your Project, <span>{myData?.username}</span>
          </Head>
          <MainWrapper>
            <MainLeft>
              <MainForm onSubmit={handleSubmit}>
                <div className="form-questions">
                  <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    color="secondary"
                    className="form-input"
                    fullWidth
                    multiline
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && errors.title ? true : false}
                    helperText={
                      touched.title && errors.title ? errors.title : null
                    }
                    readOnly={isLoading}
                  />
                  <TextField
                    name="desc"
                    label="Description"
                    variant="outlined"
                    color="secondary"
                    className="form-input"
                    fullWidth
                    multiline
                    value={values.desc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.desc && errors.desc ? true : false}
                    helperText={
                      touched.desc && errors.desc ? errors.desc : null
                    }
                    readOnly={isLoading}
                  />
                  <TextField
                    name="github_link"
                    label="Github Link"
                    variant="outlined"
                    color="secondary"
                    className="form-input"
                    fullWidth
                    value={values.github_link}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.github_link && errors.github_link ? true : false
                    }
                    readOnly={isLoading}
                    helperText={
                      touched.github_link && errors.github_link
                        ? errors.github_link
                        : null
                    }
                  />
                  <TextField
                    name="live_link"
                    label="Live Link"
                    variant="outlined"
                    color="secondary"
                    className="form-input"
                    fullWidth
                    value={values.live_link}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.live_link && errors.live_link ? true : false}
                    readOnly={isLoading}
                    helperText={
                      touched.live_link && errors.live_link
                        ? errors.live_link
                        : null
                    }
                  />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={tags}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    fullWidth
                    value={values.tags}
                    onChange={(e, newValue) => {
                      setFieldValue("tags", newValue);
                    }}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" placeholder="Tag" />
                    )}
                    readOnly={isLoading}
                  />

                  <button
                    className="submit-button"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Update Project"}
                  </button>
                </div>
              </MainForm>
            </MainLeft>
            <MainRight>
              <div className="paper-for-image">
                <UploadedImage src={image}></UploadedImage>
              </div>
              <input
                type="file"
                id="myfile"
                name="myfile"
                className="file-chooser"
                onChange={(e) => handleImageChange(e)}
              />
            </MainRight>
          </MainWrapper>
        </>
      )}
    </>
  );
};

export default EditProject;
