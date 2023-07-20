import { useState } from "react";
import { useTheme } from "@mui/material/styles";
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SingleRadialChart from "../../common/SingleRadialChart";
import SmallButton from "../../common/SmallButton";
import CustomCard from "../../common/CustomCard";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ButtonMenu from "./ButtonMenu";
import TextWrapper from "../../common/TextWrapper";
import CustomDialog from "../../common/CustomDialog";
import ManageJob from "./ManageJob";
import { convertDatetimeAgo } from "../../../utils/DateTime";
import { Tooltip } from "@mui/material";
import ManageButtonMenu from "./ManageButtonMenu";
const label1 = "applicants";
const label2 = "shortlisted";
const label3 = "interviews";

export default function MyJobsCard({ index, job, showManageJob }) {
  const i18n = locale.en;
  const theme = useTheme();
  const [colorKey, setColorKey] = useState("color");
  const [chartData1, setChartData1] = useState([11]);
  const [chartData2, setChartData2] = useState([78]);
  const [chartData3, setChartData3] = useState([30]);
  const [isHovered, setIsHovered] = useState(false);
  const [isStar, setIsStarSelected] = useState(false);

  const [arrSlider, setArrSlider] = useState([
    job?.industry[0],
    job?.type,
    job?.work_setup,
  ]);

  const [arrSlider2, setArrSlider2] = useState([
    job?.primaryName,
    job?.shadowName,
    ...(job?.traits || []),
  ]);

  const handleRightClick = () => {
    setArrSlider2([...arrSlider2.slice(1), ...arrSlider2.slice(0, 1)]);
  };
  const handleLeftClick = () => {
    setArrSlider2([
      ...arrSlider2.slice(arrSlider2.length - 1),
      ...arrSlider2.slice(0, arrSlider2.length - 1),
    ]);
  };

  // const showManageJob = () => {
  //   setOpenManageJobDialog(true);
  // };
  // const onHandleClose = () => {
  //   setOpenManageJobDialog(false);
  // };
  const handleHoverEnter = () => {
    setColorKey("hover");
  };
  const handleHoverLeave = () => {
    setColorKey("color");
  };
  const handleStar = () => {
    setIsStarSelected(!isStar);
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
        flexWrap={"nowrap"}
      >
        <ButtonMenu companyId={job?.company_id} />
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
          {job?.stageName && (
            <SmallButton color="lightGreenButton300" label={job?.stageName} />
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
            />
          </Box>
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
              onClick={handleStar}
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
              onClick={handleStar}
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
          {job?.currencySymbol}
          {job?.salaryMax} per month
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
            {job?.experiance} years Experience
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
            {job?.townName}, {job?.townRegionName}
          </Typography>
        </Box>

        <Box
          sx={
            job?.industry?.length <= 1 &&
            job?.type !== "" &&
            job?.work_setup !== ""
              ? {
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",
                }
              : {
                  width: "100%",
                  display: "flex",
                  overflow: "hidden",
                }
          }
        >
          {arrSlider
            .filter((item) => item !== null)
            .map((item, index) => {
              if (item !== "" && item?.industry_name !== null) {
                return (
                  <SmallButton
                    color={
                      item?.industry_name ? "blueButton600" : "blueButton700"
                    }
                    height={25}
                    value={item?.industry_name}
                    label={
                      item?.industry_name
                        ? item?.industry_name?.split(" ")[0]
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
        sx={
          arrSlider2?.length >= 4
            ? { justifyContent: "space-evenly", alignItems: "center" }
            : { ml: 2 }
        }
        minHeight={33}
      >
        {arrSlider2?.length >= 4 ? (
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
            job?.traits?.length <= 1 &&
            job?.primaryName !== "" &&
            job?.shadowName !== ""
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
              if (
                item !== undefined &&
                item.trait_name !== null &&
                item !== null
              ) {
                return (
                  <SmallButton
                    color={item?.trait_name ? "grayButton200" : "purpleButton"}
                    height={25}
                    label={item?.trait_name ? item?.trait_name : item}
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
            series={[job?.totalusershorlisted]}
            width={140}
            color={theme.palette.chart.green}
            index={index}
            isHovered={isHovered}
          />
        </Box>
        <Box sx={{ margin: "0 -22px 0 -22px" }}>
          <SingleRadialChart
            labelsData={label3}
            series={[job?.totaluserinterviewed]}
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
        display="flex"
        padding="0 18px 8px 18px"
        justifyContent="space-between"
        // alignItems="center"
      >
        {/* <Box
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
        </Box> */}
        {/* <Grid sx={{ width: "50%", padding: 0, ml: 1 }}> */}
        <Box sx={{ width: "66%", paddingRight: "10px" }}>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "12px",
              width: "100%",
              height: "43px",
            }}
            variant="contained"
            color="redButton100"
            onClick={() => showManageJob()}
          >
            {i18n["manageJob.talentBtn"]}
          </Button>
        </Box>

        <Box sx={{ width: "30%" }}>
          <ManageButtonMenu job={job} />
        </Box>
      </Grid>
    </CustomCard>
  );
}
