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
import SelectMenu from "../../common/SelectMenu";
import ToggleSwitch from "../../common/ToggleSwitch";
import AutoComplete from "../../common/AutoComplete";
import { InputLabel } from "@mui/material";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG, ROLE_TYPE } from "../../../utils/Constants";
import { addId } from "../../../utils/Common";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material/styles";
import { isEmpty } from "lodash";
import Radio from "@mui/material/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getTitles,
  getSkills,
  getWorkExperience,
  getQualification,
  getRequiredQualification,
  getCurrency,
  getSalary,
  getCountry,
  getRoleTypes,
  getWorkSetup,
  getTown,
  getTools,
} from "../../../redux/employer/postJobSlice";

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
const BASIC = {
  job_id: 0,
  company_id: 807, // remobe company id once employer flow is setup
  job_title_id: "",
  job_role_type: "",
  job_type: "crayon recruit",
  currency_id: "",
  salary: [],
  hide_salary: 1,
  salary_negotiate: true,
  work_setup: "",
  country_id: "",
  town_id: "",
  skills: [],
  tools: [],
  experience_id: "",
  required_qualification_id: "",
  preferred_qualification_ids: [],
};

const SALARY_OBJ = {
  min: 0,
  max: 0,
  step: 0,
};

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "150px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "2 yrs",
  },
  {
    value: 40,
    label: "4 yrs",
  },
  {
    value: 60,
    label: "6yrs",
  },
  {
    value: 80,
    label: "8yrs",
  },
  {
    value: 100,
    label: "10yrs",
  },
];
function textValue(value) {
  return value / 10;
}

const rangeMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20,000",
  },
  {
    value: 40,
    label: "40,000",
  },
  {
    value: 60,
    label: "60,000",
  },
  {
    value: 80,
    label: "80,000",
  },
  {
    value: 100,
    label: "100000+",
  },
];
const rangeMarks2 = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "100",
  },
  {
    value: 40,
    label: "200",
  },
  {
    value: 60,
    label: "300",
  },
  {
    value: 80,
    label: "400",
  },
  {
    value: 100,
    label: "500+",
  },
];

function rangeValueHandler2(value) {
  return value * 5;
}

function rangeValueHandler(value) {
  return value * 1000;
}

export default function TheBasics({ jobId, onSubmit, basic, errors }) {
  // console.log("BASIC ERROR", errors);
  // console.log("BASIC ", basic);
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [value, setValue] = useState([57]);
  const [basicData, setBasicData] = useState(BASIC);
  const [titles, setTitles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [requiredQua, setRequiredQua] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [roleTypes, setRoleTypes] = useState([]);
  const [workSetup, setWorkSetup] = useState([]);
  const [salary, setSalary] = useState([]);
  const [tools, setTools] = useState([]);
  const [countries, setCountries] = useState([]);
  const [towns, setTowns] = useState([]);
  const [townsMain, setTownsMain] = useState([]);
  const [salaryObj, setSalaryObj] = useState(SALARY_OBJ);
  const [selectedValue, setSelectedValue] = useState("crayon recruit");
  const [rangeValue, setRangeValue] = useState([0, 20]);

  const handleRangeSliderChange = (event, newValue) => {
    setRangeValue(newValue);
    let newArr = rangeValue.map((val) => val * 1000);
    //  setRangeValue(newArr)
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };

    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  const handleRangeSliderChange2 = (event, newValue) => {
    setRangeValue(newValue);
    let newArr = rangeValue.map((val) => val * 5);
    const newBasicData = {
      ...basicData,
      [event.target.name]: newArr,
    };

    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    const newBasicData = {
      ...basicData,
      // [name || id]: slider ? sliderValue : value,
      job_type: event.target.value,
    };

    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  useEffect(() => {
    if (isEmpty(basic)) {
      onSubmit("basic", BASIC);
    } else {
      setBasicData(basic);
    }
  }, []);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      const [
        titles,
        skills,
        tools,
        workExperience,
        qualifications,
        requiredQua,
        currency,
        country,
        town,
        roleTypes,
        workSetup,
      ] = await Promise.all([
        dispatch(getTitles()),
        dispatch(getSkills()),
        dispatch(getTools()),
        dispatch(getWorkExperience()),
        dispatch(getQualification()),
        dispatch(getRequiredQualification()),
        dispatch(getCurrency()),
        dispatch(getCountry()),
        dispatch(getTown()),
        dispatch(getRoleTypes()),
        dispatch(getWorkSetup()),
      ]);
      setTitles(titles.payload.data);
      setCurrency(currency.payload.data);
      setSkills(skills.payload.data);
      setQualifications(qualifications.payload.data);
      // setRequiredQua(requiredQua.payload.data);
      const updatedReqHigh = requiredQua.payload.data.map((val) => {
        const { highest_qualification_id, description, ...rest } = val;
        // const desc = val.description;
        return { id: highest_qualification_id, name: description, ...rest };
      });
      setRequiredQua(updatedReqHigh);

      setWorkExperience(workExperience.payload.data);
      setRoleTypes(roleTypes.payload.data);
      setWorkSetup(workSetup.payload.data);

      // const exp = workExperience.payload.data;

      setTools(addId(tools.payload.data, "tool_id", "name"));
      setCountries(addId(country.payload.data, "region_id", "name"));
      setTowns(addId(town.payload.data, "town_id", "name"));
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

  const getSalaryData = async () => {
    try {
      dispatch(setLoading(true));
      const {
        payload: { data },
      } = await dispatch(getSalary(basicData.currency_id));
      setSalary(data);
      setSalaryObj({
        min: data[0].max,
        max: data[data.length - 1].max,
        step: data[1].max - data[0].max,
      });
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

  const expHandleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newBasicData = {
      ...basicData,
      [name]: value / 10,
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  useEffect(() => {
    if (basicData.currency_id) {
      getSalaryData();
    }
  }, [basicData.currency_id]);

  useEffect(() => {
    getAllData();
  }, []);

  const getQuaValue = () => {
    if (basicData.preferred_qualification_ids?.length == 0) {
      return [];
    }
    return basicData.preferred_qualification_ids?.map(
      (id) => qualifications?.find((qua) => qua.id == id) || id
    );
  };
  const getSkillValue = () => {
    if (basicData.skills?.length == 0) {
      return [];
    }
    return basicData.skills?.map(
      (id) => skills?.find((skill) => skill.id == id) || id
    );
  };
  const getToolValue = () => {
    if (basicData.tools?.length == 0) {
      return [];
    }
    return basicData.tools?.map(
      (id) => tools?.find((tool) => tool.id == id) || id
    );
  };

  const handleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    let slider = false,
      sliderValue = "";

    if (name == "salary_id") {
      slider = true;
      sliderValue = salary.find((sal) => sal.max == value).salary_id;
    }
    const newBasicData = {
      ...basicData,
      [name || id]: slider ? sliderValue : value,
    };
    if (name == "country_id") {
      let temp = towns.filter((val) => {
        return val.region_id == value;
      });
      setTownsMain(temp);
    }
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  const handleWorkSetup = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const newBasicData = {
      ...basicData,
      [name || id]: workSetup.find((work) => work.id == value).name,
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };
  const handleRequiredQualificationLevel = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;
    const newBasicData = {
      ...basicData,
      [name || id]: requiredQua.find((work) => work?.id == value)?.id,
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };
  const handleJobRoleChange = (event) => {
    const {
      target: { value },
      target: { name },
      target: { id },
    } = event;

    const newBasicData = {
      ...basicData,
      [name]: roleTypes.find((role) => role.id == value).name,
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  const handleAutoComplete = (event, newValue, id) => {
    let newBasicData = {};
    if (typeof newValue === "string") {
      newBasicData = {
        ...basicData,
        [id]: newValue,
      };
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      newBasicData = {
        ...basicData,
        [id]: newValue.inputValue,
      };
    } else {
      newBasicData = {
        ...basicData,
        [id]: newValue?.id,
      };
    }
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  const handleMultipleAutoComplete = (event, newValue, id) => {
    let newBasicData = {
      ...basicData,
      [id]: newValue.map((val) => val?.inputValue || val?.id || val),
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };
  const handleSwitch = (event) => {
    const newBasicData = {
      ...basicData,
      [event.target.id]: Number(event.target.checked),
    };
    setBasicData(newBasicData);
    onSubmit("basic", newBasicData);
  };

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {i18n["postAJob.jobTypeLabel"]}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "98%",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              checked={selectedValue === "crayon recruit"}
              onChange={handleRadioChange}
              value="crayon recruit"
              name="radio-buttons"
              inputProps={{ "aria-label": "CRAYON RECRUIT" }}
            />
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: "20px",
                backgroundColor:
                  selectedValue == "crayon recruit" ? "#C19C47" : "",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                p: 1,
                pl: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {i18n["postAJob.cryonRecruitLabel"]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 300,
                    color: selectedValue == "crayon recruit" ? "white" : "",
                  }}
                >
                  {i18n["postAJob.recruitParaLabel"]}
                </Typography>
              </Box>
              <Box>
                <Accordion
                  sx={{
                    width: 200,
                    backgroundColor: "#C19C47",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ color: "white" }}>
                      Show more details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: "white" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mt: 2, alignItems: "center" }}>
            <Radio
              checked={selectedValue === "crayon lite"}
              onChange={handleRadioChange}
              value="crayon lite"
              name="radio-buttons"
              inputProps={{ "aria-label": "CRAYON LITE" }}
            />
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: "20px",
                backgroundColor:
                  selectedValue == "crayon lite" ? "#F8B318" : "",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                p: 1,
                pl: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                {i18n["postAJob.cryonLiteLabel"]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: selectedValue == "crayon lite" ? "white" : "",
                }}
              >
                {i18n["postAJob.liteParaLabel"]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {CV_STEPS[0]}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="job_title_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.jobTitleLabel"]}
            </InputLabel>
            <AutoComplete
              id="job_title_id"
              value={
                titles?.find((title) => title.id == basicData.job_title_id) ||
                basicData.job_title_id
              }
              onChange={handleAutoComplete}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.jobTitle"]}
              data={titles}
            ></AutoComplete>
            {errors.find((error) => error.key == "job_title_id") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "job_title_id").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="job_role_type"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.roleTypeLabel"]}
            </InputLabel>
            <SelectMenu
              name="job_role_type"
              value={basicData.job_role_type}
              onHandleChange={handleJobRoleChange}
              options={roleTypes}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.roleType"]}
            />
            {errors.find((error) => error.key == "job_role_type") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "job_role_type").message
                }`}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="currency_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {} {i18n["postAJob.currencyIdLabel"]}
            </InputLabel>
            <SelectMenu
              name="currency_id"
              value={basicData.currency_id}
              onHandleChange={handleChange}
              options={currency}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredCurrency"]}
            />
            {errors.find((error) => error.key == "currency_id") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "currency_id").message
                }`}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <InputLabel
              htmlFor="salary_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {basicData.job_role_type == "freelance"
                ? i18n["postAJob.salaryRangeLable2"]
                : i18n["postAJob.salaryRangeLable"]}
            </InputLabel>

            <Slider
              disabled={!basicData.currency_id}
              name="salary"
              getAriaLabel={() => "Temperature range"}
              value={rangeValue}
              onChange={
                basicData.job_role_type == "freelance"
                  ? handleRangeSliderChange2
                  : handleRangeSliderChange
              }
              color="redButton100"
              valueLabelDisplay="auto"
              step={basicData.job_role_type == "freelance" && 1}
              valueLabelFormat={
                basicData.job_role_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              getAriaValueText={
                basicData.job_role_type == "freelance"
                  ? rangeValueHandler2
                  : rangeValueHandler
              }
              marks={
                basicData.job_role_type == "freelance"
                  ? rangeMarks2
                  : rangeMarks
              }
            />
            {errors.find((error) => error.key == "salary") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "salary").message}`}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="country_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.countryIdLabel"]}
            </InputLabel>

            <SelectMenu
              name="country_id"
              value={basicData.country_id}
              onHandleChange={handleChange}
              options={countries}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.countryPlaceHolder"]}
            />
            {errors.find((error) => error.key == "job_role_type") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "job_role_type").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="town_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.townIdLabel"]}
            </InputLabel>

            <SelectMenu
              name="town_id"
              disabled={!basicData.country_id}
              value={
                towns.find((val) => val.town_id == basicData.town_id)?.name ||
                ""
              }
              onHandleChange={handleChange}
              options={townsMain}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.townPlaceHolder"]}
            />
            {errors.find((error) => error.key == "town_id") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "town_id").message}`}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="work_setup"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.workSetupLable"]}
            </InputLabel>
            <SelectMenu
              name="work_setup"
              value={basicData.work_setup}
              onHandleChange={handleWorkSetup}
              options={workSetup}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.workSetupPlaceholder"]}
            />
            {errors.find((error) => error.key == "work_setup") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "work_setup").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="tools"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.toolsLable"]}
            </InputLabel>
            <AutoComplete
              multiple={true}
              id="tools"
              value={getToolValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.tools"]}
              data={tools}
            ></AutoComplete>
            {errors.find((error) => error.key == "tools") && (
              <Typography color={"red"}>
                {`*${errors.find((error) => error.key == "tools").message}`}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <InputLabel
            htmlFor="skills"
            sx={{
              color: "black",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {i18n["postAJob.skillsLabel"]}
          </InputLabel>
          <AutoComplete
            multiple={true}
            id="skills"
            value={getSkillValue()}
            onChange={handleMultipleAutoComplete}
            sx={{ width: "98.5%" }}
            placeholder={i18n["postAJob.skills"]}
            data={skills}
          ></AutoComplete>
          {errors.find((error) => error.key == "skills") && (
            <Typography color={"red"}>
              {`*${errors.find((error) => error.key == "skills").message}`}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="required_qualification_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.requiredQualificationLable"]}
            </InputLabel>
            <SelectMenu
              name="required_qualification_id"
              value={basicData.required_qualification_id}
              onHandleChange={handleRequiredQualificationLevel}
              options={requiredQua}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.requiredQualificationLevel"]}
            />
            {errors.find(
              (error) => error.key == "required_qualification_id"
            ) && (
              <Typography color={"red"}>
                {`*${
                  errors.find(
                    (error) => error.key == "required_qualification_id"
                  ).message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel
              htmlFor="preferred_qualification_ids"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.preferredQualificationLabel"]}
            </InputLabel>
            <AutoComplete
              multiple={true}
              id="preferred_qualification_ids"
              value={getQuaValue()}
              onChange={handleMultipleAutoComplete}
              sx={{ width: "95%" }}
              placeholder={i18n["postAJob.preferredQualification"]}
              data={qualifications}
            ></AutoComplete>
            {errors.find(
              (error) => error.key == "preferred_qualification_ids"
            ) && (
              <Typography color={"red"}>
                {`*${
                  errors.find(
                    (error) => error.key == "preferred_qualification_ids"
                  ).message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <Box sx={{ mb: 3, ml: 1 }}>
            <InputLabel
              htmlFor="experience_id"
              sx={{
                color: "black",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["postAJob.yearsWorkExperienceLabel"]}
            </InputLabel>
            <Slider
              name="experience_id"
              aria-label="Custom marks"
              // defaultValue={0}
              // value={basicData.experience_id*10}
              //   value={experiences.find((val)=>val.id === basicData.experience_id)?.id * 10 || 0}
              color="redButton100"
              getAriaValueText={textValue}
              step={10}
              onChange={expHandleChange}
              valueLabelDisplay="auto"
              valueLabelFormat={textValue}
              marks={marks}
              sx={{ width: "47%" }}
            />
            {errors.find((error) => error.key == "experience_id") && (
              <Typography color={"red"}>
                {`*${
                  errors.find((error) => error.key == "experience_id").message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minWidth: "28%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 1,
          }}
        >
          <Typography
            sx={{
              mr: 1,
              minWidth: "fit-content",
            }}
          >
            {i18n["postAJob.displaySalary"]}
          </Typography>
          <ToggleSwitch
            id="hide_salary"
            checked={!!basicData.hide_salary}
            onChange={handleSwitch}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mr: 1,
              minWidth: "fit-content",
            }}
          >
            {i18n["postAJob.salaryNegotiable"]}
          </Typography>
          <ToggleSwitch
            id="salary_negotiate"
            checked={!!basicData.salary_negotiate}
            onChange={handleSwitch}
          />
        </Box>
      </Box>
    </Box>
  );
}
