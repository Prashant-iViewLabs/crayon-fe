import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import ButtonPanel from "../../common/ButtonPanel";
import {
  CANDIDATE_MY_CV_LEFT,
  CANDIDATE_MY_CV_RIGHT,
  ALERT_TYPE,
  ERROR_MSG,
  CV_STEPS,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import Typography from "@mui/material/Typography";
import TheBasics from "./TheBasics";
import WorkLife from "./WorkLife";
import StudyLife from "./StudyLife";
import theBasicsIcon from "../../../assets/theBasics.svg";
import workLifeIcon from "../../../assets/workLife.svg";
import studyLifeIcon from "../../../assets/studyLife.svg";
import workLifeRedIcon from "../../../assets/workLifeRed.svg";
import studyLifeRedIcon from "../../../assets/studyLifeRed.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getCV,
  addBasicData,
  addWorkData,
  addStudyData,
} from "../../../redux/candidate/myCvSlice";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { getLocalStorage, setLocalStorage } from "../../../utils/Common";

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
  marginRight: "24px",
  fontSize: "14px",
  width: "140px",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  borderRadius: "10px",
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  height: 64,
  width: 64,
  maxHeight: { xs: 64 },
  maxWidth: { xs: 64 },
  cursor: "pointer",
}));

const componentNames = {
  theBasics: TheBasics,
  workLife: WorkLife,
  studyLife: StudyLife,
};
export default function MyCV() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [currentCompIndex, setCurrentCompIndex] = useState(
    JSON.parse(getLocalStorage("cvComponent"))?.[0] || 0
  );
  const [currentComp, setCurrentComp] = useState(
    JSON.parse(getLocalStorage("cvComponent"))?.[1] || "theBasics"
  );
  const [basicData, setBasicData] = useState({});
  const [workData, setWorkData] = useState({});
  const [studyData, setStudyData] = useState({});
  const SomeComponent = componentNames[currentComp];
  const [color, setColor] = useState("1");
  const [errors, setErrors] = useState([]);

  const func = (para) => {
    if (para == "1") {
      setColor("1");
      setCurrentCompIndex(0);
      setCurrentComp("theBasics");
    } else if (para == "2") {
      setColor("2");
      setCurrentCompIndex(1);
      setCurrentComp("workLife");
    } else if (para == "3") {
      setColor("3");
      setCurrentCompIndex(2);
      setCurrentComp("studyLife");
    }
  };

  const handlePrev = () => {
    if (currentCompIndex == 1) {
      setColor("1");
      setCurrentComp("theBasics");
    } else {
      setColor("2");
      setCurrentComp("workLife");
    }
    setCurrentCompIndex(currentCompIndex - 1);
  };
  const handleNext = () => {
    if (currentCompIndex == 0) {
      setCurrentComp("workLife");
      setColor("2");
    } else {
      setCurrentComp("studyLife");
      setColor("3");
    }
    setCurrentCompIndex(currentCompIndex + 1);
  };
  const handleTheBasics = () => {
    setCurrentCompIndex(0);
    setCurrentComp("theBasics");
    setLocalStorage("cvComponent", JSON.stringify([0, "theBasics"]));
  };
  const handleWorkLife = () => {
    setCurrentCompIndex(1);
    setCurrentComp("workLife");
    setLocalStorage("cvComponent", JSON.stringify([1, "workLife"]));
  };
  const handleStudyLife = () => {
    setCurrentCompIndex(2);
    setCurrentComp("studyLife");
    setLocalStorage("cvComponent", JSON.stringify([2, "studyLife"]));
  };
  const handleSubmit = (type, cvData) => {
    // console.log(cvData);
    if (type == "basic") {
      setBasicData(cvData);
    } else if (type == "work") {
      setWorkData(cvData);
    } else if (type == "study") {
      // console.log(cvData);
      setStudyData(cvData);
    }
  };
  const saveBasic = async () => {
    try {
      const { payload } = await dispatch(addBasicData(basicData));
      // console.log(payload);
      if (payload?.status == "success") {
        // setLocalStorage('basicData', JSON.stringify(basicData))
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Basic data added successfully!",
          })
        );
        setErrors([]);
        handleNext();
      } else if (payload?.status == "error") {
        // console.log(payload?.data?.message);
        setErrors(payload?.message);
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
  const saveWork = async () => {
    // console.log(workData);
    try {
      const { payload } = await dispatch(addWorkData(workData));
      // console.log(payload);
      if (payload?.status == "success") {
        // setLocalStorage('workData', JSON.stringify(workData))
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Work data added successfully!",
          })
        );
        setErrors([]);
        handleNext();
      } else if (payload?.status == "error") {
        console.log(payload?.message[0].message);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message[0].message,
          })
        );
        // console.log(payload?.data?.message);
        setErrors(payload?.message);
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
  const saveStudy = async () => {
    console.log("STUDY DATA", studyData);
    try {
      const { payload } = await dispatch(addStudyData(studyData));
      if (payload?.status == "success") {
        // setLocalStorage('studyData', JSON.stringify(studyData))
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Study data added successfully!",
          })
        );
        setErrors([]);
      } else if (payload?.status == "error") {
        setErrors(payload?.message);
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
      // console.log(error);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const getCVData = async () => {
    try {
      dispatch(setLoading(true));
      const { payload } = await dispatch(getCV());

      if (payload?.status == "success") {
        const basic = payload.data.basic;
        const work = payload.data.work;
        const study = payload.data.study;
        basic.industries = basic.industry_id;

        setBasicData(basic);
        setWorkData(work);
        setStudyData({
          otherdata: {
            school_id: study?.at(0)?.school_id || "",
            school_completed:
              study?.at(0)?.school_completed == "completing"
                ? "completing"
                : "true",
            school_year_end: study?.at(0)?.school_year_end || "",
            association_id: study?.at(0)?.association_id || "",
            association_completed:
              study?.at(0)?.association_complete == "completing"
                ? "completing"
                : "true",
            association_year_end: study?.at(0)?.association_year_end || "",
          },
          qualification: study?.length
            ? study?.map((item) => ({
                qualification_id: item?.qualification_id,
                institution_id: item.institution_id,
                year_ended: item?.year_ended,
                completed:
                  item?.completed == "completing" ? "completing" : "true",
                qualificationtype_id: item?.qualificationtype_id,
              }))
            : [
                {
                  qualification_id: "",
                  institution_id: "",
                  year_ended: "",
                  completed: "true",
                  qualificationtype_id: "",
                },
              ],
        });
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.data,
          })
        );
      }
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
    getCVData();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ pb: 3 }}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Grid
          container
          spacing={0}
          sx={{ pb: 3 }}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          {/* <ButtonPanel panelData={CANDIDATE_MY_CV_LEFT} side="left" /> */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <StyledButtonLeft
              onClick={() => func("1")}
              variant={color == "1" ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2 }}
            >
              {i18n["myCV.basic"]}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => func("2")}
              variant={color == "2" ? "contained" : "outlined"}
              color="redButton100"
              sx={{ mb: 2 }}
            >
              {i18n["myCV.workLife"]}
            </StyledButtonLeft>
            <StyledButtonLeft
              onClick={() => func("3")}
              variant={color == "3" ? "contained" : "outlined"}
              color="redButton100"
            >
              {i18n["myCV.studyLife"]}
            </StyledButtonLeft>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                paddingBottom: "6px",
              }}
            >
              {i18n["myCV.crayonVitae"]}
            </Typography>
          </Box>
          <Paper
            sx={{
              boxShadow: 4,
              p: 3,
              minHeight: "748px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <SomeComponent
                key={currentComp}
                onSubmit={handleSubmit}
                basic={basicData}
                work={workData}
                study={studyData}
                errors={errors}
              />
            </Box>

            <Box>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <StyledIcon
                  component="img"
                  sx={{ mr: 7 }}
                  alt="theBasics logo"
                  src={theBasicsIcon}
                  onClick={handleTheBasics}
                />
                <StyledIcon
                  component="img"
                  sx={{ mr: 7 }}
                  alt="workLife logo"
                  src={
                    currentCompIndex > 0 || currentCompIndex == 2
                      ? workLifeRedIcon
                      : workLifeIcon
                  }
                  onClick={handleWorkLife}
                />
                <StyledIcon
                  component="img"
                  alt="studyLife logo"
                  src={currentCompIndex == 2 ? studyLifeRedIcon : studyLifeIcon}
                  onClick={handleStudyLife}
                />
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pt: 5,
                }}
              >
                {currentCompIndex == 0 ? (
                  <StyledButton
                    onClick={saveBasic}
                    variant="contained"
                    color="redButton100"
                  >
                    {i18n["myCV.quickSave"]}
                  </StyledButton>
                ) : (
                  <StyledButton
                    startIcon={<ArrowBackIosIcon />}
                    variant="outlined"
                    color="redButton100"
                    onClick={handlePrev}
                  >
                    {CV_STEPS[currentCompIndex - 1]}
                  </StyledButton>
                )}
                {currentCompIndex == 1 && (
                  <StyledButton
                    onClick={saveWork}
                    variant="contained"
                    color="redButton100"
                  >
                    {i18n["myCV.quickSave"]}
                  </StyledButton>
                )}

                {currentCompIndex == 2 ? (
                  <StyledButton
                    sx={{ mr: 0 }}
                    variant={"contained"}
                    color="redButton100"
                    onClick={saveStudy}
                  >
                    {i18n["myCV.save"]}
                  </StyledButton>
                ) : (
                  <>
                    {currentCompIndex !== 0 && currentCompIndex !== 1 && (
                      <StyledButton
                        sx={{ mr: 0 }}
                        endIcon={<ArrowForwardIosIcon />}
                        variant="outlined"
                        color="redButton100"
                        onClick={handleNext}
                      >
                        {CV_STEPS[currentCompIndex + 1]}
                      </StyledButton>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <div></div>
        {/* <ButtonPanel panelData={CANDIDATE_MY_CV_RIGHT} side='right' /> */}
      </Grid>
    </>
  );
}
