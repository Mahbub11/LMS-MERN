import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as EditIconBtn } from "../../../Assets/Svgs/EditIcon.svg";
import { ReactComponent as ArrowDownBtn } from "../../../Assets/Svgs/ArrowDown.svg";
import { ReactComponent as CrossButtonIcon } from "../../../Assets/Svgs/RemoveOutline.svg";
import { Button } from "@mui/base";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextareaAutosize, TextField } from "@mui/material";
import {
  generateVideoThumbnails,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";
import UploadFilesService from "../../../services/UploadFilesService";
import { GlobalContext } from "../../../Context/global-context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function CourseSection({ props, setTitle }) {
  const { title, courseContent, description, _id } = props;
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [sectionVideoContent, setSectionVideoContent] = useState([]);
  const [accomplished, setaccomplished] = useState(true);
  const [progress, setProgress] = useState();
  const [fileInfo, setFileInfo] = useState();
  const [state, dispatch] = useContext(GlobalContext);
  const course = state.courseDescriptionReducer;

  const fileInputRef = useRef();

  const SectionDialogueHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function getFiles() {
      await axios
        .get(`http://localhost:3006/api/v1/course/files/${_id}`)
        .then((res) => {
          const finalData=res.data.data.sort((a,b)=> (a.order > b.order) ? 1:-1)
          setSectionVideoContent(finalData);
          dispatch({
            type: "STORE_COURSE_CONTENT",
            sectioncontent:finalData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getFiles();

    if (video) {
      importFileandPreview(video).then((res) => {
        // video['videoUrl']= res
        // setSectionVideoContent([...sectionVideoContent, video]);
        setVideoUrl(res);
      });
    }
  }, [video, accomplished, progress]);

  // console.log(getDuration(video));
  // const handleContentRemove = (index) => {
  //   const newTimesList = sectionVideoContent.splice(0, index);
  //   setSectionVideoContent(newTimesList);
  //   const videoUrlList = videoUrl.splice(0, index);
  //   setVideoUrl(videoUrlList);
  // };

  const handleUpload = () => {
    const content = {
      file: video,
      sectionId: _id,
    };
    UploadFilesService.upload(content, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        // this.setState({
        //   message: response.data.message,
        //   isError: false
        // });

        fileInputRef.current.value = "";
        setVideo(null);
        setVideoUrl(null);

        dispatch({
          type: "STORE_COURSE_CONTENT",
          sectioncontent: response.data.content,
        });
        return UploadFilesService.getFiles();
      })
      .then((files) => {
        setFileInfo(files.data);
      })
      .catch((error) => {
        console.log(error);
        // this.setState({
        //   progress: 0,
        //   message: "Could not upload the file!",
        //   currentFile: undefined,
        //   isError: true
        // });
      });
  };

  const handleremoveContent = async (id) => {
    await axios
      .delete(`http://localhost:3006/api/v1/course/files/${id}`)
      .then((res) => {
        sectionVideoContent.filter((content) => content._id !== id);
        setaccomplished(!accomplished);
      });
    setVideo("");
  };

  // drag drop
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...sectionVideoContent];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    newItems.forEach((item, index) => {
      item.order = index;
    });
    

    setSectionVideoContent(newItems);
    updateTodo(newItems)
    console.log(result);

    console.log({ newItems });
  };
  const updateTodo = (data) => {
    axios
      .put(`http://localhost:3006/api/v1/course/update-content`, data)
      .then((res) => {
        console.log(res)

      })
      .catch((error) => {
        // toast.error('Something went wrong')
      });
  };

  return (
    <div className="overflow-y-scroll">
      <Accordion className="mt-5">
        <AccordionSummary
          expandIcon={<ArrowDownBtn />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex gap-3">
            <Typography>{title}</Typography>
            <span onClick={SectionDialogueHandler}>
              {" "}
              <EditIconBtn className="mt-[3px]"></EditIconBtn>{" "}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <p>{description}</p>
            <div className=" p-2">
              <div>
                <div className="flex justify-between">
                  <input
                    type="file"
                    id="inputfile"
                    multiple
                    ref={fileInputRef}
                    accept="video/*,.pdf,.doc"
                    onChange={(e) => {
                      if (e.target.files?.length > 0) {
                        setVideo(e.target.files[0]);
                      }
                    }}
                  />

                  <button
                    onClick={handleUpload}
                    className="border-2 rounded-md text-sm p-2 mb-3"
                  >
                    {" "}
                    Upload
                  </button>
                </div>

                <div className="relative ">
                  <video
                    className="w-40 h-40 p-1 border-none shadow-sm mt-5"
                    controls
                    id="video"
                    src={videoUrl}
                  />

                  <span className="absolute cursor-pointer top-[1rem] opacity-40 left-0">
                    {" "}
                    {/* <CrossButtonIcon onClick={handleUploadContentRemove}></CrossButtonIcon> */}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 p-1 shadow-md ">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {sectionVideoContent.map((content, index) => (
                          <Draggable
                            key={content._id}
                            draggableId={content._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={`flex gap-2 p-1`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="relative w-40 h-50 ">
                                  {/* <video
                                    className=" p-1 border-none shadow-sm mt-5"
                                    controls
                                    id="video"
                                    src={`http://localhost:3006/uploads/content/${content.content}`}
                                  /> */}
                                  <p className="w-full">{content.name}</p>
                                  <span
                                    // onClick={(e) => handleContentRemove(index)}
                                    className="absolute cursor-pointer top-[1rem] opacity-40 right-0"
                                  >
                                    {" "}
                                    <span
                                      onClick={(e) =>
                                        handleremoveContent(content._id)
                                      }
                                    >
                                      <CrossButtonIcon></CrossButtonIcon>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Dialog open={open}>
        <DialogTitle>
          <div className="flex justify-between">
            <h2>Edit Section </h2>
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
                name="title"
                defaultValue={title}
                autoComplete="family-name"
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                defaultValue={description}
                placeholder="Section Detailes"
                className="bg-gray-500 mt-2 rounded-md w-full p-1 border-2"
              ></textarea>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={SectionDialogueHandler}
            className="border-2 p-1 text-center rounded-md"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
