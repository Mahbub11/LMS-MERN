import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { ReactComponent as TickMark } from "../../Assets/Svgs/Tickmark.svg";
import { ReactComponent as RemoveBtnLight } from "../../Assets/Svgs/RemoveLight.svg";
import { GlobalContext } from "../../Context/global-context";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CateoryList } from "../../utlis/CateogryList";

export const AddCourseDescription = ({ onButtonClick }) => {
  // const { next } = navigation;
  const [state, dispatch] = useContext(GlobalContext);
  const data = state.courseDescriptionReducer;
  const [learningOutcomes, setLearningOutcomes] = React.useState(
    data.learningOutcomes || []
  );
  const [requirnments, setReqirnments] = React.useState(
    data.requirnments || []
  );
  const [title, setTitle] = React.useState(data.title || "");
  const [subtitle, setsubTitle] = React.useState(data.subtitle || "");
  const [description, setDescription] = React.useState(data.description || "");
  const [price, setPrice] = React.useState(data.price || "");
  const [discount, setDiscount] = React.useState(data.discount || "");
  let textInput = useRef(null);
  let reqtxtInput = useRef(null);
  const [category, setCateory] = React.useState("");

  console.log(data);
  // useEffect(() => {
  //   lOutcomes(learningOutcomes)
  //   requirnment(requirnments)

  // }, [learningOutcomes,requirnments]);

  const handleCateoryChange = (event) => {
    setCateory(event.target.value);
  };

  const removeItem = (index) => {
    const newTimesList = learningOutcomes.splice(0, index);
    setLearningOutcomes(newTimesList);
  };

  const removeReqItem = (index) => {
    const newReqList = requirnments.splice(0, index);
    setReqirnments(newReqList);
  };
  const submitForm = async () => {
    const data = {
      title: title,
      category: category,
      subtitle: subtitle,
      description: description,
      price: price,
      discount: discount,
      learningOutcomes: learningOutcomes,
      requirenments: requirnments,
    };

    await axios
      .post("http://localhost:3006/api/v1/course/add-course", data)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        dispatch({
          type: "STORE_COURSE_DESCRIPTION",
          _id: data._id,
          title: data.title,
          category: data.category,
          subtitle: data.subtitle,
          description: data.description,
          price: data.price,
          discount: data.discount,
          learningOutcomes: data.learningoutcomes,
          requirnments: data.requirenments,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    onButtonClick("pagetwo");
    // next()
  };

  console.log(subtitle);

  return (
    <Box className="p-3 h-[100%] w-[100%]">
      <h2 className="text-xl font-bold text-center mt-10">
       Add Description
      </h2>

      <Stack
        direction="row"
        justifyContent="space-around"
        padding="2rem"
        gap={3}
        sx={{
          margin: "auto",
        }}
      >
        <Stack direction="column" gap={4} sx={{ width: "50%" }}>
          {/* Left side */}
          <TextField
            required
            fullWidth
            id="tite"
            label="Title of the Course"
            name="Title"
            value={title}
            // value={formData.title}
            // onChange={handleFormData("title")}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="family-name"
          />
          <TextField
            required
            fullWidth
            id="subtitle"
            label="Subtitle of the Course"
            name="subtitle"
            value={subtitle}
            onChange={(e) => setsubTitle(e.target.value)}
            autoComplete="subtitle"
          />
          <div className="w-full">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleCateoryChange}
              className="w-full"
            >
              {CateoryList.map((name, index) => {
                return (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <Stack
            direction="column"
            gap={3}
            sx={{ width: "50%" }}
            overflow="scroll-x"
          >
            {learningOutcomes.map((item, index) => (
              <Stack direction="row" key={index} gap={2}>
                <TickMark className="mt-1"></TickMark>
                <span
                  className="rounded-md
                "
                  key={index}
                >
                  {item}
                </span>
                <RemoveBtnLight
                  onClick={(e) => removeItem(index)}
                  className="mt-[5px] cursor-pointer"
                ></RemoveBtnLight>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" gap={2}>
            <TextField
              required
              fullWidth
              id="learningoutcomes"
              label="Learning Outcomes"
              name="learningoutcomes"
              inputRef={textInput}
              autoComplete="learningoutcomes"
            />

            <button
              className="border-2 rounded-md w-[300px]"
              onClick={() => {
                setLearningOutcomes([
                  ...learningOutcomes,
                  textInput.current.value,
                ]);
              }}
            >
              Add
            </button>
          </Stack>

          <TextareaAutosize
            required
            fullWidth
            sx={{
              borderWidth: "10px",
            }}
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
          />
        </Stack>

        {/* Right Side */}
        <Stack direction="column" sx={{ width: "50%" }} gap={2}>
          <Stack direction="row" gap={2}>
            <TextField
              required
              fullWidth
              id="requirnment"
              label="Requirnments"
              name="requirements"
              inputRef={reqtxtInput}
              autoComplete="requirnments"
            />

            <button
              className="border-2 rounded-md w-[300px]"
              onClick={() => {
                setReqirnments([...requirnments, reqtxtInput.current.value]);
                console.log(reqtxtInput.current.value);
              }}
            >
              Add
            </button>
          </Stack>
          <Stack
            direction="column"
            gap={3}
            sx={{ width: "50%" }}
            overflow="scroll-x"
          >
            {requirnments.map((item, index) => (
              <Stack direction="row" gap={1} key={index}>
                <TickMark className="mt-1"></TickMark>
                <span
                  className="rounded-md
                "
                  key={index}
                >
                  {item}
                </span>
                <RemoveBtnLight
                  onClick={(e) => removeReqItem(index)}
                  className="mt-[5px] cursor-pointer"
                ></RemoveBtnLight>
              </Stack>
            ))}
          </Stack>

          <TextField
            required
            fullWidth
            id="price"
            label="Price of the Course"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="priceOdCourse"
          />
          <TextField
            required
            fullWidth
            id="discount"
            label="Discount of the Course"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            autoComplete="discount"
          />
        </Stack>
      </Stack>
      <div>
        <button
          type="submit"
          onClick={submitForm}
          className="w-full btn btn-primary border-2 rounded-md text-center p-1"
        >
          NEXT
        </button>
      </div>
    </Box>
  );
};
