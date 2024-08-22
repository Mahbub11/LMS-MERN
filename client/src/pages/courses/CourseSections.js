import { TextField, Typography, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as AddAsExpandButton } from "../../Assets/Svgs/Addbutton.svg";
import { Button } from "@mui/base";
import {
  generateVideoThumbnails,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";
import CourseSection from "../../components/Course/upload/CourseSection";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ReactComponent as CrossButtonIcon } from "../../Assets/Svgs/RemoveOutline.svg";
import axios from "axios";
import { GlobalContext } from "../../Context/global-context";

// const Sections = [
//   {
//     title: "New Section",
//     descriptioption: null,
//   },
// ];
export default function CourseSections() {
  const [addSection, setAddSection] = useState(false);
  const [accordionList, setAccordionList] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [state, dispatch] = useContext(GlobalContext);

  console.log(state.courseDescriptionReducer._id);

  const addAccordion = () => {
    setAddSection(!addSection);
  };

  useEffect(() => {
    async function getCourseSection() {
      await axios
        .get(
          `http://localhost:3006/api/v1/course/get-sections/${"64e8b94b27a16a5a0d7f24c3"}`
        )
        .then((res) => {
          const { data } = res.data;
          console.log(data);

          dispatch({
            type: "STORE_COURSE_SECTION",
            sectionInfo: data,
          });
          setAccordionList([...accordionList, ...data]);
        });
    }

    getCourseSection();
  }, []);

  const addNewAccordion = async () => {
    setAddSection(!addSection);

    const data = {
      title,
      description,
      courseId: "64e8b94b27a16a5a0d7f24c3",
    };
    await axios
      .post("http://localhost:3006/api/v1/course/add-section", data)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        setAccordionList([
          ...accordionList,
          {
            _id: data._id,
            courseId: data.courseId,
            title: data.title,
            description: data.description,
          },
        ]);

        dispatch({
          type: "STORE_COURSE_SECTION",
          sectionInfo: accordionList,
        });

        // {
        //     _id:data._id,
        //   courseId: data.courseId,
        //   title: data.title,
        //   description: data.description
        //   },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(acc);

  return (
    <div className="p-5">
      <Typography variant="h6" marginTop="2rem" textAlign="center" gutterBottom>
        Upload Component
      </Typography>
      <button
        onClick={addAccordion}
        className="w-full flex justify-end rounded-md p-2"
      >
        Add Section
      </button>
      <div>
        {accordionList?.map((section, index) => {
          return (
            <CourseSection
              key={index}
              props={section}
              setTitle={setTitle}
              setDescription={setDescription}
            ></CourseSection>
          );
        })}
      </div>

      <Dialog open={addSection}>
        <DialogTitle>
          <div className="flex justify-between">
            <h2>Add Section </h2>
            <CrossButtonIcon></CrossButtonIcon>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex justify-between">
            <div className="flex:col gap-5">
              <TextField
                required
                fullWidth
                id="section-title"
                label="Section Title"
                name="Title"
                autoComplete="family-name"
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextareaAutosize
                required
                fullWidth
                sx={{
                  borderWidth: "10px",
                  bgcolor: "#222",
                  color: "#BADA55",
                }}
                id="description"
                placeholder="Description"
                multiline
                onChange={(e) => setDescription(e.target.value)}
                minRows={3}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={addNewAccordion}
            className="border-2 p-1 text-center rounded-md"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// section descriptio first
// course Section related to content
//
