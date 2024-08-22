import React, { useContext, useState } from "react";
import "react-step-progress/dist/index.css";
import { AddCourseDescription } from "./AddCourseDescription";
import PreviewCourse from "./PreviewCourse";
import MultiStepProgressBar from "../../components/Progressbar/MultiStepProgressBar";
import CourseSections from "./CourseSections";

export default function SetpContainer() {
  const [page, setPage] = useState("pagetwo");

  const nextPage = (page) => {
    setPage("");
    setPage(page);
    console.log(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div className="w-full h-full flex:col justify-around">
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <AddCourseDescription onButtonClick={nextPage} />,
          pagetwo: <CourseSections ></CourseSections>,
          pagethree: <PreviewCourse onButtonClick={nextPage} />,
        }[page]
      }
    </div>
  );
}
// export const ProgressB = () => {
//   const [state, dispatch] = useContext(GlobalContext);

//   const [learningOutcomes, setLearningOutcomes] = React.useState([]);
//   const [requirnments, setReqirnments] = React.useState([]);
//   const [title, setTitle] = React.useState();
//   const [subtitle, setsubTitle] = React.useState();
//   const [description, setDescription] = React.useState();
//   const [price, setPrice] = React.useState();
//   const [discount, setDiscount] = React.useState();

//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description:"",
//     price: "",
//     discount: "",
//     learningOutcomes: [],
//     requirnments: [],
//   })
//  console.log(formData)

//   const handleInputData = input => e => {
//     // input value from the form
//     const {value } = e.target;
//     //updating for data state taking previous state and then adding new value to create new object
//     setFormData(prevState => ({
//       ...prevState,
//       [input]: value
//   }));
//   }

//   // Object.keys(formData).map((value,i)=>{
//   // console.log(formData[value].length)
//   // })

//   const lOutcomes=(value)=>{
//     setFormData(prevState => ({
//       ...prevState,
//       'learningOutcomes': value
//   }));
//   }
//   const requirnment=(value)=>{
//     setFormData(prevState => ({
//       ...prevState,
//       'requirnments': value
//   }));
//   }
//   function step1Validator() {
//     dispatch({
//       type: "STORE_COURSE_DESCRIPTION",

//     });

//     return true
// }

// const dd= 'fff'
//   const step1Content = <UploadCourse  handleFormData={handleInputData} lOutcomes={lOutcomes}
//   requirnment={requirnment} dd={dd}
//     ></UploadCourse>
//   const step2Content =<UploadCourseVideo></UploadCourseVideo>
//   const step3Content = <h1>Step 3 Content</h1>;

//   function step2Validator() {
//     // return a boolean

//     return true
//   }

//   function step3Validator() {
//     // return a boolean
//   }

//   function onFormSubmit(formData) {
//     console.log(formData)
//   }

//   return (
//       <StepProgressBar
//       startingStep={0}
//       onSubmit={(e)=>onFormSubmit(formData)}
//       steps={[
//         {
//           label: "Add Course Description",
//           name: "step 1",
//           content: step1Content,
//           validator:step1Validator
//         },
//         {
//           label: "Upload Course Content",
//           name: "step 2",
//           content: step2Content,
//           validator: step2Validator
//         },
//         {
//           label: "Review Detiles",
//           name: "step 3",
//           content: step3Content,
//           validator: step3Validator
//         },
//       ]}
//     />
//    );
// };
