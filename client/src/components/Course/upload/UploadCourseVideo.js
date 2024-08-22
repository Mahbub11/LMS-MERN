import { IconButton, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ReactComponent as FileUploadOutline } from "../../../Assets/Svgs/FileUploadOutline.svg";
import { ReactComponent as RemoveItemOutline } from "../../../Assets/Svgs/RemoveOutline.svg";
import { GlobalContext } from "../../../Context/global-context";
const uploadContentArray = [
  {
    type: "file",
    id: 1,
    value: "",
  },
];
export default function UploadCourseVideo({onButtonClick }) {
  // const { next } = navigation;
  // const { previous } = navigation;
  const [state, dispatch] = useContext(GlobalContext);
  const [arr, setArr] = React.useState(state.sectioncontent || uploadContentArray);
  const [sectiontitle,setSectiontitle]= React.useState(state.sectiontitle || "")

  const fileUploadHandleChange = (event) => {
    const index = event.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = event.target.files[0].name;
      console.log(newArr);
      return newArr;
    });
  };
  const handleCourseContent = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "file",
          value: "",
        },
      ];
    });
  };
  const removeReqItem=(index)=>{
    console.log(index);
    const newReqList = arr.splice(0, index);
    setArr(newReqList);
  }
  const submitForm = (e) => {
   e.preventDefault();
   dispatch({
    type: "STORE_COURSE_CONTENT",
    sectiontitle:sectiontitle,
    sectioncontent:arr
    
  })
    onButtonClick('pagethree')
    // next()
  };

  return (
    <div className="p-2 flex:col h-screen justify-between">
    <h2 className="text-center p-1 text-xl mt-10">Upload Course Content</h2>
    <div className="flex p-2 justify-around gap-5">
      <div className="p-2 mt-5 flex flex-col w-[100%]">
     
        <TextField
          required
          fullWidth
          id="title"
          label="Section Title"
          name="title"
          autoComplete="title"
          value={sectiontitle}
          onChange={(e)=> setSectiontitle(e.target.value)}
        />
        <button
          className="border border-w-[3px] p-1 mt-3"
          onClick={handleCourseContent}
        >
          Add Content
        </button>

        {arr.map((item, i) => {
          return (
            <TextField
              variant="standard"
              type="text"
              id={i}
              value={item.value}
              InputProps={{
                endAdornment: (
                  <div className="flex p-2">
                    <IconButton component="label">
                      <FileUploadOutline
                      // onClick={setUploadFileName(fileInput.current?.files[0]?.name)}
                      />
                      <input
                        styles={{ display: "none" }}
                        type="file"
                        hidden
                        id={i}
                        onChange={fileUploadHandleChange}
                        name="[licenseFile]"
                      />
                    </IconButton>
                    <IconButton component="label">
                      <RemoveItemOutline onClick={(e)=> removeReqItem(i)} />
                    </IconButton>
                  </div>
                ),
              }}
            />
          );
        })}
        {/* <button className="border border-w-[3px] p-1 mt-3">Add Course </button> */}
      </div>

      <div className="border-l-2 p-1 w-[100%] mt-[3rem]">
        <h2 className="text-center underline">Added Course Preview</h2>
      </div>
    </div>
    <div className="flex justify-around mt-10">
        <button className="border-2 rounded-md w-[20%] p-1" onClick={() => onButtonClick("pageone")}>
        BACK
      </button>
      <button onClick={submitForm} className="w-full btn btn-primary border-2 rounded-md text-center p-1" >
          NEXT
        </button>
    </div>
  </div>
  );
}
