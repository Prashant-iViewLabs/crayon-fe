import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { CV_STEPS } from "../../../utils/Constants";
import InputBox from "../../common/InputBox";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import { getLocalStorage } from "../../../utils/Common";
import { InputLabel } from "@mui/material";

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

const WORK = {
  company_name: "",
  title: "",
  clients_worked_on_awards: "",
  description: "",
  start_date: "",
  end_date: "",
  currently_employed_here: 0,
  no_work_exp: false,
};
export default function WorkLife({ onSubmit, work, errors }) {
  // console.log(work);
  const i18n = locale.en;
  // const [workData, setWorkData] = useState(JSON.parse(getLocalStorage('workData')) || [WORK])
  const [workData, setWorkData] = useState([WORK]);

  useEffect(() => {
    if (work.length > 0) {
      setWorkData(work);
    }
  }, [work]);

  const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: "24px",
    marginTop: "15px",
    fontSize: "14px",
    width: "auto",
    border: `2px solid ${theme.palette.redButton100.main}`,
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
    },
  }));
  const addWork = () => {
    onSubmit("work", [...workData, WORK]);
    setWorkData((prevState) => [...prevState, WORK]);
  };
  const removeWork = (event, index) => {
    if (workData.length > 1) {
      const newWorkData = workData.filter((data, i) => i + 1 != index);
      setWorkData(newWorkData);
      onSubmit("work", newWorkData);
    }
  };
  const handleChange = (event, index, type) => {
    const newWorkData = JSON.parse(JSON.stringify(workData));

    if (event && event.target) {
      newWorkData[index][event.target.id] = event.target.value;
      setWorkData(newWorkData);
    } else {
      newWorkData[index][type] = dayjs(event).format("YYYY-MM-DD");
      setWorkData(newWorkData);
    }
    onSubmit("work", newWorkData);
  };

  const handleNoExp = (event) => {
    const isChecked = event.target.checked;

    const newWorkExp = WORK;
    newWorkExp.no_work_exp = isChecked;
    setWorkData([newWorkExp]);
    onSubmit("work", [newWorkExp]);
  };

  return (
    <Box sx={{ pl: 3 }}>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              mb: 2,
            }}
          >
            {CV_STEPS[1]}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
          }}
        >
          <BlueSwitch
            onChange={handleNoExp}
            checked={workData[0].no_work_exp}
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            {i18n["myCV.noWorkExp"]}
          </Typography>
        </Box>
      </Box>

      {workData.length > 0 &&
        workData.map((work, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {index != 0 && (
                  <IconButton
                    aria-label="edit"
                    color="redButton"
                    sx={{
                      padding: "0 !important",
                      marginRight: "4px",
                    }}
                    onClick={(event) => removeWork(event, index + 1)}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                )}
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 800,
                    flex: 1,
                  }}
                >
                  {index === 0
                    ? i18n["myCV.latestJobLabel"]
                    : i18n["myCV.previousJobLabel"]}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  {index === 0 ? i18n["myCV.mostRecent"] : ""}
                </Typography>
              </Box>

              <Divider
                component="hr"
                sx={{
                  borderBottomWidth: 2,
                  flex: "auto",
                  m: 0,
                  mr: 3.5,
                }}
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  htmlFor="company_name"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.companyNameLabel"]}
                </InputLabel>
                <InputBox
                  disabled={work.no_work_exp}
                  id="company_name"
                  value={work.company_name}
                  onChange={(event) => handleChange(event, index)}
                  sx={{ width: "94%" }}
                  placeholder={i18n["myCV.companyName"]}
                />
                {errors?.find((error) => error.key == "company_name") && (
                  <Typography color={"red !important"}>
                    {`*${
                      errors?.find((error) => error.key == "company_name")
                        .message
                    }`}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  htmlFor="title"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.jobTitleLable"]}
                </InputLabel>
                <InputBox
                  disabled={work.no_work_exp}
                  id="title"
                  value={work.title}
                  onChange={(event) => handleChange(event, index)}
                  sx={{ width: "94%" }}
                  placeholder={i18n["myCV.jobTitle"]}
                />
                {errors?.find((error) => error.key == "title") && (
                  <Typography color={"red !important"}>
                    {`*${
                      errors?.find((error) => error.key == "title").message
                    }`}
                  </Typography>
                )}
              </Box>
            </Box>
            <InputLabel
              htmlFor="clients_worked_on_awards"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.descriptionJobLabel"]}
            </InputLabel>
            <InputBox
              disabled={work.no_work_exp}
              id="clients_worked_on_awards"
              value={work.clients_worked_on_awards}
              onChange={(event) => handleChange(event, index)}
              sx={{ mb: 3, width: "97%" }}
              placeholder={i18n["myCV.clientsAwards"]}
            />
            {errors?.find(
              (error) => error.key == "clients_worked_on_awards"
            ) && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find(
                    (error) => error.key == "clients_worked_on_awards"
                  ).message
                }`}
              </Typography>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              {/* <InputBox sx={{ width: '50%', mr: 5 }} placeholder={i18n['myCV.startDate1']} />
                                <InputBox sx={{ width: '50%' }} placeholder={i18n['myCV.endDate1']} /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: "100%" }}>
                  <InputLabel
                    htmlFor="title"
                    sx={{
                      color: "black",
                      paddingLeft: "10px",
                      paddingBottom: "2px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {i18n["myCV.startDate"]}
                  </InputLabel>
                  <DatePicker
                    disabled={work.no_work_exp}
                    // label="start date"
                    value={work.start_date}
                    onChange={(newValue) =>
                      handleChange(newValue, index, "start_date")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            mr: 5,
                            borderRadius: "40px",
                          },
                        }}
                      />
                    )}
                  />
                  {errors?.find((error) => error.key == "start_date") && (
                    <Typography color={"red !important"}>
                      {`*${
                        errors?.find((error) => error.key == "start_date")
                          .message
                      }`}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ width: "50%" }}>
                  <InputLabel
                    htmlFor="title"
                    sx={{
                      color: "black",
                      paddingLeft: "10px",
                      paddingBottom: "2px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {i18n["myCV.endDate"]}
                  </InputLabel>
                  <DatePicker
                    disabled={work.no_work_exp}
                    // label="end date"
                    value={work.end_date}
                    onChange={(newValue) =>
                      handleChange(newValue, index, "end_date")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            borderRadius: "40px",
                          },
                        }}
                      />
                    )}
                  />
                  {errors?.find((error) => error.key == "end_date") && (
                    <Typography color={"red !important"}>
                      {`*${
                        errors?.find((error) => error.key == "end_date").message
                      }`}
                    </Typography>
                  )}
                </Box>
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {/* <IconButton
                aria-label="edit"
                color="redButton"
                sx={{
                  padding: "0 !important",
                }}
                onClick={(event) => removeWork(event, index + 1)}
              >
                <RemoveCircleIcon />
              </IconButton> */}
              {/* {workData.length == index + 1 && ( */}
              {/* <IconButton
                  aria-label="edit"
                  color="lightGreenButton100"
                  onClick={addWork}
                >
                  <AddCircleIcon />
                </IconButton> */}

              {/* )} */}
            </Box>
          </Box>
        ))}
      <StyledButton variant="outlined" color="redButton100" onClick={addWork}>
        {i18n["myCV.workBottonText"]}
      </StyledButton>
    </Box>
  );
}
