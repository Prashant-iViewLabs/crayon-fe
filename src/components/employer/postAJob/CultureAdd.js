import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { CV_STEPS } from "../../../utils/Constants";
import InputBox from "../../common/InputBox";
import Slider from "@mui/material/Slider";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material/styles";

import {
  getPersonalities,
  getSkills,
  getTraits,
} from "../../../redux/employer/postJobSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import { setAlert, setLoading } from "../../../redux/configSlice";
import SelectMenu from "../../common/SelectMenu";
import AutoComplete from "../../common/AutoComplete";
import { addId } from "../../../utils/Common";
import { cloneDeep, isEmpty } from "lodash";
import { InputLabel } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "150px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.blueButton400.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.blueButton400.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.blueButton400.main,
  },
  "& .MuiSwitch-track": {
    // marginTop: '-9px'
  },
}));

const SCREEN_QUESTIONS = {
  job_id: "",
  question: "",
  answer: "",
};

const CULTURE = {
  // company_id: 10, // remobe company id once employer flow is setup
  job_id: 0,
  primary_personality: "",
  shadow_personality: "",
  traits: [],
  screen_questions: [],
  grit_score: "",
};

const marks = [
  {
    value: 0,
    label: "00",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 75,
    label: "75",
  },
  {
    value: 100,
    label: "100",
  },
];

function textValue(value) {
  return value;
}
export default function CultureAdd({ jobId, onSubmit, culture, errors }) {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [cultureData, setCultureData] = useState({ ...CULTURE, job_id: jobId });
  const [skills, setSkills] = useState([]);
  const [personalities, setPersonalities] = useState([]);
  const [traits, setTraits] = useState([]);
  const questions = cultureData.screen_questions;
  const [value, setValue] = useState([57]);

  useEffect(() => {
    if (!isEmpty(culture)) {
      setCultureData({ ...culture, job_id: jobId });
      onSubmit("culture", { ...culture, job_id: jobId });
    }
  }, []);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      const [personalities, skills, traits] = await Promise.all([
        dispatch(getPersonalities()),
        dispatch(getSkills()),
        dispatch(getTraits()),
      ]);
      setSkills(skills.payload.data);
      setPersonalities(
        addId(personalities.payload.data, "personality_id", "name")
      );
      setTraits(addId(traits.payload.data, "trait_id", "name"));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    let slider = false,
      sliderValue = "";

    const newCultureData = {
      ...cultureData,
      [name || id]: slider ? sliderValue : value,
    };

    setCultureData(newCultureData);
    onSubmit("culture", newCultureData);
  };
  const rangeHandler = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const newCultureData = {
      ...cultureData,
      [name]: value,
    };
    setCultureData(newCultureData);
    onSubmit("culture", newCultureData);
  };
  const handleQuestionChange = (event, index) => {
    const {
      target: { value },
      target: { id },
    } = event;

    let newCultureData = cloneDeep(cultureData);
    newCultureData.screen_questions[index] = {
      [id]: value,
      answer: "",
      job_id: jobId,
    };

    setCultureData(newCultureData);
    onSubmit("culture", newCultureData);
  };

  const getTraitValue = () => {
    return;
  };
  const handleMultipleAutoComplete = (event, newValue, id) => {
    if (newValue.length <= 5) {
      let newCultureData = {
        ...cultureData,
        [id]: newValue.map((val) => val?.trait_id) || "",
      };
      setCultureData(newCultureData);
      onSubmit("culture", newCultureData);
    } else {
      newValue.splice(5, 1);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "You can't add more than 5 traits!!",
        })
      );
    }
  };

  const addQuestion = () => {
    console.log(cultureData);
    const newCultureData = {
      ...cultureData,
      screen_questions: [...cultureData?.screen_questions, SCREEN_QUESTIONS],
    };
    setCultureData(newCultureData);
    onSubmit("culture", newCultureData);
  };
  const removeQuestion = (event, index) => {
    if (questions?.length >= 1) {
      const newquestions = questions.filter((data, i) => i + 1 != index);
      const newCultureData = { ...cultureData, screen_questions: newquestions };
      setCultureData(newCultureData);
      onSubmit("culture", newCultureData);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          ml: 1,
          mb: 2,
        }}
      >
        {i18n["postAJob.cultureAdd"]}
      </Typography>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="tags"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.primaryLabel"]}
            </InputLabel>
            <SelectMenu
              name="primary_personality"
              value={cultureData.primary_personality || ""}
              onHandleChange={handleChange}
              options={personalities}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredDominantPersonality"]}
            />
            {errors.find((error) => error.key == "primary_personality") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "primary_personality")
                    .message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="tags"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.shadowLabel"]}
            </InputLabel>
            <SelectMenu
              name="shadow_personality"
              value={cultureData.shadow_personality || ""}
              onHandleChange={handleChange}
              options={personalities}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredShadowPersonality"]}
            />
            {errors.find((error) => error.key == "shadow_personality") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "shadow_personality")
                    .message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="tags"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.traitsLabel"]}
            </InputLabel>
            {/* <SelectMenu
              name="traits"
              value={getTraitValue()}
              onHandleChange={handleChange}
              options={traits}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredShadowPersonality"]}
            /> */}
            <AutoComplete
              multiple={true}
              id="traits"
              name="traits"
              value={getTraitValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredShadowPersonality"]}
              data={traits}
              limitTags={5}
            ></AutoComplete>
            {errors.find((error) => error.key == "traits") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "traits").message}`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="tags"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.gritScoreLabel"]}
            </InputLabel>

            <Slider
              name="grit_score"
              aria-label="Custom marks"
              color="redButton100"
              getAriaValueText={textValue}
              step={1}
              onChange={rangeHandler}
              valueLabelDisplay="auto"
              valueLabelFormat={textValue}
              marks={marks}
              sx={{ width: "88%", ml: 2 }}
            />
            {errors.find((error) => error.key == "grit_score") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "grit_score").message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {i18n["postAJob.screeningQuestions"]}
        </Typography>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 300,
            ml: 1,
            mb: 2,
          }}
        >
          {i18n["postAJob.screeningQuestionPara"]}
        </Typography>
        {errors.find((error) => error.key == "screen_questions") && (
          <Typography color={"red"}>
            {`*${
              errors.find((error) => error.key == "screen_questions").message
            }`}
          </Typography>
        )}
        {questions?.length > 0 &&
          questions?.map((question, index) =>
            index < 5 ? (
              <Box key={index} sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    width: "90%",
                  }}
                >
                  <InputBox
                    id="question"
                    sx={{ width: "97%" }}
                    value={question.question}
                    onChange={(event) => handleQuestionChange(event, index)}
                    placeholder={i18n["postAJob.question"] + `0${index + 1}`}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Box sx={{ mr: "53px" }}>
                    {index >= 0 ? (
                      <IconButton
                        aria-label="edit"
                        color="redButton"
                        sx={{
                          padding: "0 !important",
                        }}
                        onClick={(event) => removeQuestion(event, index + 1)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )
          )}
        <Button
          variant="outlined"
          component="label"
          onClick={addQuestion}
          color="redButton100"
          sx={{
            marginTop: "30px",
            transform: "translateY(-50%)",
            "@media (max-width: 600px)": {
              fontSize: "12px",
              padding: "6px 12px",
            },
          }}
        >
          {i18n["postAJob.addButton"]}
        </Button>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            marginTop: "25px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.videoLabel"]}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 300,
              }}
            >
              {i18n["postAJob.videoParaLabel"]}
            </Typography>
          </Box>

          <BlueSwitch />
        </Box>
      </Box>
    </Box>
  );
}
