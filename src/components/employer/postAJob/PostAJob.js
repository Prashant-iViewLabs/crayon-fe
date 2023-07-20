import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import ButtonPanel from "../../common/ButtonPanel";
import {
  POST_JOB_STEPS,
  EMPLOYER_JOB_POSTING_LEFT,
  EMPLOYER_JOB_POSTING_SPEC_LEFT,
  ALERT_TYPE,
  ERROR_MSG,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import Typography from "@mui/material/Typography";
import TheBasics from "./TheBasics";
import TheDetails from "./TheDetails";
import CultureAdd from "./CultureAdd";
import theBasicsIcon from "../../../assets/theBasics.svg";
import detailLifeIcon from "../../../assets/workLife.svg";
import cultureLifeIcon from "../../../assets/studyLife.svg";
import detailLifeRedIcon from "../../../assets/workLifeRed.svg";
import cultureLifeRedIcon from "../../../assets/studyLifeRed.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getJob,
  addBasicData,
  addDetailData,
  addCultureData,
} from "../../../redux/employer/postJobSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { getLocalStorage, setLocalStorage } from "../../../utils/Common";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "150px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));

const StyledButtonLeft = styled(Button)(({ theme }) => ({
  // marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  border: `1px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "2px",
}));

const StyledIcon = styled(Box)(({ jobId }) => ({
  height: 64,
  width: 64,
  maxHeight: { xs: 64 },
  maxWidth: { xs: 64 },
  cursor: !jobId ? "not-allowed" : "pointer",
}));

const componentNames = {
  theBasics: TheBasics,
  theDetails: TheDetails,
  cultureAdd: CultureAdd,
};

export default function MyCV() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobId, setJobId] = useState(+getLocalStorage("inProgressJobId" || ""));
  const [currentCompIndex, setCurrentCompIndex] = useState(
    JSON.parse(getLocalStorage("jobComponent"))?.[0] || 0
  );
  const [currentComp, setCurrentComp] = useState(
    JSON.parse(getLocalStorage("jobComponent"))?.[1] || "theBasics"
  );
  const [basicData, setBasicData] = useState({});
  const [detailData, setDetailData] = useState({});
  const [cultureData, setCultureData] = useState({});
  const [errors, setErrors] = useState([]);

  const SomeComponent = componentNames[currentComp];
  const [color, setColor] = useState("1");

  const func = (para) => {
    if (para == "1") {
      setColor("1");
      setCurrentComp("theBasics");
      setCurrentCompIndex(0);
    } else if (para == "2") {
      setColor("2");
      setCurrentComp("theDetails");
      setCurrentCompIndex(1);
    } else if (para == "3") {
      setColor("3");
      setCurrentComp("cultureAdd");
      setCurrentCompIndex(2);
    }
  };

  const handlePrev = () => {
    if (currentCompIndex == 1) {
      setColor("1");
      setCurrentComp("theBasics");
    } else {
      setColor("2");
      setCurrentComp("theDetails");
    }
    setCurrentCompIndex(currentCompIndex - 1);
  };
  const handleNext = () => {
    if (currentCompIndex == 0) {
      setCurrentComp("theDetails");
      setColor("2");
    } else {
      setColor("3");
      setCurrentComp("cultureAdd");
    }
    setCurrentCompIndex(currentCompIndex + 1);
  };
  // const handleTheBasics = () => {
  //   setCurrentCompIndex(0);
  //   setCurrentComp("theBasics");
  //   setLocalStorage("jobComponent", JSON.stringify([0, "theBasics"]));
  // };
  // const handleDetailLife = () => {
  //   if (!jobId) {
  //     return;
  //   }
  //   setCurrentCompIndex(1);
  //   setCurrentComp("theDetails");
  //   setLocalStorage("jobComponent", JSON.stringify([1, "theDetails"]));
  // };
  // const handleCultureLife = () => {
  //   if (!jobId) {
  //     return;
  //   }
  //   setCurrentCompIndex(2);
  //   setCurrentComp("cultureAdd");
  //   setLocalStorage("jobComponent", JSON.stringify([2, "cultureAdd"]));
  // };
  const handleSubmit = (type, jobData) => {
    if (type == "basic") {
      setBasicData(jobData);
    } else if (type == "detail") {
      setDetailData(jobData);
    } else {
      setCultureData(jobData);
    }
  };
  const saveBasic = async () => {
    try {
      const { payload } = await dispatch(addBasicData(basicData));
      if (payload?.status == "success") {
        // console.log(payload.data);
        setJobId(payload.data.job_id);
        setLocalStorage("inProgressJobId", jobId);
        // saveDetail(jobId);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Basic data created successfully!",
          })
        );
        setErrors([]);

        handleNext();
      } else if (payload?.status == "error") {
        setErrors(payload?.errors);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };
  const saveDetail = async () => {
    try {
      const { payload } = await dispatch(addDetailData(detailData));
      if (payload?.status == "success") {
        // setLocalStorage('detailData', JSON.stringify(detailData))
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Details Data added successfully!",
          })
        );
        handleNext();
        setErrors([]);
      } else if (payload?.status == "error") {
        setErrors(payload?.errors);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };
  const saveCulture = async () => {
    try {
      const { payload } = await dispatch(addCultureData(cultureData));
      if (payload?.status == "success") {
        // setLocalStorage('studyData', JSON.stringify(studyData))
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Culture Data added successfully!",
          })
        );
        setErrors([]);
        setTimeout(() => {
          navigate("/employer/my-jobs");
        }, [500]);
      } else if (payload?.status == "error") {
        setErrors(payload?.errors);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  //   const getJobData = async () => {
  //     try {
  //       dispatch(setLoading(true));
  //       const { payload } = await dispatch(getJob(1077));
  //       if (payload?.status == "success") {
  //         const basic = payload.data.basics;
  //         const detail = payload.data.details;
  //         const culture = payload.data.culture;

  //         culture.primary_personality_id = culture.primary_personality;
  //         culture.shadow_personality_id = culture.shadow_personality;

  //         setBasicData(basic);
  //         setDetailData(detail);
  //         setCultureData(culture);
  //       } else {
  //         dispatch(
  //           setAlert({
  //             show: true,
  //             type: ALERT_TYPE.ERROR,
  //             msg: payload?.message,
  //           })
  //         );
  //       }
  //       dispatch(setLoading(false));
  //     } catch (error) {
  //       dispatch(setLoading(false));
  //       dispatch(
  //         setAlert({
  //           show: true,
  //           type: ALERT_TYPE.ERROR,
  //           msg: ERROR_MSG,
  //         })
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     getJobData();
  //   }, []);

  return (
    <Box>
      <Grid
        container
        spacing={0}
        sx={{ pb: 3, justifyContent: "space-between" }}
        flexDirection="row"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <ButtonPanel panelData={EMPLOYER_JOB_POSTING_SPEC_LEFT} side="left" />
        </Box>
        <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
          <Typography
            sx={{
              fontSize: "36px",
              mb: 3,
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {i18n["postAJob.title"]}
          </Typography>
          <Paper
            sx={{
              boxShadow: 4,
              p: 3,
              minHeight: "870px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <SomeComponent
                jobId={jobId}
                key={currentComp}
                onSubmit={handleSubmit}
                basic={basicData}
                detail={detailData}
                culture={cultureData}
                errors={errors}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {/* <StyledIcon
                                jobId={jobId}
                                component="img"
                                sx={{ mr: 7 }}
                                alt="theBasics logo"
                                src={theBasicsIcon}
                                onClick={handleTheBasics}
                            />
                            <StyledIcon
                                jobId={jobId}
                                component="img"
                                sx={{ mr: 7 }}
                                alt="theDetails logo"
                                src={(currentCompIndex > 0 || currentCompIndex == 2) ? detailLifeRedIcon : detailLifeIcon}
                                onClick={handleDetailLife}
                            />
                            <StyledIcon
                                jobId={jobId}
                                component="img"
                                alt="cultureAdd logo"
                                src={currentCompIndex == 2 ? cultureLifeRedIcon : cultureLifeIcon}
                                onClick={handleCultureLife}
                            /> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {currentCompIndex == 0 && (
                  <StyledButton
                    onClick={saveBasic}
                    // onClick={handleNext}
                    variant="contained"
                    color="redButton100"
                  >
                    {i18n["postAJob.theDetails"]}
                  </StyledButton>
                )}

                {currentCompIndex == 1 && (
                  <>
                    <StyledButton
                      startIcon={<ArrowBackIosIcon />}
                      variant="outlined"
                      sx={{ border: "none" }}
                      color="redButton100"
                      onClick={handlePrev}
                    >
                      {POST_JOB_STEPS[currentCompIndex - 1]}
                    </StyledButton>
                    <StyledButton
                      onClick={saveDetail}
                      // onClick={handleNext}
                      variant="outlined"
                      color="redButton100"
                    >
                      {i18n["postAJob.theCulture"]}
                    </StyledButton>
                  </>
                )}
                {currentCompIndex == 2 && (
                  <>
                    <StyledButton
                      startIcon={<ArrowBackIosIcon />}
                      variant="outlined"
                      sx={{ border: "none" }}
                      color="redButton100"
                      onClick={handlePrev}
                    >
                      {POST_JOB_STEPS[currentCompIndex - 1]}
                    </StyledButton>
                    <StyledButton
                      // disabled={!jobId}
                      sx={{ mr: 0 }}
                      variant="contained"
                      color="redButton100"
                      onClick={saveCulture}
                    >
                      {i18n["postAJob.save"]}
                    </StyledButton>
                    <StyledButton
                      endIcon={<ArrowForwardIosIcon />}
                      // disabled={!jobId}
                      sx={{ ml: 4, width: "180px", border: "none" }}
                      // variant="outlined"
                      color="redButton100"
                      // onClick={saveCulture}
                    >
                      {i18n["postAJob.saveToSpecs"]}
                    </StyledButton>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <StyledButtonLeft
            onClick={() => func("1")}
            variant={color == "1" ? "contained" : "outlined"}
            color="redButton100"
            sx={{ mb: 2 }}
          >
            {i18n["postAJob.theBasics"]}
          </StyledButtonLeft>
          <StyledButtonLeft
            onClick={() => func("2")}
            // disabled={!jobId}
            variant={color == "2" ? "contained" : "outlined"}
            color="redButton100"
            sx={{ mb: 2 }}
          >
            {i18n["postAJob.theDetails"]}
          </StyledButtonLeft>
          <StyledButtonLeft
            onClick={() => func("3")}
            variant={color == "3" ? "contained" : "outlined"}
            color="redButton100"
            // disabled={!jobId}
          >
            {i18n["postAJob.theCulture"]}
          </StyledButtonLeft>
        </Box>
        {/* <ButtonPanel panelData={CANDIDATE_MY_CV_RIGHT} side='right' /> */}
      </Grid>
    </Box>
  );
}
