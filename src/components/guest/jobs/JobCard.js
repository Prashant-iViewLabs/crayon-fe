import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import job_logo from "../../../assets/job_logo.svg";
import job_volume from "../../../assets/job_volume.svg";
import job_star from "../../../assets/job_star.svg";
import job_star_selected from "../../../assets/job_star_selected.svg";
import job_exp from "../../../assets/job_exp.png";
import job_apply from "../../../assets/job_apply.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import ApplyJobs from "./ApplyJobs";
import { getAllQuestions } from "../../../redux/guest/getQuestions";
import {
  ALERT_TYPE,
  AUTHORIZED_TAB_ITEMS_CANDIDATE,
  AUTHORIZED_TAB_ITEMS_EMPLOYER,
  CARD_RIGHT_BUTTON_GROUP,
  PUBLIC_TAB_ITEMS,
} from "../../../utils/Constants";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import SingleRadialChart from "../../common/SingleRadialChart";
import SmallButton from "../../common/SmallButton";
import CustomCard from "../../common/CustomCard";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextWrapper from "../../common/TextWrapper";
import { convertDatetimeAgo } from "../../../utils/DateTime";
import CustomDialog from "../../common/CustomDialog";
import Login from "../../login/login";
import Signup from "../../login/signup";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/login/loginSlice";
import { getLocalStorage, setLocalStorage } from "../../../utils/Common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAlert } from "../../../redux/configSlice";
import { Toolbar } from "@mui/material";
import { favouriteJob } from "../../../redux/guest/talentSlice";
import jwt_decode from "jwt-decode";

const label1 = "applied";
const label2 = "shortlisted";
const label3 = "interviewed";
export default function JobCard({ index, job }) {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [colorKey, setColorKey] = useState("color");
  const [chartData1, setChartData1] = useState([320]);
  const [chartData2, setChartData2] = useState([11]);
  const [chartData3, setChartData3] = useState([3]);
  const [isHovered, setIsHovered] = useState(false);
  const [isStar, setIsStarSelected] = useState(job?.favourite);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentTabs, setcurrentTabs] = useState(PUBLIC_TAB_ITEMS);
  const [activeTab, setActiveTab] = useState(pathname.slice(1));
  const [questions, setQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(getLocalStorage("isLoggedIn"))
  );
  const [arrSlider, setArrSlider] = useState([
    job?.industry_jobs[0],
    job?.type,
    job?.work_setup,
  ]);
  const [arrSlider2, setArrSlider2] = useState([
    job?.primary?.name,
    job?.shadow?.name,
    ...(job?.job_traits || []),
  ]);

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const handleHoverEnter = () => {
    setColorKey("hover");
  };
  const handleHoverLeave = () => {
    setColorKey("color");
  };
  const handleStar = async () => {
    setIsStarSelected(!isStar);
    decodedToken?.data?.role_id == 3 &&
      (await dispatch(favouriteJob({ reqid: job?.job_id })));
  };
  const getquestions = async () => {
    const { payload } = await dispatch(getAllQuestions(job?.job_id));
    if (payload?.status == "success") {
      setQuestions(payload.data);
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.message,
        })
      );
    }
  };
  const handleClick = () => {
    setOpenLoginDialog(true);
    getquestions();
  };
  const onHandleClose = () => {
    setOpenLoginDialog(false);
  };
  const handleRightClick = () => {
    setArrSlider2([...arrSlider2.slice(1), ...arrSlider2.slice(0, 1)]);
  };
  const handleLeftClick = () => {
    setArrSlider2([
      ...arrSlider2.slice(arrSlider2.length - 1),
      ...arrSlider2.slice(0, arrSlider2.length - 1),
    ]);
  };

  const onHandleLogin = async (loginData) => {
    try {
      const { payload } = await dispatch(login(loginData));
      if (payload?.status == "success" && payload?.token) {
        const user = payload.data.role_id;
        setLocalStorage("token", payload?.token);
        onHandleClose();
        const jwt = localStorage?.getItem("token");
        const parts = jwt?.split(".");
        if (parts?.length !== 3) {
          throw new Error("Invalid JWT");
        }
        const encodedPayload = parts[1];
        const decodedPayload = atob(encodedPayload);
        const payloadData = JSON.parse(decodedPayload);
        const profileCompletion = payloadData.data?.profile_percent_complete;
        let tabs;
        if (user === 4) {
          if (profileCompletion === 100) {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("/employer/my-jobs", { replace: true });
            setActiveTab("/employer/my-jobs");
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_EMPLOYER;
            navigate("/employer/my-profile", { replace: true });
            setActiveTab("/employer/my-profile");
          }
        } else {
          if (profileCompletion === 0) {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("/candidate/my-jobs", { replace: true });
            setActiveTab("/candidate/my-jobs");
          } else {
            tabs = AUTHORIZED_TAB_ITEMS_CANDIDATE;
            navigate("/candidate/my-profile", { replace: true });
            setActiveTab("/candidate/my-profile");
          }
        }
        setcurrentTabs(tabs);
        setLocalStorage("isLoggedIn", true);
        setLocalStorage("userType", user);
        setIsLoggedIn(true);
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Successfully Login!",
          })
        );
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
      dispatch(setAlert({ show: true }));
    }
  };

  return (
    <CustomCard
      handleMouseEnter={() => setIsHovered(true)}
      handleMouseLeave={() => setIsHovered(false)}
    >
      <Grid
        container
        padding={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          component="img"
          sx={{
            height: 40,
            width: 40,
            maxHeight: { xs: 40 },
            maxWidth: { xs: 40 },
            ml: 2,
          }}
          alt="job_logo"
          src={job?.profile_url !== "No URL" ? job?.profile_url : job_logo}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {job?.job_type === "crayon recruit" ? (
            <SmallButton
              color="yellowButton100"
              label={job?.job_type?.slice(6)}
              mr={1}
            />
          ) : job?.job_type === "crayon lite" ? (
            <SmallButton
              color="orangeButton"
              label={job?.job_type?.slice(6)}
              mr={1}
            />
          ) : null}
          {job?.stage?.name && (
            <SmallButton color="lightGreenButton300" label={job?.stage?.name} />
          )}
          <Box
            sx={{
              height: 43,
              width: 43,
              maxHeight: { xs: 43 },
              maxWidth: { xs: 43 },
              borderRadius: "6px",
              background: theme.palette.purpleButton300.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 8px",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 25,
                width: 25,
                maxHeight: { xs: 25 },
                maxWidth: { xs: 25 },
              }}
              alt="job_volume"
              src={job_volume}
              onClick={handleClick}
            />
          </Box>
          {console.log(decodedToken?.data?.role_id)}
          {isStar ? (
            <Box
              component="img"
              sx={{
                height: 43,
                width: 43,
                maxHeight: { xs: 43 },
                maxWidth: { xs: 43 },
                mr: 1,
              }}
              alt="job_star_selected"
              src={job_star_selected}
              onClick={() =>
                decodedToken?.data?.role_id == "undefined"
                  ? handleClick
                  : handleStar(job?.job_id)
              }
            />
          ) : (
            <Box
              component="img"
              sx={{
                height: 43,
                width: 43,
                maxHeight: { xs: 43 },
                maxWidth: { xs: 43 },
                mr: 1,
              }}
              alt="job_star"
              src={job_star}
              onClick={() =>
                decodedToken?.data?.role_id == "undefined"
                  ? handleClick
                  : handleStar(job?.job_id)
              }
            />
          )}
        </Box>
      </Grid>
      {/* <Grid container padding={0} justifyContent="space-between" alignItems="center">
                <Box sx={{ margin: '-20px 0 -14px -16px', }}>
                    <RadialChart labelsData={labels} series={chartData} width={250} index={index} isHovered={isHovered} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '8px'
                }} onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}>
                    {CARD_RIGHT_BUTTON_GROUP.map((btn, index) => (
                        <SmallButton color={btn[colorKey]} key={index} label={btn.label} borderTopRightRadius={0}
                            borderBottomRightRadius={0} mb='4px' width={100} p={0} />
                    ))}
                </Box>
            </Grid> */}
      <Grid marginLeft={1} marginRight={1}>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: "0.75px",
            opacity: 0.8,
            marginBottom: "8px",
          }}
        >
          posted {convertDatetimeAgo(job?.updated_at)}
        </Typography>
        <Tooltip
          arrow
          // TransitionComponent={"Fade"}
          // TransitionProps={{ timeout: 600 }}
          title={job?.title}
          placement="top"
        >
          <Typography
            sx={{
              // minHeight: "60px",
              fontWeight: 700,
              fontSize: 20,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            gutterBottom
          >
            {job?.title.slice(0, 30)}
          </Typography>
        </Tooltip>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 12,
            marginBottom: "4px",
            letterSpacing: "0.25px",
          }}
        >
          {job?.salary?.currency?.symbol}
          {job?.salary?.max} per month
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Box
            component="img"
            sx={{
              height: 16,
              width: 16,
              maxHeight: { xs: 15 },
              maxWidth: { xs: 15 },
              mr: 1,
            }}
            alt="job_exp"
            src={job_exp}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.25px",
            }}
          >
            {job?.experience?.year} years Experience
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
        >
          <IconButton
            sx={{ padding: 0, marginLeft: "-5px", marginRight: "4px" }}
            color="redButton100"
            aria-label="search job"
            component="button"
          >
            <PlaceIcon />
          </IconButton>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.25px",
            }}
          >
            {job?.town?.name}, {job?.town?.region?.name}
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", marginTop: "-5px" }}>
          {job?.industry_job?.industry?.name && (
            <>
              <SmallButton
                color="blueButton600"
                height={25}
                label={ job?.industry_job?.industry?.name
                }
                mr="4px"
              />
            </>
          )}
          {job?.type && (
            <SmallButton
              color="blueButton700"
              height={25}
              label={job?.type}
              mr="4px"
            />
          )}
          {job?.work_setup && (
            <SmallButton
              color="blueButton700"
              height={25}
              label={job?.work_setup}
              mr="4px"
            />
          )}
        </Box> */}

        <Box
          sx={
            job?.industry_jobs.length <= 1 &&
            job?.type !== "" &&
            job?.work_setup !== ""
              ? {
                  width: "100%",
                  display: "flex",
                }
              : {
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",
                }
          }
        >
          {arrSlider
            .filter((item) => item !== null || item?.industry?.name !== null)
            .map((item, index) => {
              if (item !== "") {
                return (
                  <SmallButton
                    color={
                      item?.industry?.name
                        ? "blueButton600"
                        : item === ""
                        ? ""
                        : "blueButton700"
                    }
                    height={25}
                    // label={item?.industry ? item?.industry?.name : item}
                    value={item?.industry?.name}
                    label={
                      item?.industry
                        ? item?.industry?.name?.split(" ")[0]
                        : item
                    }
                    mr="4px"
                  />
                );
              }
            })}
        </Box>

        <TextWrapper
          mt="12px"
          mb={1}
          color={theme.palette.black100}
          letterSpacing="0.25px"
        >
          {job?.description}
        </TextWrapper>
      </Grid>

      <Grid
        container
        spacing={2}
        padding="0 8px 8px 0px"
        minHeight={45}
        sx={
          arrSlider2.length >= 4
            ? { justifyContent: "space-evenly", alignItems: "center" }
            : { ml: 2 }
        }
      >
        {arrSlider2.length >= 4 ? (
          <IconButton
            sx={{
              border: `1px solid ${theme.palette.grayBorder}`,
              borderRadius: "8px",
              width: "37px",
              height: "37px",
              ml: 1,
            }}
            color="redButton100"
            aria-label="search job"
            component="button"
            onClick={handleLeftClick}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        ) : null}
        <Box
          sx={
            job?.job_traits.length <= 1 &&
            job?.primary?.name !== "" &&
            job?.shadow?.name !== ""
              ? {
                  width: "65%",
                  display: "flex",
                }
              : {
                  width: "65%",
                  display: "flex",
                  overflow: "hidden",
                }
          }
        >
          {arrSlider2
            .filter((item) => item !== null)
            .map((item, index) => {
              if (item !== undefined) {
                return (
                  <SmallButton
                    color={item?.trait?.name ? "grayButton200" : "purpleButton"}
                    height={25}
                    label={item?.trait ? item?.trait?.name : item}
                    mr="4px"
                  />
                );
              }
            })}
        </Box>
        {arrSlider2.length >= 4 ? (
          <IconButton
            sx={{
              border: `1px solid ${theme.palette.grayBorder}`,
              borderRadius: "8px",
              width: "37px",
              height: "37px",
              mr: 1,
            }}
            color="redButton100"
            aria-label="search job"
            component="button"
            onClick={handleRightClick}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        ) : null}
      </Grid>
      
      <Grid
        container
        spacing={2}
        padding="0 16px 8px 16px"
        justifyContent="space-around"
      >
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            max={1000}
            labelsData={label1}
            series={[job?.TotalUserCount]}
            width={140}
            color={theme.palette.chart.red}
            index={index}
            isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label2}
            series={[job?.TotalUserShorlisted]}
            width={140}
            color={theme.palette.chart.green}
            index={index}
            isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label3}
            series={[job?.TotalUserInterviewed]}
            width={140}
            color={theme.palette.chart.yellow}
            index={index}
            isHovered={isHovered}
          />
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        padding="0 8px 8px 8px"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            height: 43,
            width: 43,
            maxHeight: { xs: 43 },
            maxWidth: { xs: 43 },
            borderRadius: "6px",
            background: theme.palette.chart.yellow,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 25,
              width: 25,
              maxHeight: { xs: 25 },
              maxWidth: { xs: 25 },
            }}
            alt="job_apply"
            src={job_apply}
          />
        </Box>
        <Grid sx={{ width: "75%", padding: 0, ml: 1 }}>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "12px",
              width: "100%",
              height: "43px",
            }}
            variant="contained"
            color="redButton100"
            onClick={handleClick}
          >
            {i18n["jobCard.apply"]}
          </Button>
        </Grid>
      </Grid>
      <CustomDialog
        show={openLoginDialog}
        hideButton={false}
        onDialogClose={onHandleClose}
        dialogWidth="sm"
        showFooter={false}
        title={isLoggedIn ? i18n["login.login"] : i18n["login.signUp"]}
        isApplyJob
      >
        <Typography sx={{ fontSize: "19px", color: "red", mb: 3, ml: 12 }}>
          {localStorage.getItem("isLoggedIn")
            ? ""
            : "To proceed further You need to login first!"}
        </Typography>
        {isLoggedIn ? (
          <ApplyJobs questions={questions} />
        ) : (
          <Login handleLogin={onHandleLogin} />
        )}
      </CustomDialog>
    </CustomCard>
  );
}
