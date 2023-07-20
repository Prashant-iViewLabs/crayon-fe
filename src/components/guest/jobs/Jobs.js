import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, useTheme } from "@mui/material/styles";
import JobCard from "./JobCard";
import SearchBar from "../../common/SearchBar";
import SwipeableViews from "react-swipeable-views";
import ButtonPanel from "../../common/ButtonPanel";
import {
  JOBS_LEFT_INDUSTRIES_BUTTON_GROUP,
  JOBS_LEFT_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_JOB_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_POSTS_BUTTON_GROUP,
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
  ALERT_TYPE,
  ERROR_MSG,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import { getAllJobs, getFilteredJobs } from "../../../redux/guest/jobsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllIndustries } from "../../../redux/configSlice";
import { setAlert } from "../../../redux/configSlice";
import { getAllJobRoleType } from "../../../redux/jobRole";
import { getAllStages } from "../../../redux/stages";
import { type } from "@testing-library/user-event/dist/type";
import { getAllTypes } from "../../../redux/allTypes";
import { selectClasses } from "@mui/material";
import jwt_decode from "jwt-decode";

export default function Jobs() {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const theme = useTheme();
  const allIndustries = useSelector((state) => state.config.industries);
  const allJobTypes = useSelector((state) => state.jobtype.jobRoleType);
  const allStages = useSelector((state) => state.configstages.stages);
  const allTypes = useSelector((state) => state.configAllTypes?.types);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState([allIndustries[0]?.id]);
  const [filtersJobType, setFiltersJobType] = useState([allJobTypes[0]?.id]);
  const [filtersJobStage, setFiltersJobStage] = useState([allStages[0]?.id]);
  const [filtersType, setFiltersType] = useState([allTypes[0]?.id]);
  const [filterAllTypes, setFilterAllTypes] = useState(false);
  const [lastKey, setLastKey] = useState("");
  const [searchedJobs, setSearchedJobs] = useState("");

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const isolateTouch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const getTypes = async () => {
    await dispatch(getAllTypes());
  };
  const getIndustries = async () => {
    await dispatch(getAllIndustries());
  };
  const getJobTypes = async () => {
    await dispatch(getAllJobRoleType());
  };
  const getStages = async () => {
    await dispatch(getAllStages());
  };
  const getJobList = async (
    selectedFilters = filters,
    jobtype = filtersJobType,
    jobstage = filtersJobStage,
    personalityType = filtersType,
    lastkeyy,
    title = searchedJobs,
    filteralltype
  ) => {
    if (selectedFilters.length == 0) {
      setAllJobs([]);
    } else if (
      selectedFilters.length == 1 &&
      selectedFilters[0] == 1111 &&
      jobtype.length == 1 &&
      jobtype[0] == 1111 &&
      jobstage.length == 1 &&
      jobstage[0] == 1111 &&
      personalityType.length == 1 &&
      personalityType[0] == 1111 &&
      title == ""
    ) {
      const { payload } = await dispatch(getAllJobs(lastkeyy));
      if (payload?.status == "success") {
        setLastKey(payload.data[payload.data.length - 1]?.job_id);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: "Something went wrong! please relaod the window",
          })
        );
      }
    } else {
      const data = {
        selectedFilters: selectedFilters.toString(),
        lastKey: lastkeyy?.toString(),
        jobtype: jobtype.toString(),
        jobstage: jobstage.toString(),
        personalityType: personalityType.toString(),
        title: title,
        user_id: token ? decodedToken?.data?.user_id : "",
        favourite: filteralltype == false ? "" : filteralltype,
      };
      const { payload } = await dispatch(getFilteredJobs(data));
      if (payload?.status == "success") {
        setLastKey(payload.data[payload.data.length - 1]?.job_id);
        setAllJobs((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    }
  };
  useEffect(() => {
    getIndustries();
    getJobTypes();
    getStages();
    getTypes();
    getJobList(
      [allIndustries[0]?.id],
      [allJobTypes[0]?.id],
      [allStages[0]?.id],
      [allTypes[0]?.id],
      "",
      searchedJobs,
      ""
    );
  }, []);
  // useEffect(() => {
  //   setAllJobs([]);
  //   setFilters([allIndustries[0]?.id]);
  //   setFiltersJobType([allJobTypes[0]?.id]);
  //   setFiltersJobStage([allStages[0]?.id]);
  //   setFiltersType([allTypes[0]?.id]);
  //   setSearchedJobs("");
  // }, []);
  const onChangeFilter = (selectedFilter) => {
    setAllJobs([]);
    setLastKey("");
    setFilters(selectedFilter);
    getJobList(
      selectedFilter,
      filtersJobType,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      filterAllTypes
    );
  };
  const onChangeFilterJobType = (selectedFilter) => {
    let jobs = [];
    selectedFilter.map((type) => {
      let selectedJobType = allJobTypes.find((jobtype) => jobtype.id === type);
      jobs.push(selectedJobType.name);
    });
    setAllJobs([]);
    setLastKey("");
    setFiltersJobType(jobs);
    getJobList(
      filters,
      jobs,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      filterAllTypes
    );
  };
  const onChangeFilterJobStage = (selectedFilter) => {
    setAllJobs([]);
    setLastKey("");
    setFiltersJobStage(selectedFilter);
    getJobList(
      filters,
      filtersJobType,
      selectedFilter,
      filtersType,
      "",
      searchedJobs,
      filterAllTypes
    );
  };
  const onChangeFilterType = (selectedFilter) => {
    setAllJobs([]);
    setLastKey("");
    setFiltersType(selectedFilter);
    getJobList(
      filters,
      filtersJobType,
      filtersJobStage,
      selectedFilter,
      "",
      searchedJobs,
      filterAllTypes
    );
  };

  const onChangeFilterAllTypes = (selectedFilter) => {
    console.log(selectedFilter);
    setAllJobs([]);
    setLastKey("");
    setFilterAllTypes(true);
    getJobList(
      filters,
      filtersJobType,
      filtersJobStage,
      filtersType,
      "",
      searchedJobs,
      true
    );
  };

  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box>
        <ButtonPanel
          topMargin={true}
          panelData={allIndustries}
          side="left"
          onChangeFilter={onChangeFilter}
        />
        
      </Box>
      <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
        <SearchBar
          placeholder={i18n["jobs.searchPlaceholder"]}
          setAllJobs={setAllJobs}
          setSearchedJobs={setSearchedJobs}
        />
        <InfiniteScroll
          key={`${filters} + ${filtersJobType} + ${filtersJobStage} + ${filtersType}+${searchedJobs} +${filterAllTypes}`}
          style={{ overflow: "hidden" }}
          dataLength={allJobs.length} //This is important field to render the next data
          next={() =>
            getJobList(
              filters,
              filtersJobType,
              filtersJobStage,
              filtersType,
              lastKey,
              searchedJobs,
              filterAllTypes
            )
          }
          hasMore={true} //{allJobs.length <= allJobs[0]?.TotalJobs}
          // loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid
            container
            spacing={2}
            flexDirection={{ sx: "column", md: "row" }}
            sx={{
              my: 2,
              display: { xs: "none", md: "flex" },
              marginTop: "60px",
            }}
          >
            {allJobs.length > 0
              ? allJobs?.map((job) => (
                  <Grid xl={3} lg={4} md={6} xs={12} key={job.job_id}>
                    <JobCard index={job.job_id} job={job} />
                  </Grid>
                ))
              : (allJobs.length = 0 ? (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      mt: 4,
                      color: theme.palette.placeholder,
                    }}
                  >
                    {i18n["jobs.noData"]}
                  </Box>
                ) : null)}
          </Grid>
        </InfiniteScroll>
        <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          {/* <SwipeableViews enableMouseEvents onTouchStart={isolateTouch}>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="11" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="12" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="13" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="14" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="15" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <JobCard index="16" />
            </Grid>
          </SwipeableViews> */}
        </Grid>
      </Grid>
      <Box>
        <ButtonPanel
          topMargin={true}
          panelData={allJobTypes}
          side="right"
          onChangeFilter={onChangeFilterJobType}
        />
        <ButtonPanel
          panelData={allStages}
          side="right"
          onChangeFilter={onChangeFilterJobStage}
        />
        <ButtonPanel
          panelData={JOBS_RIGHT_STAGES_BUTTON_GROUP}
          onChangeFilter={onChangeFilterAllTypes}
          side="right"
        />
        <ButtonPanel
          panelData={allTypes}
          side="left"
          onChangeFilter={onChangeFilterType}
        />
      </Box>
    </Grid>
  );
}
