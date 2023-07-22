import { Autocomplete, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useCreateProjectMutation } from "../app/services/projectApi";
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
import { BsCardImage } from "react-icons/bs";
import { trimAll } from "../util/utilFunctions";
import { ButtonLoader } from "../components/Loaders";

export const CreateProject = () => {
  const [create, { isLoading }] = useCreateProjectMutation();
  const { myData } = useSelector((state) => state.me);

  const [image, setImage] = useState(null);
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
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
      if (!image) {
        createNotification("Please select a cover image", "error", 2000);
        return;
      }
      values = trimAll(values);
      let temp = { ...values };
      if (temp.live_link === "") delete temp["live_link"];
      if (temp.github_link === "") delete temp["github_link"];
      if (temp?.tags?.length === 0) delete temp["tags"];
      if (temp?.desc?.length === 0) delete temp["desc"];
      temp.image = image;
      try {
        const data = await create({ body: temp }).unwrap();
        createNotification(data?.msg, "success", 2000);
        resetForm();
        setImage(null);
      } catch (error) {
        createNotification(error?.data?.msg, "error", 2000);
      }
    },
  });

  const handleImageChange = (e) => {
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
            setImage(null);
          }
        } else {
          createNotification("File type not supported", "warning", 2000);
          setFieldValue("image", null);
          e.target.value = "";
          setImage(null);
        }
      }
    };
  };

  return (
    <>
      <Head>
        Post Your Awesome Project, <span>{myData?.username}</span>
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
                helperText={touched.title && errors.title ? errors.title : null}
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
                helperText={touched.desc && errors.desc ? errors.desc : null}
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
                error={touched.github_link && errors.github_link ? true : false}
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
                {isLoading ? <ButtonLoader /> : "Add Project"}
              </button>
            </div>
          </MainForm>
        </MainLeft>
        <MainRight>
          <div className="paper-for-image">
            {image ? (
              <UploadedImage src={image}></UploadedImage>
            ) : (
              <div className="image-wrapper">
                <BsCardImage />
                <div className="text">
                  Cover Image for your project {"(Max 3MB)"}
                </div>
              </div>
            )}
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
  );
};
