import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TalentCard from "./TalentCard";
import { useTheme } from "@mui/material/styles";
import SearchBar from "../../common/SearchBar";
import SwipeableViews from "react-swipeable-views";
import ButtonPanel from "../../common/ButtonPanel";
import {
  ALERT_TYPE,
  JOBS_LEFT_INDUSTRIES_BUTTON_GROUP,
  JOBS_LEFT_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_JOB_TYPES_BUTTON_GROUP,
  JOBS_RIGHT_POSTS_BUTTON_GROUP,
  JOBS_RIGHT_STAGES_BUTTON_GROUP,
  TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP,
  TALENT_RIGHT_JOB_TYPES_BUTTON_GROUP,
} from "../../../utils/Constants";
import locale from "../../../i18n/locale";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTalentList } from "../../../redux/guest/talentSlice";
import { useSelector } from "react-redux";
import { getAllIndustries, setAlert } from "../../../redux/configSlice";
import { getAllJobs, getFilteredJobs } from "../../../redux/guest/jobsSlice";
import { getAllJobRoleType } from "../../../redux/jobRole";
import { getAllStages } from "../../../redux/stages";
import { get } from "lodash";
import jwt_decode from "jwt-decode";
import { getAllTypes } from "../../../redux/allTypes";

export default function Talent() {
  const i18n = locale.en;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allIndustries = useSelector((state) => state.config.industries);
  const allTypes = useSelector((state) => state.configAllTypes?.types);
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState([allIndustries[0]?.id]);
  const [filtersType, setFiltersType] = useState([allTypes[0]?.id]);
  const [all_talent, setAll_talent] = useState([]);
  const isolateTouch = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const token = localStorage?.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const getTalent = async (selectedFilters = filters) => {
    if (selectedFilters.length == 0) {
      setAll_talent([]);
    } else if (selectedFilters.length == 1) {
      const lastKey = all_talent?.[all_talent.length - 1]?.user_id || "";
      const data = {
        lastKey: lastKey,
        user_id: token ? decodedToken?.data?.user_id : "",
      };
      const { payload } = await dispatch(getTalentList(data));
      if (payload?.status == "success") {
        setAll_talent((prevState) => [...prevState, ...payload.data]);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } else {
      console.log("ERROR!!!");
    }
  };
  const getIndustries = async () => {
    await dispatch(getAllIndustries());
  };
  const getTypes = async () => {
    await dispatch(getAllTypes());
  };

  const onChangeFilter = (selectedFilter) => {
    setAllJobs([]);
    // setLastKey("");
    setFilters(selectedFilter);
    getTalent(selectedFilter, filtersType);
  };

  const onChangeFilterType = (selectedFilter) => {
    setAllJobs([]);
    // setLastKey("");
    setFiltersType(selectedFilter);
    getTalent(filters, selectedFilter);
  };

  useEffect(() => {
    getIndustries();
    getTypes();
    getTalent([allIndustries[0]?.id], [allTypes[0]?.id]);
  }, []);
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
        <ButtonPanel
          panelData={allTypes}
          side="left"
          onChangeFilter={onChangeFilterType}
        />
      </Box>
      <Grid xs={12} sm={6} md={8} lg={9} xl={10}>
        <SearchBar placeholder={i18n["jobs.searchPlaceholder"]} />
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={all_talent.length}
          next={getTalent}
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
            {all_talent.length > 0 ? (
              all_talent?.map((talent) => (
                <Grid xl={3} lg={4} md={6} xs={12} key={talent}>
                  <TalentCard index={talent} job={talent} />
                </Grid>
              ))
            ) : (
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
            )}
          </Grid>
        </InfiniteScroll>
        <Grid container spacing={2} sx={{ my: 2, display: { md: "none" } }}>
          {/* <SwipeableViews enableMouseEvents onTouchStart={isolateTouch}>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="11" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="12" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="13" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="14" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="15" />
            </Grid>
            <Grid xl={3} lg={4} md={6} xs={12} sx={{ px: 3 }}>
              <TalentCard index="16" />
            </Grid>
          </SwipeableViews> */}
        </Grid>
      </Grid>
      <Box>
        <ButtonPanel
          panelData={TALENT_RIGHT_JOB_TYPES_BUTTON_GROUP}
          side="right"
        />
        <ButtonPanel
          panelData={TALENT_RIGHT_JOB_ACTIVITY_BUTTON_GROUP}
          side="right"
        />
      </Box>
    </Grid>
  );
}
