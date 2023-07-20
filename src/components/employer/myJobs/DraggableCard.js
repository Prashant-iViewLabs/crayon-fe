import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Tooltip,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import profile from "../../../assets/profile2.svg";
import drag_dots from "../../../assets/drag_dots.svg";
import eye from "../../../assets/eye.svg";
import play from "../../../assets/play.svg";
import history from "../../../assets/history.svg";
import linkedin from "../../../assets/linkedin.svg";
import chat from "../../../assets/chat.svg";
import search from "../../../assets/search2.svg";
import info from "../../../assets/info.svg";
import thumbs_down from "../../../assets/thumbs_down.svg";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import RadialChart from "../../common/RadialChart";
import ManIcon from "@mui/icons-material/Man";
import locale from "../../../i18n/locale";
import {
  ALERT_TYPE,
  CARD_RIGHT_BUTTON_GROUP,
  ERROR_MSG,
} from "../../../utils/Constants";
import SmallButton from "../../common/SmallButton";
import SingleRadialChart from "../../common/SingleRadialChart";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { convertDOB } from "../../../utils/DateTime";
import CustomDialog from "../../common/CustomDialog";
import { setAlert } from "../../../redux/configSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCandidateCV, getQandA } from "../../../redux/employer/myJobsSlice";
import { data } from "./ManageJob";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  // marginTop: "8px",
  marginBottom: "8px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.chart.green200,
  },
}));

const StyledHR = styled(Box)(({ theme }) => ({
  borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  width: "0px",
  height: "10px",
  // marginRight: '8px'
}));
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginTop: 8,
  background: `${theme.palette.white} !important`,
  borderRadius: "10px",
  height: "auto !important",
  position: "unset",
  "& .MuiAccordionSummary-root": {
    alignItems: "start",
    padding: 0,
  },
  "& .MuiAccordionSummary-content": {
    // flexDirection: 'column',
    // margin: '2px 0 8px 0',
    margin: 0,
    ".summaryBox1": {
      margin: "8px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // alignItems: 'start',
      // marginRight: '20px'
    },
    ".summaryBox2": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    ".dragDots": {
      height: 24,
      width: 24,
      maxHeight: { xs: 24 },
      maxWidth: { xs: 24 },
      // borderRadius: 6
    },
    ".profileAvatar": {
      height: 30,
      width: 30,
      maxHeight: { xs: 30 },
      maxWidth: { xs: 30 },
      borderRadius: 6,
    },
    ".dotIcon": {
      position: "absolute",
      right: "30px",
      top: "-2px",
      width: "12px",
    },
    ".thumbs": {
      position: "absolute",
      right: "1px",
      top: "9px",
      width: "16px",
    },
    ".arrowFont": {
      fontSize: "1.1rem",
    },
    "& .MuiTypography-root": {
      // fontWeight: 700,
      // fontSize: '14px',
    },
    "& .MuiButtonBase-root": {
      // padding: '0 6px',
      // fontSize: 10,
      // fontWeight: 700,
      // minWidth: 30,
      // boxShadow: 'none',
      // borderRadius: 2,
      // height: '20px'
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.redButton.main,
    position: "absolute",
    right: "2px",
    bottom: "2px",
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
  "& .MuiCollapse-root": {
    "& .MuiAccordionDetails-root": {
      display: "flex",
      padding: 0,
      marginTop: "-10px",
      "& .MuiButtonBase-root": {
        // padding: '0 6px',
        // fontSize: 10,
        // fontWeight: 700,
        // minWidth: 30,
        // boxShadow: 'none',
        // padding: '1px 4px',
        // borderRadius: 3,
        // height: '20px'
      },
      ".contentBox1": {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8px",
      },
      ".contentBox2": {
        display: "flex",
        justifyContent: "space-between",
        // padding: '0 8px'
      },
      ".contentBox3": {
        display: "flex",
        justifyContent: "space-around",
        padding: "0 8px",
        marginTop: "-12px",
      },
      ".contentBox4": {
        display: "flex",
        justifyContent: "center",
        padding: "0 8px",
        margin: "8px 0",
      },
    },
  },
  "& .MuiButtonBase-root": {
    // boxShadow: 'none',
    // padding: '0 8px',
  },
}));

const StyledVR = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
  height: "10px",
}));

const labels = ["Applicants", "Shortlisted", "Interviews"];

const label = "match";

export default function DraggableCard({
  item,
  index,
  droppableId,
  onDragEnd,
  jobId,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const i18n = locale.en;
  const [chartData, setChartData] = useState([88]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElQandA, setAnchorElQandA] = useState(null);
  const [openQandADialog, setOpenQandADialog] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState([]);

  const onHandleClose = () => {
    setOpenInfoDialog(false);
    setAnchorEl(null);
  };

  const handleInfoDialog = (event) => {
    setOpenInfoDialog(true);
    !openInfoDialog && setAnchorEl(event.target);
  };

  const onHandleCloseQandA = () => {
    setOpenQandADialog(false);
    setAnchorElQandA(null);
  };

  const handleQandADialog = async (event) => {
    try {
      const data = {
        job_id: jobId,
        user_id: item?.user_id,
      };
      const { payload } = await dispatch(getQandA(data));
      if (payload?.status == "success") {
        console.log(payload?.data);
        setQuestionAnswer(payload?.data);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.error,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }

    setOpenQandADialog(true);
    !openQandADialog && setAnchorElQandA(event.target);
  };

  const handleCandidateCV = async () => {
    try {
      const { payload } = await dispatch(
        getCandidateCV({ user_id: item?.user_id })
      );

      if (payload?.status == "success") {
        const cvData = payload.data;
        navigate("/candidate/candidate-cv", { state: cvData });
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

  const handleReject = () => {
    const result = {
      destination: {
        droppableId: 9,
      },
      draggableId: item.user_id,
      source: {
        droppableId: droppableId,
      },
    };
    onDragEnd(result);
  };

  return (
    <Draggable
      key={item?.user_id}
      draggableId={item?.user_id?.toString()}
      index={index}
    >
      {(provided) => (
        <StyledAccordion
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          disableGutters
          onChange={(event, expanded) => setIsAccordionOpen(expanded)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                className="dragDots"
                alt="drag dots"
                src={drag_dots}
                sx={
                  {
                    // mr: 1
                  }
                }
              />
            </Box>
            <Box
              sx={{
                borderRight: `solid 0.5px ${theme.palette.grayBorder}`,
                opacity: "0.3",
              }}
            ></Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: "0 -8px 0 -8px" }}>
                <SingleRadialChart
                  hollow="52%"
                  nameSize="9px"
                  valueSize="14px"
                  nameOffsetY="11"
                  valueOffsetY="-17"
                  labelsData={label}
                  series={chartData}
                  width={86}
                  color={theme.palette.chart.green200}
                  index={1}
                  isHovered={false}
                />
              </Box>
              <Box className="summaryBox1">
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    component="img"
                    className="profileAvatar"
                    alt="crayon logo"
                    src={
                      item?.profile_url !== "No URL"
                        ? item?.profile_url
                        : profile
                    }
                    sx={
                      {
                        // mr: 1
                      }
                    }
                  />
                  <Box sx={{ marginLeft: "4px" }}>
                    <Tooltip
                      title={item?.first_name + " " + item?.last_name}
                      placement="top-end"
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mr: 1,
                          fontSize: "14px",
                          width: "100px",
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          overflow: "hidden", // Hides any overflowing content
                          textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                        }}
                      >
                        {item?.first_name + " " + item?.last_name}
                      </Typography>
                    </Tooltip>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-4px",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          mr: 1,
                          fontSize: "12px",
                          color: theme.palette.blueButton400.main,
                          width: "115px",
                        }}
                      >
                        {item?.candidate_profile?.candidate_info?.job_title
                          ?.title
                          ? item?.candidate_profile?.candidate_info?.job_title
                              ?.title
                          : "-"}
                      </Typography>
                      <StyledHR></StyledHR>
                      <IconButton sx={{ padding: "0 !important" }}>
                        <ManIcon color="blueButton400"></ManIcon>
                      </IconButton>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          mr: 1,
                          fontSize: "12px",
                        }}
                      >
                        {convertDOB(item?.candidate_profile?.dob)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {isAccordionOpen ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <IconButton
                      sx={{
                        padding: 0,
                        marginLeft: "-5px",
                        marginRight: "4px",
                      }}
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
                      {item?.candidate_profile?.town?.name},{" "}
                      {item?.candidate_profile?.town?.region?.name}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ ml: "4px" }}>
                    <IconButton
                      sx={{
                        width: "22px",
                        mr: 1,
                        height: "22px",
                        color: theme.palette.redButton100.main,
                      }}
                    >
                      <PlayCircleFilledIcon />
                    </IconButton>
                    <SmallButton
                      color="redButton"
                      startIcon={
                        <Box
                          component="img"
                          className="eye"
                          alt="eye logo"
                          src={eye}
                        />
                      }
                      startIconMargin="4px"
                      height={24}
                      fontWeight={700}
                      label={i18n["draggableCard.cv"]}
                      mr="4px"
                      borderRadius="25px"
                    ></SmallButton>
                    <SmallButton
                      color="redButton"
                      startIcon={
                        <Box
                          component="img"
                          className="eye"
                          alt="eye logo"
                          src={eye}
                        />
                      }
                      startIconMargin="4px"
                      height={24}
                      fontWeight={700}
                      label={i18n["draggableCard.qAnda"]}
                      mr="4px"
                      borderRadius="25px"
                      onClick={handleQandADialog}
                    ></SmallButton>
                  </Box>
                )}
              </Box>
              <Tooltip
                title={item?.job_users[0]?.candidate_job_status?.name}
                placement="top-end"
              >
                <IconButton
                  color={
                    item?.job_users[0]?.candidate_job_status?.name == "pending"
                      ? "yellowButton100"
                      : item?.job_users[0]?.candidate_job_status?.name ==
                        "not for me"
                      ? "redButton"
                      : item?.job_users[0]?.candidate_job_status?.name ==
                        "i like this"
                      ? "orangeButton"
                      : "greenButton200"
                  }
                  className="dotIcon"
                >
                  <FiberManualRecordIcon
                    sx={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={"reject"} placement="top-end">
                <Box
                  component="img"
                  className="thumbs"
                  alt="thumbs"
                  src={thumbs_down}
                  sx={{
                    mr: 1,
                  }}
                  onClick={handleReject}
                />
              </Tooltip>
            </Box>

            {/* <IconButton color='yellowButton100' sx={{ justifyContent: 'end', marginRight: '-7px' }}>
                      <FiberManualRecordIcon sx={{ width: '18px', height: '18px' }} />
                  </IconButton>
                  <Box className='summaryBox1'>
                      <Box
                          component="img"
                          className="profileAvatar"
                          alt="crayon logo"
                          src={profile}
                          sx={{
                              mr: 1
                          }}
                      />
                      <Typography sx={{
                          fontWeight: 700,
                          mr: 1
                      }}>Mickey Mouse, </Typography>

                      <Typography sx={{
                          fontWeight: 400,
                      }}>Data Scientist, {item.id}</Typography>
                  </Box>
                  <Box className='summaryBox2'>

                      <SmallButton color="orangeButton" borderRadius="5px" label='75%' minWidth='23px'></SmallButton>
                      <SmallButton color="redButton" borderRadius="25px" label={i18n['draggableCard.cv']} minWidth='23px'></SmallButton>
                      <SmallButton color="blueButton400" borderRadius="5px" label='8' minWidth='23px'></SmallButton>
                      <SmallButton color="blueButton400" borderRadius="5px" label='R45,000' minWidth='23px'></SmallButton>
                      <SmallButton color="blueButton400" borderRadius="5px" label='QL 4' minWidth='23px'></SmallButton>
                      <SmallButton color="redButton" borderRadius="25px" label={i18n['draggableCard.qAnda']} minWidth='23px'></SmallButton>
                      <ArrowBackIosIcon color="redButton" className='arrowFont' sx={{ ml: '4px' }} />
                      <ArrowForwardIosIcon color="lightGreenButton100" className='arrowFont' />
                      <CloseIcon color="redButton" />
                  </Box> */}
          </AccordionSummary>

          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                className="dragDots"
                alt="drag dots"
                src={drag_dots}
                sx={
                  {
                    // mr: 1
                  }
                }
              />
            </Box>
            <Box
              sx={{
                borderRight: `solid 0.5px ${theme.palette.grayBorder}`,
                opacity: "0.3",
              }}
            ></Box>

            <Box
              sx={{
                m: "10px",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    mr: 1,
                    width: "43px",
                    height: "43px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    background: theme.palette.redButton100.main,
                  }}
                >
                  <Box
                    component="img"
                    className="dragDots"
                    alt="drag dots"
                    src={play}
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    mr: 1,
                    width: "43px",
                    height: "43px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    background: theme.palette.redButton100.main,
                  }}
                >
                  <Box
                    component="img"
                    className="dragDots"
                    alt="drag dots"
                    src={play}
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </Box>
                <SmallButton
                  color="redButton"
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={eye}
                    />
                  }
                  startIconMargin="4px"
                  height={24}
                  fontWeight={700}
                  label={i18n["draggableCard.cv"]}
                  mr="4px"
                  borderRadius="25px"
                  onClick={handleCandidateCV}
                ></SmallButton>

                <SmallButton
                  color="redButton"
                  startIcon={
                    <Box
                      component="img"
                      className="eye"
                      alt="eye logo"
                      src={eye}
                    />
                  }
                  startIconMargin="4px"
                  height={24}
                  fontWeight={700}
                  label={i18n["draggableCard.qAnda"]}
                  mr="4px"
                  borderRadius="25px"
                  onClick={handleQandADialog}
                ></SmallButton>
                <Popover
                  id="dropdown-menu"
                  open={openQandADialog}
                  anchorEl={anchorElQandA}
                  onClose={onHandleCloseQandA}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  sx={{
                    width: "100% !important",
                    "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
                      padding: "16px",
                    },
                  }}
                >
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        mr: 1,
                      }}
                    >
                      {i18n["pendingJobs.jobquestions"]}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ width: "90%" }}>
                        {questionAnswer.map((questions, index) => {
                          return (
                            <>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  mr: 1,
                                  mt: 1,
                                }}
                              >
                                Question #{index + 1}: {questions?.question}
                              </Typography>
                              <Paper
                                sx={{
                                  display: "flex",
                                  height: "30px",
                                  borderRadius: "25px",
                                  boxShadow: "none",
                                  border: `1px solid ${theme.palette.grayBorder}`,
                                }}
                              >
                                <InputBase
                                  disabled
                                  sx={{ ml: 2, mr: 2 }}
                                  id="password"
                                  value={questions?.answer}
                                  type="text"
                                  placeholder={i18n["pendingJobs.answer"]}
                                />
                              </Paper>
                            </>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                </Popover>
              </Box>
              <Box
                sx={{
                  mt: 1,
                }}
              >
                {item?.candidate_profile?.candidate_info?.primary?.name !=
                  null && (
                  <SmallButton
                    color="purpleButton"
                    height={25}
                    letterSpacing="0"
                    p="8px"
                    label={
                      item?.candidate_profile?.candidate_info?.primary?.name
                    }
                    mr="8px"
                  />
                )}

                {item?.candidate_profile?.candidate_info?.shadow?.name !=
                  null && (
                  <SmallButton
                    color="brownButton"
                    height={25}
                    letterSpacing="0"
                    p="8px"
                    label={
                      item?.candidate_profile?.candidate_info?.shadow?.name
                    }
                    mr="8px"
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box sx={{ margin: "0 -17px 0 -17px" }}>
                  <SingleRadialChart
                    hollow="60%"
                    nameSize="9px"
                    valueSize="14px"
                    nameOffsetY="11"
                    valueOffsetY="-17"
                    labelsData={label}
                    series={chartData}
                    width={105}
                    color={theme.palette.chart.green200}
                    index={1}
                    isHovered={false}
                  />
                </Box>
                <Box
                  sx={{
                    ml: 1,
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    Experience:{" "}
                    {item?.candidate_profile?.candidate_info?.experience?.year}{" "}
                    years
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      Number(
                        item?.candidate_profile?.candidate_info?.experience
                          ?.year
                      ) * 10
                    }
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    Qualification Lv:
                    {
                      item?.candidate_profile?.candidate_info
                        ?.highest_qualification?.highest_
                    }
                    <Tooltip
                      title={
                        item?.candidate_profile?.candidate_info
                          ?.highest_qualification?.descript
                      }
                      placement="top-end"
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.25px",
                          width: "150px",
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          overflow: "hidden", // Hides any overflowing content
                          textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                        }}
                      >
                        (
                        {
                          item?.candidate_profile?.candidate_info
                            ?.highest_qualification?.descript
                        }
                        )
                      </Typography>
                    </Tooltip>
                  </Typography>

                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      item?.candidate_profile?.candidate_info
                        ?.highest_qualification?.highest_ * 10
                    }
                  />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    Salary: {item?.Currency}
                    {item?.Salary}
                  </Typography>
                  <BorderLinearProgress variant="determinate" value={50} />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.25px",
                    }}
                  >
                    Notice{" "}
                    {
                      item?.candidate_profile?.candidate_info?.notice_period
                        ?.description
                    }
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      item?.candidate_profile?.candidate_info?.notice_period?.description.split(
                        " "
                      )[0] * 7
                    }
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Tooltip title={"info"} placement="top-end">
                  <Box
                    sx={{
                      mr: 1,
                      width: "43px",
                      height: "43px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      component="img"
                      className="dragDots"
                      alt="drag dots"
                      src={info}
                      sx={{
                        width: "43px",
                        height: "43px",
                        cursor: "pointer",
                      }}
                      onClick={handleInfoDialog}
                    />
                  </Box>
                </Tooltip>

                <Popover
                  id="dropdown-menu"
                  open={openInfoDialog}
                  anchorEl={anchorEl}
                  onClose={onHandleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{
                    width: "16% !important",
                    "& .css-ll95b0-MuiPaper-root-MuiPopover-paper": {
                      padding: "16px 0 16px 0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: "8px 16px 8px 16px",
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      color="grayButton"
                      sx={{
                        mr: "4px",
                        padding: "0 !important",
                        minWidth: "25px !important",
                        "& .MuiSvgIcon-root": {
                          width: "25px",
                        },
                      }}
                    >
                      <EmailIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        mr: 1,
                        opacity: 0.75,
                        letterSpacing: "0.75px",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides any overflowing content
                        textOverflow: "ellipsis", // Adds dots at the end of overflowing text
                      }}
                    >
                      mickey.mouse@gmail.com
                    </Typography>
                    <IconButton
                      aria-label="edit"
                      color="grayButton"
                      sx={{
                        mr: "4px",
                        padding: "0 !important",
                        color: "blue",
                        minWidth: "25px !important",
                        "& .MuiSvgIcon-root": {
                          width: "25px",
                        },
                      }}
                    >
                      <ContentCopyRoundedIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 16px 8px 16px",
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      color="grayButton"
                      sx={{
                        mr: "4px",
                        padding: "0 !important",
                        minWidth: "25px !important",
                        "& .MuiSvgIcon-root": {
                          width: "25px",
                        },
                      }}
                    >
                      <CallIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        mr: 1,
                        opacity: 0.75,
                        letterSpacing: "0.75px",
                      }}
                    >
                      09876543211
                    </Typography>
                    <IconButton
                      aria-label="edit"
                      color="grayButton"
                      sx={{
                        mr: "4px",
                        padding: "0 !important",
                        minWidth: "25px !important",
                        color: "blue",
                        marginLeft: "auto",
                        "& .MuiSvgIcon-root": {
                          width: "25px",
                        },
                      }}
                    >
                      <ContentCopyRoundedIcon />
                    </IconButton>
                  </Box>
                  <StyledVR></StyledVR>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 1,
                        width: "43px",
                        height: "43px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        component="img"
                        className="dragDots"
                        alt="drag dots"
                        src={history}
                        sx={{
                          width: "43px",
                          height: "43px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        mr: 1,
                        width: "43px",
                        height: "43px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        background: theme.palette.base.main,
                      }}
                    >
                      <Box
                        component="img"
                        className="dragDots"
                        alt="drag dots"
                        src={linkedin}
                        sx={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </Box>
                  </Box>
                </Popover>

                <Box
                  sx={{
                    mr: 1,
                    width: "43px",
                    height: "43px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    component="img"
                    className="dragDots"
                    alt="drag dots"
                    src={search}
                    sx={{
                      width: "43px",
                      height: "43px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Tooltip title={"chat"} placement="top-end">
                  <Box
                    sx={{
                      mr: 1,
                      width: "43px",
                      height: "43px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      component="img"
                      className="dragDots"
                      alt="drag dots"
                      src={chat}
                      sx={{
                        width: "43px",
                        height: "43px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </AccordionDetails>
        </StyledAccordion>
      )}
    </Draggable>
  );
}
