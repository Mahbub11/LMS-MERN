import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../Context/global-context";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as EditIconBtn } from "../../../Assets/Svgs/EditIcon.svg";
import { ReactComponent as ArrowDownBtn } from "../../../Assets/Svgs/ArrowDown.svg";
import { ReactComponent as VideoIcon } from "../../../Assets/Svgs/VideoIcon.svg";
import { Typography } from "@mui/material";
import { sectionContentHelper } from "../../../services/sectionContentHelper";
import moment from 'moment'


export default function CoursePreviewAccordion({ onButtonClick, props,setOpenHandler}) {
  const [state, dispatch] = useContext(GlobalContext);
  const sectionDetails = state.CourseSectionReducer;
  const [sectionVideoContent, setSectionVideoContent] = useState([]);
  const { title, courseContent, description, _id } = props;
  const [videoPreview,setVideopreview] = useState(false);
 
  console.log(state.courseContentReducer.sectioncontent
    );
  const previousPage = () => {
    onButtonClick("pagetwo");
  };

  useEffect(() => {
    async function getFiles() {
      await axios
        .get(`http://localhost:3006/api/v1/course/files/${_id}`)
        .then((res) => {
          const finalData=res.data.data.sort((a,b)=> (a.order > b.order) ? 1:-1)
          setSectionVideoContent(finalData);
          setSectionVideoContent(finalData);
          dispatch({
            type: "STORE_COURSE_CONTENT",
           //  sectioncontent: sectionContentHelper(res.data.data), // assign totalduration to each item 
             sectioncontent: (finalData),
          });
          
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getFiles();

  }, []);

  const handleVideoOverlay=(contentId)=>{

    console.log(contentId);
    // setVideopreview(!videoPreview)
    setOpenHandler(contentId)
    // setBlury(true)
    

  }
  return (
    <>
      <div className={``}>
        <p>{state.courseContentReducer.sectioncontent.totalLectures}</p>
        <Accordion className="">
          <AccordionSummary
            expandIcon={<ArrowDownBtn />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="flex gap-3">
              <Typography>{title}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div className="flex justify-between">
                <p className="w-[100%]">{description}</p>
              </div>
              <div className="mt-5 p-2">
                <div className="flex:col justify-between gap-[3rem] p-1">
                  {sectionVideoContent.map((content, index) => {
                    return (
                      <>
                        <div key={index} className="h-50 mt-2 flex justify-between cursor-pointer"
                        onClick={(e)=> handleVideoOverlay(content.content)}>
                          {/* <video
                          className=" p-1 border-none shadow-sm mt-5"
                          controls
                          id="video"
                          src={`http://localhost:3006/uploads/content/${content.content}`}
                        /> */}
                          <div className="flex gap-6  ">
                            <span className="mt-[7px]">
                              <VideoIcon></VideoIcon>
                            </span>
                            <p className="w-full">{content.name}</p>
                          </div>
                          <span> {moment.utc(content.duration*1000).format('mm:ss')} min
                            
                            </span>
                        </div>
                        <div className="h-[1px] w-[100%] m-auto bg-gray-100 opacity-30 mt-2"></div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* <div className='flex p-2 mt-10 gap-10'>
     <button className="btn btn-secondary mt-10 border-2 rounded-md w-full p-1" onClick={previousPage}>
        BACK
      </button>
      <button className="btn btn-secondary mt-10 border-2 rounded-md w-full p-1">
        SAVE
      </button>
     </div> */}
      </div>

     
      {/* <div className={`${isOpen ? 'absolute' : 'hidden'} rounded-md z-100000 left-0 right-0 ml-auto mr-auto`}>

        <div className="bg-green-800 rounded-md p-1">
          <sapn className='p-2 cursor-pointer' onClick={handleVideoOverlay}><ArrowDownBtn></ArrowDownBtn></sapn>
           <ReactPlayer controls={true} url={`http://localhost:3006/uploads/content/${'copyOne-1692992347818-832895529.mp4'}`}></ReactPlayer>
        </div>
       
      </div> */}
    </>
  );
}
