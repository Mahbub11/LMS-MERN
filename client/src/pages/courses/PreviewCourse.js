import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../Context/global-context";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as EditIconBtn } from "../../Assets/Svgs/EditIcon.svg";
import { ReactComponent as ArrowDownBtn } from "../../Assets/Svgs/ArrowDown.svg";
import { Typography } from "@mui/material";
import CoursePreviewAccordion from "../../components/Course/upload/CoursePreviewAccordion";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { sectionContentHelper } from "../../services/sectionContentHelper";
import moment from 'moment'


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

export default function PreviewCourse({ onButtonClick }) {
  const [addSection, setAddSection] = useState(false);
  const [accordionList, setAccordionList] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [state, dispatch] = useContext(GlobalContext);
  const [isBlury, setBlury] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [contentId, setContentId] = useState();
  const [played, setPlayed] = useState(0);
  const [lastPlayTime,setLastPlayTime]=useState()

  const playerRef= useRef()
  console.log(state.courseContentReducer.sectioncontent);

  useEffect(() => {
    async function getCourseSection() {
      await axios
        .get(
          `http://localhost:3006/api/v1/course/get-sections/${"64e8b94b27a16a5a0d7f24c3"}`
        )
        .then((res) => {
          const { data } = res.data;
          dispatch({
            type: "STORE_COURSE_SECTION",
            sectionInfo: (data)
          });
          setAccordionList([...accordionList, ...data]);
        });
    }

    getCourseSection();
    // playerRef.current.seekTo(lastPlayTime, 'seconds');
  }, []);

  const setOpenHandler = (id = null) => {
    setLastPlayTime(localStorage.getItem(id) ?localStorage.getItem(id) :0)
    setContentId(id);
    setOpen(!isOpen);
  };
  const closeVideoPlayer=()=>{
     localStorage.setItem(contentId,played)
     setOpen(false)
  }

  return (
    <div className={`${isOpen ? "" : ""} mt-10`}>
      <Typography variant="h6" marginTop="2rem" textAlign="center" gutterBottom>
        Preview Component
      </Typography>

      <div className="w-[40%] m-auto mt-10 flex:col flex-col-reverse">
        {accordionList?.map((section, index) => {
          return (
            <div className="mt-4">
              <div className="flex justify-between p-1">
                <p className="text-sm font-thin">Total Lecture {section.Sections.length}</p>
                <p className="text-sm font-thin">{moment.utc(section.totalDuration*1000).format('mm:ss')} min</p>
              </div>
              <CoursePreviewAccordion
                key={index}
                props={section}
                setTitle={setTitle}
                setBlury={setBlury}
                setOpenHandler={setOpenHandler}
                setDescription={setDescription}
              ></CoursePreviewAccordion>
            </div>
          );
        })}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isOpen}
          onClose={closeVideoPlayer}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={isOpen}>
            <Box sx={style}>
              <div
                className={`rounded-md p-2 w-full h-full m-auto flex justify-center`}
              >
                <sapn className="p-2 cursor-pointer" onClick={closeVideoPlayer}>
                  <ArrowDownBtn></ArrowDownBtn>
                </sapn>
                <ReactPlayer
                 
                 onProgress={(progress) => {
                  setPlayed(progress.playedSeconds);
                }}
                  controls={true}
                  url={`http://localhost:3006/uploads/content/${contentId}`}
                ></ReactPlayer>
              </div>
            </Box>
          </Fade>
        </Modal>

        {/* <div className={`${isOpen ? 'absolute' : "hidden"} rounded-md p-2 top-[10%] right-[10%] z-30`}>
          <sapn className='p-2 cursor-pointer' onClick={setOpenHandler}><ArrowDownBtn></ArrowDownBtn></sapn>
           <ReactPlayer controls={true} url={`http://localhost:3006/uploads/content/${contentId}`}></ReactPlayer>
        </div> */}
      </div>

      {/* <div className='flex p-2 mt-10 gap-10'>
     <button className="btn btn-secondary mt-10 border-2 rounded-md w-full p-1" onClick={previousPage}>
        BACK
      </button>
      <button className="btn btn-secondary mt-10 border-2 rounded-md w-full p-1">
        SAVE
      </button>
     </div> */}
    </div>
  );
}
