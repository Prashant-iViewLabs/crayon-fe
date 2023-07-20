import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MyJobsCard from "./MyJobsCard";
import SwipeableViews from "react-swipeable-views";
import ButtonPanel from "../../common/ButtonPanel";
import {
  ALERT_TYPE,
  EMPLOYER_MY_JOBS_LEFT,
  EMPLOYER_MY_JOBS_RIGHT,
  ERROR_MSG,
} from "../../../utils/Constants";
import SearchBar from "../../common/SearchBar";
import locale from "../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  getAllEmployerJobs,
  setAlert,
  setLoading,
} from "../../../redux/employer/employerJobsConfigSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getAllJobsListing,
  getFilteredJobsListing,
} from "../../../redux/employer/empJobListing";
import { getAllStages } from "../../../redux/stages";
import { getJobStatus } from "../../../redux/status";
import ManageJob from "./ManageJob";
import CustomDialog from "../../common/CustomDialog";
import {
  getTalentJobStatusApplications,
  getTalentJobStatusCount,
} from "../../../redux/employer/myJobsSlice";

export default function MyJobs() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openManageJobDialog, setOpenManageJobDialog] = useState(false);
  const allStages = useSelector((state) => state.configstages.stages);
  const jobStatus = useSelector((state) => state.configjobstatus.status);
  const [allJobs, setAllJobs] = useState([]);
  const [jobListFilter, setJobListFilter] = useState([allStages[0]?.id]);
  const [jobStatusFilter, setJobStatusFilter] = useState([jobStatus[0]?.id]);
  const [talents, setTalents] = useState([]);
  let lastkey = useRef(0);

  const [jobId, setjobId] = useState();
  const allJobsFilter = async () => {
    await dispatch(getAllEmployerJobs());
  };

  const getTalentStatusApplications = async (
    jobId,
    jobStatusId,
    manageStatus
  ) => {
    try {
      const [manage] = await Promise.all([
        dispatch(
          getTalentJobStatusApplications({
            job_id: jobId,
            job_status_id: jobStatusId,
          })
        ),
      ]);
      lastkey += 1;
      setTalents((prevTalents) => {
        const updatedTalents = manageStatus?.map((item) => {
          if (item.id === jobStatusId) {
            return {
              ...item,
              items: manage?.payload?.data,
            };
          } else {
            const existingItem = prevTalents.find(
              (prevItem) => prevItem.id === item.id
            );
            return { ...item, items: existingItem ? existingItem.items : [] };
          }
        });
        return [...updatedTalents];
      });
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

  const getTalentMyJobStatusCount = async (jobId) => {
    try {
      const [manage] = await Promise.all([
        dispatch(getTalentJobStatusCount({ job_id: jobId })),
      ]);
      console.log(manage.payload.data);
      manage.payload.data.map((item) => {
        item.count > 0
          ? getTalentStatusApplications(jobId, item.id, manage.payload.data)
          : setTalents((prevTalents) => {
              const updatedTalents = manage.payload.data?.map((item) => {
                const existingItem = prevTalents.find(
                  (prevItem) => prevItem.id === item.id
                );
                return {
                  ...item,
                  items: existingItem ? existingItem.items : [],
                };
              });
              return [...updatedTalents];
            });
      });
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

  const getStages = async () => {
    await dispatch(getAllStages());
  };
  const getStatus = async () => {
    await dispatch(getJobStatus());
  };
  const onHandleClose = () => {
    setOpenManageJobDialog(false);
  };
  const showManageJob = (jobId) => {
    setOpenManageJobDialog(true);
    getTalentMyJobStatusCount(jobId);
    setjobId(jobId);
  };
  const getJobList = async (
    selectedFilters = jobListFilter,
    selectedStatusFilter = jobStatusFilter
  ) => {
    if (selectedFilters.length == 0) {
      setAllJobs([]);
    } else if (
      selectedFilters.length == 1 &&
      selectedFilters[0] == 1111 &&
      selectedStatusFilter.length == 1 &&
      selectedStatusFilter[0] == 1111
    ) {
      const { payload } = await dispatch(getAllJobsListing());
      if (payload?.status == "success") {
        // setjobTypeID(payload.data[payload.data.length - 1]?.job_id);
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
        selectedStatusFilter: selectedStatusFilter.toString(),
      };
      const { payload } = await dispatch(getFilteredJobsListing(data));
      if (payload?.status == "success") {
        // setjobTypeID(payload.data[payload.data.length - 1]?.job_id);
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

  const jobsFilter = (selectedFilter) => {
    setAllJobs([]);
    setJobListFilter(selectedFilter);
    getJobList(selectedFilter, jobStatusFilter);
  };
  const jobsFilterLeft = (selectedFilter) => {
    setAllJobs([]);
    setJobStatusFilter(selectedFilter);
    getJobList(jobListFilter, selectedFilter);
  };

  useEffect(() => {
    allJobsFilter();
    getStages();
    getStatus();
  }, []);
  useEffect(() => {
    if (allStages?.length > 0) {
      setJobListFilter([allStages[0]?.id]);
    }
    getJobList([allStages[0]?.id], [jobStatus[0]?.id]);
  }, []);

  return (
    <Grid
      container
      spacing={0}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <ButtonPanel
        panelData={jobStatus}
        side="left"
        onChangeFilter={jobsFilterLeft}
      />
      <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
        <SearchBar placeholder={i18n["myJobs.searchPlaceholder"]} />
        <InfiniteScroll
          key={`${jobListFilter}, ${jobStatusFilter}`}
          style={{ overflow: "hidden" }}
          dataLength={allJobs.length}
          // next={() => getJobList(jobListFilter, jobTypeID)}
          hasMore={true}
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
            {allJobs?.length > 0 ? (
              allJobs.map((job) => (
                <Grid xl={3} lg={4} md={6} xs={12} key={job.job_id}>
                  <MyJobsCard
                    index={job.job_id}
                    job={job}
                    showManageJob={() => showManageJob(job.job_id)}
                  />
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  mt: 8,
                  color: "black",
                }}
              >
                {i18n["jobs.noData"]}
              </Box>
            )}
          </Grid>
        </InfiniteScroll>
        {/* <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          <SwipeableViews enableMouseEvents>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="11" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="12" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="13" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="14" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="15" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <MyJobsCard index="16" />
            </Grid>
          </SwipeableViews>
        </Grid> */}
      </Grid>
      <ButtonPanel
        panelData={allStages}
        side="right"
        onChangeFilter={jobsFilter}
      />
      <CustomDialog
        show={openManageJobDialog}
        onDialogClose={onHandleClose}
        // title={i18n["manageJob.title"]}
        isTalentMyJobsDialog
      >
        <ManageJob jobId={jobId} talents={talents} setTalents={setTalents} />
      </CustomDialog>
    </Grid>
  );
}
