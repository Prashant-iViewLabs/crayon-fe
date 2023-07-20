// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { styled, alpha } from "@mui/material/styles";
// import Divider from "@mui/material/Divider";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import locale from "../../../i18n/locale";
// import { CV_STEPS } from "../../../utils/Constants";
// import IconButton from "@mui/material/IconButton";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { InputLabel } from "@mui/material";
// import dayjs from "dayjs";
// import Switch from "@mui/material/Switch";
// import {
//   getSchool,
//   getInstitute,
//   getQualification,
//   getTypeQualificationValue,
//   getAssociation
// } from "../../../redux/candidate/myCvSlice";
// import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
// import { setAlert, setLoading } from "../../../redux/configSlice";
// import AutoComplete from "../../common/AutoComplete";

// const BlueSwitch = styled(Switch)(({ theme }) => ({
//   "& .MuiSwitch-switchBase.Mui-checked": {
//     color: theme.palette.blueButton400.main,
//     "&:hover": {
//       backgroundColor: alpha(
//         theme.palette.blueButton400.main,
//         theme.palette.action.hoverOpacity
//       ),
//     },
//   },
//   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//     backgroundColor: theme.palette.blueButton400.main,
//   },
//   "& .MuiSwitch-track": {
//     // marginTop: '-9px'
//   },
// }));

// const STUDY = {
//   institution_id: '',
//   year_ended:"",
//   completed:"",
//   qualification_id: '',
//   qualificationtype_id:"",
//   school_id: "",
//   school_completed:"",
//   school_year_end:"",
//   association_id:"",
//   association_completed:"",
//   association_year_end: "",
// };
// const StyledButton = styled(Button)(({ theme }) => ({
//   marginRight: "24px",
//   fontSize: "14px",
//   width: "auto",
//   border: `2px solid ${theme.palette.redButton100.main}`,
//   "& .MuiSvgIcon-root": {
//     fontSize: "16px",
//   },
// }));
// let minOffset = 0, maxOffset = 63;
// let thisYear = (new Date()).getFullYear();
// let allYears = [];
// for(let x = 0; x <= maxOffset; x++) {
//     allYears.push(thisYear - x)
// }

// const yearOptions = allYears.map((x) => {return(<option key={x}>{x}</option>)});

// export default function StudyLife({ onSubmit, study }) {
//   const i18n = locale.en;
//   const dispatch = useDispatch();
//   // const [studyData, setStudyData] = useState(JSON.parse(getLocalStorage('studyData')) || [STUDY])
//   const [studyData, setStudyData] = useState([STUDY]);

//   const { school, institution, qualification , association , typeOfQualification} = useSelector(
//     (state) => state.myCv
//   );

//   const getAllData = async () => {
//     try {
//       dispatch(setLoading(true));
//       await Promise.all([
//         dispatch(getSchool()),
//         dispatch(getInstitute()),
//         dispatch(getQualification()),
//         dispatch(getTypeQualificationValue()),
//         dispatch(getAssociation())
//       ]);
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
//     getAllData();
//     console.log(study)
//     console.log(studyData)
//   }, []);

//   useEffect(() => {
//     if (study.length > 0) {
//       setStudyData(study);
//     }
//   }, [study]);

//   const addStudy = () => {
//     onSubmit("study", [...studyData, STUDY]);
//     setStudyData((prevState) => [...prevState, STUDY]);
//   };
//   const removeStudy = (event, index) => {
//     if (studyData.length > 1) {
//       const newStudyData = studyData.filter((data, i) => i + 1 != index);
//       setStudyData(newStudyData);
//       onSubmit("study", newStudyData);
//     }
//   };
//      const func = ()=>{
//       // institution.map((val)=>console.log(val))
//       console.log(studyData[0].institution_id)
//       console.log(studyData)
//       // institution.find((sk) => sk.id == studyData.institution_id ? console.log(sk.name): console.log("scam............."))

//      }
//      useEffect(()=>{
//     func()
//      },[])
//   // const handleChange = (event, newValue, id, index=0) => {
//   //   console.log(event,id,newValue)
//   //   const newStudyData = JSON.parse(JSON.stringify(studyData));
//   //   if (typeof newValue === "string") {
//   //     newStudyData[index][id] = newValue;
//   //   }
//   //   else if(id === 'institution_id') {
//   //     let id_institution = newValue.map((val)=>val.id)
//   //     let singleId =  id_institution[0]
//   //     console.log(id,singleId)
//   //       newStudyData[index][id] = singleId;
//   //     }
//   //   else if(id === 'qualification_id') {
//   //     let id_institution = newValue.map((val)=>val.qualification_type_id)
//   //     let singleId =  id_institution[0]
//   //       newStudyData[index][id] = singleId;
//   //     }else if(id === 'qualificationtype_id') {
//   //       let id_institution = newValue.map((val)=>val.qualification_type_id)
//   //       let singleId =  id_institution[0]
//   //         newStudyData[index][id] = singleId;
//   //       }
//   //  else if (newValue && newValue.inputValue) {
//   //     // Create a new value from the user input
//   //     newStudyData[index][id] = newValue.inputValue;
//   //   }
//   //   else{
//   //     newStudyData[index][id] = newValue?.id;
//   //   }
//   //   setStudyData(newStudyData);
//   //   console.log(studyData)
//   //   onSubmit("study", newStudyData);
//   // };

//   // const handleCompleted =(event,id,newValue)=>{
//   //   // const newStudyData = JSON.parse(JSON.stringify(studyData));
//   //   // newStudyData[index]["completed"] = event.target.checked
//   //   console.log(event,id,newValue)
//   // }

//   const handleChange = (event ,newValue, id ,index ) => {
//     const newStudyData = JSON.parse(JSON.stringify(studyData));
//   console.log(event ,newValue, id ,index)
//    if(event.target.name == "school_year_end"){
//     const id = event.target.name
//     newStudyData[0][id] = event.target.value.key
//   }else if(id == "school_id"){
//     let id_institution = newValue?.map((val)=>val.id)
//         let singleId =  id_institution[0]
//     newStudyData[0][id] = singleId;
//   }else if(event.target.name == "association_year_end"){
//     const id = event.target.name
//     newStudyData[0][id] = event.target.value.key
//   }else if(id == 'association_id'){
//     let id_institution = newValue?.map((val)=>val.association_id)
//         let singleId =  id_institution[0]
//     newStudyData[0]['association_id'] = singleId;
//   }else if(id == 'qualification_id'){
//     let id_institution = newValue?.map((val)=>val.id)
//     let singleId =  id_institution[0]
// newStudyData[index][id] = singleId;
//   }
//   else if(id){
//     let id_institution = newValue?.map((val)=>val.id)
//       console.log(id_institution)
//           let singleId =  id_institution[0]
//           console.log(singleId)
//       newStudyData[index][id] = singleId;
//   }

//     setStudyData(newStudyData);
//     console.log(studyData);
//     onSubmit("study", newStudyData);
//     // if(index > 0){
//     //   newStudyData[index]['school_year_end'] = studyData[0]?.school_year_end
//     //   setStudyData(newStudyData);
//     //   onSubmit("study", newStudyData);
//     // }
//   };

//   const handleSelectChange = (event,index) => {
//         console.log(event,index)
//         const newStudyData = JSON.parse(JSON.stringify(studyData));
//         newStudyData[index]["year_ended"] = event.target.value.key
//         setStudyData(newStudyData);
//         onSubmit("study", newStudyData);
//   };
//  const handleSelectChange2 = (event,id, name,index)=>{
//   console.log(event,id,name,index)
//   const newStudyData = JSON.parse(JSON.stringify(studyData));
//   newStudyData[index]["completed"] = id
//   setStudyData(newStudyData);
//   onSubmit("study", newStudyData);
//  }
//  const handleSelectChange3 = (event,id, name)=>{
//   console.log(event,id,name)
//   const newStudyData = JSON.parse(JSON.stringify(studyData));
//   newStudyData[0]["school_completed"] = id
//   setStudyData(newStudyData);
//   onSubmit("study", newStudyData);
//  }
//  const handleSelectChange4 = (event,id, name)=>{
//   console.log(event,id,name)
//   const newStudyData = JSON.parse(JSON.stringify(studyData));
//   newStudyData[0]["association_completed"] = id
//   setStudyData(newStudyData);
//   onSubmit("study", newStudyData);
//  }

//   // const handleNoStudy = (event) => {
//   //   console.log(event)
//   //   const isChecked = event.target.checked;

//   //   const newStudyExp = STUDY;
//   //   newStudyExp.completed = isChecked;
//   //   setStudyData([newStudyExp]);
//   //   onSubmit("study", [newStudyExp]);
//   // };

//   const getInstitutionValue = ()=>{
//     if (studyData.institution_id?.length == 0) {
//       return [];
//     }
//     return studyData.institution_id?.map(
//       (institution) => institution?.find((sk) => sk.id == institution) || ""
//     );
//    }

//    const getQualificationValue = ()=>{
//     if (studyData.qualification_id?.length == 0) {
//       return [];
//     }
//     return studyData.qualification_id?.map(
//       (qualification) => qualification?.find((sk) => sk.id == qualification) || qualification
//     );
//    }
//    const getTypeQualificationVal = ()=>{
//     if (studyData.qualificationtype_id?.length == 0) {
//       return [];
//     }
//     return studyData.qualificationtype_id?.map(
//       (qualification) => qualification?.find((sk) => sk.id == qualification) || typeOfQualification
//     );
//    }

//    const getSchoolValue = ()=>{
//     if (studyData.school_id?.length == 0) {
//       return [];
//     }
//     return studyData.school_id?.map(
//       (school) => school?.find((sk) => sk.id == school) || school
//     );
//    }

//    const getAssociationValue = ()=>{
//     if (studyData.association_id?.length == 0) {
//       return [];
//     }
//     return studyData.association_id?.map(
//       (association) => association?.find((sk) => sk.id == association) || association
//     );
//    }

//   return (
//     <Box>
//       <Box sx={{ display: "flex", alignItems: "baseline" }}>
//         <Typography
//           sx={{
//             fontSize: "20px",
//             fontWeight: 700,
//             ml: 1,
//             mb: 2,
//           }}
//         >
//           {CV_STEPS[2]}
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <BlueSwitch
//             // onChange={handleNoStudy}
//             // checked={studyData[0].no_study_exp}
//           />
//           <Typography
//             sx={{
//               fontSize: "12px",
//               fontWeight: 400,
//             }}
//           >
//             {i18n["myCV.noStudyExp"]}
//           </Typography>
//         </Box>
//       </Box>
//       {studyData.length > 0 &&
//         studyData.map((work,index) => (
//           <Box key={index}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 mb: 3,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 {index != 0 && (
//                   <IconButton
//                     aria-label="edit"
//                     color="redButton"
//                     sx={{
//                       padding: "0 !important",
//                       marginRight: "4px",
//                     }}
//                     onClick={(event) => removeStudy(event, index + 1)}
//                   >
//                     <RemoveCircleIcon />
//                   </IconButton>
//                 )}
//                 <Typography
//                   sx={{
//                     fontSize: "14px",
//                     fontWeight: 800,
//                     flex: 1,
//                   }}
//                 >
//                   {index === 0
//                     ? i18n["myCV.latestEducation"]
//                     : i18n["myCV.previousEducation"]}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontSize: "12px",
//                     fontWeight: 400,
//                     pl: 1,
//                     pr: 1,
//                   }}
//                 >
//                   {index === 0 ? i18n["myCV.mostRecent"] : ""}
//                 </Typography>
//               </Box>

//               <Divider
//                 component="hr"
//                 sx={{
//                   borderBottomWidth: 2,
//                   flex: "auto",
//                   m: 0,
//                   mr: 3.5,
//                 }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 3,
//               }}
//             >
//               <Box sx={{ width: "43%" }}>
//                 <InputLabel
//                   htmlFor="institution_id"
//                   sx={{
//                     color: "black",
//                     paddingLeft: "10px",
//                     paddingBottom: "2px",
//                     fontSize: "14px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {i18n["myCV.institutionLabel"]}
//                 </InputLabel>

//                 <AutoComplete
//           multiple={true}
//           id="institution_id"
//           value={getInstitutionValue()}
//           // value={institution?.find((sk) => sk.id == studyData.institution_id)[index]?.name || ""}
//           onChange={(event,newValue,id) => handleChange(event ,newValue,id, index)}
//           sx={{ width: "100%" }}
//           placeholder={i18n["myCV.institutionPlaceholder"]}
//           data={institution}
//         ></AutoComplete>
//               </Box>
//               <Box sx={{ width: "27%" }}>
//                 <InputLabel
//                   htmlFor="year_ended"
//                   sx={{
//                     color: "black",
//                     paddingLeft: "10px",
//                     paddingBottom: "2px",
//                     fontSize: "14px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {i18n["myCV.yearOfCompletionLabel"]}
//                 </InputLabel>
//                 <Select
//                   id="year_ended"
//                   name="year_ended"
//                   value={study.year_ended}
//                   // label="Select"
//                   onChange={(event)=>handleSelectChange(event,index)}
//                   // onChange={(event) => handleChange(event, index)}
//                   sx={{
//                     width: "100%",
//                     borderRadius: "25px",
//                     height: "40px",
//                     boxShadow:
//                       "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
//                   }}
//                 >
//                 <MenuItem value="" disabled>
//     Placeholder
//   </MenuItem>
//                   {yearOptions.map((val) => (
//                     <MenuItem key={val} value={val}>
//                       {val}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Box>
//               <Box
//                 sx={{ width: "20%", display: "flex", alignItems: "baseline" }}
//               >
//                 <InputLabel
//                   htmlFor="completed"
//                   sx={{
//                     color: "black",
//                     paddingLeft: "10px",
//                     paddingBottom: "2px",
//                     fontSize: "14px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {i18n["myCV.stillCompletingLabel"]}
//                 </InputLabel>
//                 <BlueSwitch
//                 id="completed"
//                 name="completed"
//                  onChange={(event,id,name) => handleSelectChange2(event,id,name ,index)}
//                 />
//               </Box>
//             </Box>

//             <InputLabel
//               htmlFor="qualification_id"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.qualificationLabel"]}
//             </InputLabel>
//             <AutoComplete
//           multiple={true}
//           id="qualification_id"
//           value={getQualificationValue()}
//           onChange={(event,newValue,id) => handleChange(event ,newValue,id, index)}
//           sx={{ mb: 3, width: "97%" }}
//           placeholder={i18n["myCV.qualificationPlaceholder"]}
//           data={qualification}
//         ></AutoComplete>
//             <InputLabel
//               htmlFor="qualificationtype_id"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.typeOfQualificationLabel"]}
//             </InputLabel>
//             <AutoComplete
//           multiple={true}
//           id="qualificationtype_id"
//           value={getTypeQualificationVal()}
//           onChange={(event,newValue,id) => handleChange(event,newValue,id, index )}
//           sx={{ mb: 3, width: "97%" }}
//           placeholder={i18n["myCV.typeOfqualificationPlaceholder"]}
//           data={typeOfQualification}
//         ></AutoComplete>
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//             >
//                         </Box>
//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

//             </Box>
//           </Box>
//         ))}
//       <StyledButton variant="outlined" color="redButton100" onClick={addStudy}>
//         {i18n["myCV.previousStudyBottonText"]}
//       </StyledButton>

//       <Box sx={{pt:6}}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 800,
//                 flex: 1,
//               }}
//             >
//             {i18n["myCV.highSchoolLabel"]}
//             </Typography>
//           </Box>

//           <Divider
//             component="hr"
//             sx={{
//               borderBottomWidth: 2,
//               flex: "auto",
//               m: 0,
//               mr: 3.5,
//             }}
//           />
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ width: "43%" }}>
//             <InputLabel
//               htmlFor="school_id"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.schoolName"]}
//             </InputLabel>

//             <AutoComplete
//           multiple={true}
//           id="school_id"
//           value={getSchoolValue()}
//           onChange={(event,newValue,id) => handleChange(event,newValue,id)}
//           sx={{ width: "100%" }}
//           placeholder={i18n["myCV.schoolPlaceholder"]}
//           data={school}
//         ></AutoComplete>
//           </Box>
//           <Box sx={{ width: "27%" }}>
//             <InputLabel
//               htmlFor="school_year_end"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.yearOfCompletionLabel"]}
//             </InputLabel>
//             <Select
//               id="school_year_end"
//               name="school_year_end"
//               value={study.school_year_ended}
//               onChange={(event) => handleChange(event)}
//               sx={{
//                 width: "100%",
//                 borderRadius: "25px",
//                 height: "40px",
//                 boxShadow:
//                   "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
//               }}
//             >
//               {yearOptions.map((val) => (
//                 <MenuItem key={val} value={val}>
//                   {val}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Box>
//           <Box sx={{ width: "20%", display: "flex", alignItems: "baseline" }}>
//             <InputLabel
//               htmlFor="school_completing"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.stillCompletingLabel"]}
//             </InputLabel>
//             <BlueSwitch
//             id="school_completed"
//             name="school_completed"
//            onChange={(event,id,name) => handleSelectChange3(event,id,name)}
//             // checked={studyData[0].no_study_exp}
//             />
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 800,
//                 flex: 1,
//               }}
//             >
//               {i18n["myCV.professionalAssociationLabel"]}
//             </Typography>
//           </Box>

//           <Divider
//             component="hr"
//             sx={{
//               borderBottomWidth: 2,
//               flex: "auto",
//               m: 0,
//               mr: 3.5,
//             }}
//           />
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ width: "43%" }}>
//             <InputLabel
//               htmlFor="association_id"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.associationLabel"]}
//             </InputLabel>

//             <AutoComplete
//           multiple={true}
//           id="association_id"
//           value={getAssociationValue()}
//           onChange={(event,newValue,id) => handleChange(event,newValue,id)}
//           sx={{ width: "100%" }}
//           placeholder={i18n["myCV.associationPlaceholder"]}
//           data={association}
//         ></AutoComplete>
//           </Box>
//           <Box sx={{ width: "27%" }}>
//             <InputLabel
//               htmlFor="association_year_ended"
//               sx={{
//                 color: "black",
//                 paddingLeft: "10px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.yearOfCompletionLabel"]}
//             </InputLabel>
//             <Select
//               id="association_year_end"
//               name="association_year_end"
//               // value={study[0].association_year_end}
//               onChange={(event) => handleChange(event)}
//               sx={{
//                 width: "100%",
//                 borderRadius: "25px",
//                 height: "40px",
//                 boxShadow:
//                   "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
//               }}
//             >
//               {yearOptions.map((val) => (
//                 <MenuItem key={val} value={val}>
//                   {val}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Box>
//           <Box sx={{ width: "20%", display: "flex", alignItems: "baseline" }}>
//             <InputLabel
//               htmlFor="association_completed"
//               sx={{
//                 color: "black",
//                 paddingLeft: "50px",
//                 paddingBottom: "2px",
//                 fontSize: "14px",
//                 fontWeight: 500,
//               }}
//             >
//               {i18n["myCV.inProgressSwitchLabel"]}
//             </InputLabel>
//             <BlueSwitch
//             id="association_completed"
//             name="association_completed"
//            onChange={(event,id,name) => handleSelectChange4(event,id,name)}
//             // checked={studyData[0].no_study_exp}
//             />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import locale from "../../../i18n/locale";
import { CV_STEPS } from "../../../utils/Constants";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { InputLabel } from "@mui/material";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import {
  getSchool,
  getInstitute,
  getQualification,
  getTypeQualificationValue,
  getAssociation,
} from "../../../redux/candidate/myCvSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import { setAlert, setLoading } from "../../../redux/configSlice";
import AutoComplete from "../../common/AutoComplete";
import SelectMenu from "../../common/SelectMenu";

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

const QUALIFICATION = {
  qualification_id: "",
  institution_id: "",
  year_ended: "",
  completed: "true",
  qualificationtype_id: "",
};
const STUDY = {
  qualification: [QUALIFICATION],
  otherdata: {
    school_id: "",
    school_completed: "true",
    school_year_end: "",
    association_id: "",
    association_completed: "true",
    association_year_end: "",
  },
};
const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: "24px",
  fontSize: "14px",
  width: "auto",
  border: `2px solid ${theme.palette.redButton100.main}`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
}));
let minOffset = 0,
  maxOffset = 63;
let thisYear = new Date().getFullYear();
let allYears = [];
for (let x = 0; x <= maxOffset; x++) {
  allYears.push(thisYear - x);
}

const yearOptions = allYears.map((x) => {
  return <option key={x}>{x}</option>;
});

export default function StudyLife({ onSubmit, study, errors }) {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const [studyData, setStudyData] = useState(STUDY);

  // const [studies,setStudies] = useState(study);

  // useEffect(() => {
  //   if (study.length) {
  //     study.map((val)=>{
  //       const newQualifications = Array(study.length).fill(QUALIFICATION);
  //       setStudyData((prevStudyData) => ({
  //         ...prevStudyData,
  //         qualification: newQualifications,
  //       }));
  //     })

  //   }
  // }, [study]);
  useEffect(() => {
    setStudyData(study);
  }, [study]);

  const {
    school,
    institution,
    qualification,
    association,
    typeOfQualification,
  } = useSelector((state) => state.myCv);

  const getAllData = async () => {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        dispatch(getSchool()),
        dispatch(getInstitute()),
        dispatch(getQualification()),
        dispatch(getTypeQualificationValue()),
        dispatch(getAssociation()),
      ]);
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
    getAllData();
  }, []);

  // useEffect(() => {
  //   if (study.length > 0) {
  //     setStudyData(study);
  //   }
  // }, [study]);

  // const addStudy = () => {
  //   onSubmit("study", [...studies, STUDY]);
  //   setStudies((prevState) => [...prevState, STUDY]);
  // };
  //   const addStudy = () => {
  //   onSubmit("study", [...studyData, STUDY]);
  //   setStudyData((prevState) => [...prevState, STUDY]);
  // };

  const addStudy = () => {
    const newStudyData = {
      ...studyData,
      qualification: [...studyData.qualification, QUALIFICATION],
    };

    setStudyData(newStudyData);
    onSubmit("study", newStudyData);
    // setQualificationS([...qualificationS, QUALIFICATION])
    //  onSubmit("study", qualificationS);
  };
  const removeStudy = (event, index) => {
    if (studyData.qualification.length > 1) {
      const newStudy = studyData.qualification.filter(
        (data, i) => i + 1 != index
      );
      const newStudyData = { ...studyData, qualification: newStudy };
      setStudyData(newStudyData);
      onSubmit("study", newStudyData);
    }
  };

  const handleChange = (event, newValue, id, index) => {
    const newStudyData = JSON.parse(JSON.stringify(studyData));
    if (event.target.name == "school_year_end") {
      const id = event.target.name;
      console.log("SCHOOL", event.target.value);
      newStudyData.otherdata.school_year_end = event.target.value;
    } else if (id == "school_id") {
      let id_institution = newValue?.school_id;
      newStudyData.otherdata.school_id = id_institution;
    } else if (event.target.name == "association_year_end") {
      const id = event.target.name;
      console.log("ASSOCIATIOn", event.target.value);
      newStudyData.otherdata.association_year_end = event.target.value;
    } else if (id == "association_id") {
      let id_institution = newValue?.association_id;
      newStudyData.otherdata.association_id = id_institution;
    } else if (id == "institution_id") {
      let id_institution = newValue?.institution_id || null;
      newStudyData.qualification[index].institution_id = id_institution;
    } else if (id == "qualification_id") {
      let id_institution = newValue?.qualification_id;
      newStudyData.qualification[index].qualification_id = id_institution;
    } else if (id == "qualificationtype_id") {
      let id_institution = newValue?.id;
      newStudyData.qualification[index].qualificationtype_id = id_institution;
    }
    console.log("NEW STUDY DATA", newStudyData);
    setStudyData(newStudyData);
    onSubmit("study", newStudyData);
  };

  const handleSelectChange = (event, index) => {
    // console.log(event.target.value);
    const newStudyData = JSON.parse(JSON.stringify(studyData));
    newStudyData.qualification[index].year_ended = event.target.value;
    // console.log("YEAR CHANGE", newStudyData);
    setStudyData(newStudyData);
    onSubmit("study", newStudyData);
  };
  const handleSelectChange2 = (event, id, name, index) => {
    // const newStudyData = JSON.parse(JSON.stringify(studyData));
    // newStudyData.qualification[index]["completed"] = id;
    // setStudyData(newStudyData);
    // onSubmit("study", newStudyData)
    const newStudyData = JSON.parse(JSON.stringify(studyData));
    if (newStudyData.qualification[index]) {
      newStudyData.qualification[index]["completed"] = id ? "false" : "true";
      setStudyData(newStudyData);
      onSubmit("study", newStudyData);
    }
  };
  const handleSelectChange3 = (event, id, name) => {
    const newStudyData = JSON.parse(JSON.stringify(studyData));
    newStudyData.otherdata["school_completed"] = id ? "false" : "true";
    setStudyData(newStudyData);
    onSubmit("study", newStudyData);
  };
  const handleSelectChange4 = (event, id, name) => {
    // console.log(id);
    const newStudyData = JSON.parse(JSON.stringify(studyData));
    newStudyData.otherdata["association_completed"] = id ? "false" : "true";
    setStudyData(newStudyData);
    onSubmit("study", newStudyData);
  };

  const getInstitutionValue = (idx) => {
    const temp2 = institution.find(
      (val) => val.id === study?.qualification[idx]?.institution_id
    );

    return temp2?.name || "";
  };

  const getYearEndedValue = (idx) => {
    console.log("YEAR", study?.qualification[idx]?.year_ended);
    const year = study?.qualification[idx]?.year_ended?.substring(
      0,
      study?.qualification[idx]?.year_ended?.indexOf("-")
    );
    return year;
  };

  const getQualificationValue = (idx) => {
    const temp2 = qualification.find(
      (val) => val.id === study?.qualification[idx]?.qualification_id
    );

    return temp2?.name || "";
  };

  const getTypeQualificationVal = (idx) => {
    const temp2 = typeOfQualification.find(
      (val) => val.id === study?.qualification[idx]?.qualificationtype_id
    );
    return temp2?.name || "";
  };

  const getSchoolValue = () => {
    const temp2 = school.find((val) => val.id === study?.otherdata?.school_id);
    return temp2?.name || "";
  };

  const getAssociationValue = () => {
    const temp2 = association.find(
      (val) => val?.association_id === study?.otherdata?.association_id
    );
    return temp2?.name || "";
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            ml: 1,
            mb: 2,
          }}
        >
          {CV_STEPS[2]}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BlueSwitch
          // onChange={handleNoStudy}
          // checked={studyData[0].no_study_exp}
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            {i18n["myCV.noStudyExp"]}
          </Typography>
        </Box>
      </Box>
      {studyData.qualification &&
        studyData.qualification.map((work, index) => (
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
                    onClick={(event) => removeStudy(event, index + 1)}
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
                    ? i18n["myCV.latestEducation"]
                    : i18n["myCV.previousEducation"]}
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
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ width: "43%" }}>
                <InputLabel
                  htmlFor="institution_id"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.institutionLabel"]}
                </InputLabel>

                <AutoComplete
                  // multiple={true}
                  id="institution_id"
                  value={getInstitutionValue(index)}
                  defaultValue={getInstitutionValue(index)}
                  // value={institution?.find((sk) => sk.id == studyData.institution_id)[index]?.name || ""}
                  onChange={(event, newValue, id) =>
                    handleChange(event, newValue, id, index)
                  }
                  sx={{ width: "100%" }}
                  placeholder={i18n["myCV.institutionPlaceholder"]}
                  data={institution}
                ></AutoComplete>
                {errors?.find((error) => error.key == "institution_id") && (
                  <Typography color={"red !important"}>
                    {`*${
                      errors?.find((error) => error.key == "institution_id")
                        .message
                    }`}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "27%" }}>
                <InputLabel
                  htmlFor="year_ended"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.yearOfCompletionLabel"]}
                </InputLabel>
                {console.log(
                  "STUDY QUALIFICATION",
                  study.qualification[index].year_ended
                )}
                <Select
                  id="year_ended"
                  name="year_ended"
                  defaultValue={getYearEndedValue(index)}
                  // value={getYearEndedValue(index)}
                  onChange={(event) => handleSelectChange(event, index)}
                  sx={{
                    width: "100%",
                    borderRadius: "25px",
                    height: "40px",
                    boxShadow:
                      "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {yearOptions.map((val) => (
                    <MenuItem key={val} value={val?.key}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.find((error) => error.key == "year_ended") && (
                  <Typography color={"red !important"}>
                    {`*${
                      errors?.find((error) => error.key == "year_ended").message
                    }`}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{ width: "20%", display: "flex", alignItems: "baseline" }}
              >
                <InputLabel
                  htmlFor="completed"
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "2px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {i18n["myCV.stillCompletingLabel"]}
                </InputLabel>
                <BlueSwitch
                  id="completed"
                  name="completed"
                  defaultChecked={work?.completed == "false" ? true : false}
                  onChange={(event, id, name) =>
                    handleSelectChange2(event, id, name, index)
                  }
                />
                {errors?.find((error) => error.key == "completed") && (
                  <Typography color={"red !important"}>
                    {`*${
                      errors?.find((error) => error.key == "completed").message
                    }`}
                  </Typography>
                )}
              </Box>
            </Box>

            <InputLabel
              htmlFor="qualification_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.qualificationLabel"]}
            </InputLabel>
            <AutoComplete
              // multiple={true}
              id="qualification_id"
              defaultValue={getQualificationValue(index)}
              value={getQualificationValue(index)}
              onChange={(event, newValue, id) =>
                handleChange(event, newValue, id, index)
              }
              sx={{ mb: 3, width: "97%" }}
              placeholder={i18n["myCV.qualificationPlaceholder"]}
              data={qualification}
            ></AutoComplete>
            {errors?.find((error) => error.key == "qualification_id") && (
              <Typography color={"red !important"} sx={{ mb: 3 }}>
                {`*${
                  errors?.find((error) => error.key == "qualification_id")
                    .message
                }`}
              </Typography>
            )}
            <InputLabel
              htmlFor="qualificationtype_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.typeOfQualificationLabel"]}
            </InputLabel>
            <AutoComplete
              // multiple={true}
              id="qualificationtype_id"
              defaultValue={getTypeQualificationVal(index)}
              value={getTypeQualificationVal(index)}
              onChange={(event, newValue, id) =>
                handleChange(event, newValue, id, index)
              }
              sx={{ mb: 0, width: "97%" }}
              placeholder={i18n["myCV.typeOfqualificationPlaceholder"]}
              data={typeOfQualification}
            ></AutoComplete>
            {errors?.find((error) => error.key == "qualificationtype_id") && (
              <Typography color={"red !important"} sx={{ mb: 3 }}>
                {`*${
                  errors?.find((error) => error.key == "qualificationtype_id")
                    .message
                }`}
              </Typography>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            ></Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
          </Box>
        ))}
      <StyledButton variant="outlined" color="redButton100" onClick={addStudy}>
        {i18n["myCV.previousStudyBottonText"]}
      </StyledButton>

      <Box sx={{ pt: 6 }}>
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
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 800,
                flex: 1,
              }}
            >
              {i18n["myCV.highSchoolLabel"]}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "43%" }}>
            <InputLabel
              htmlFor="school_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.schoolName"]}
            </InputLabel>
            <AutoComplete
              // multiple={true}
              id="school_id"
              defaultValue={getSchoolValue()}
              value={getSchoolValue()}
              onChange={(event, newValue, id) =>
                handleChange(event, newValue, id)
              }
              sx={{ width: "100%" }}
              placeholder={i18n["myCV.schoolPlaceholder"]}
              data={school}
            ></AutoComplete>
            {errors?.find((error) => error.key == "school_id") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "school_id").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "27%" }}>
            <InputLabel
              htmlFor="school_year_end"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.yearOfCompletionLabel"]}
            </InputLabel>
            <Select
              id="school_year_end"
              name="school_year_end"
              defaultValue={study?.otherdata?.school_year_end}
              onChange={(event) => handleChange(event)}
              sx={{
                width: "100%",
                borderRadius: "25px",
                height: "40px",
                boxShadow:
                  "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
              }}
            >
              {yearOptions.map((val) => (
                <MenuItem key={val} value={val?.key}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            {errors?.find((error) => error.key == "school_year_end") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "school_year_end")
                    .message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "20%", display: "flex", alignItems: "baseline" }}>
            <InputLabel
              htmlFor="school_completing"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.stillCompletingLabel"]}
            </InputLabel>
            <BlueSwitch
              id="school_completed"
              name="school_completed"
              defaultChecked={
                study?.otherdata?.school_completed == "false" ? true : false
              }
              onChange={(event, id, name) =>
                handleSelectChange3(event, id, name)
              }
              // checked={studyData[0].no_study_exp}
            />
            {errors?.find((error) => error.key == "school_completed") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "school_completed")
                    .message
                }`}
              </Typography>
            )}
          </Box>
        </Box>

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
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 800,
                flex: 1,
              }}
            >
              {i18n["myCV.professionalAssociationLabel"]}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "43%" }}>
            <InputLabel
              htmlFor="association_id"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.associationLabel"]}
            </InputLabel>

            <AutoComplete
              // multiple={true}
              id="association_id"
              defaultValue={getAssociationValue()}
              value={getAssociationValue()}
              onChange={(event, newValue, id) =>
                handleChange(event, newValue, id)
              }
              sx={{ width: "100%" }}
              placeholder={i18n["myCV.associationPlaceholder"]}
              data={association}
            ></AutoComplete>
            {errors?.find((error) => error.key == "association_id") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "association_id").message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "27%" }}>
            <InputLabel
              htmlFor="association_year_ended"
              sx={{
                color: "black",
                paddingLeft: "10px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.yearOfCompletionLabel"]}
            </InputLabel>
            <Select
              id="association_year_end"
              name="association_year_end"
              onChange={(event) => handleChange(event)}
              defaultValue={study?.otherdata?.association_year_end}
              value={study?.otherdata?.association_year_end}
              sx={{
                width: "100%",
                borderRadius: "25px",
                height: "40px",
                boxShadow:
                  "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)",
              }}
            >
              {yearOptions.map((val) => (
                <MenuItem key={val} value={val?.key}>
                  {val}
                </MenuItem>
              ))}
            </Select>
            {errors?.find((error) => error.key == "association_year_end") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "association_year_end")
                    .message
                }`}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "20%", display: "flex", alignItems: "baseline" }}>
            <InputLabel
              htmlFor="association_completed"
              sx={{
                color: "black",
                paddingLeft: "50px",
                paddingBottom: "2px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {i18n["myCV.inProgressSwitchLabel"]}
            </InputLabel>

            <BlueSwitch
              id="association_completed"
              name="association_completed"
              defaultChecked={
                study?.otherdata?.association_completed == "false"
                  ? true
                  : false
              }
              checked={
                study?.otherdata?.association_completed == "false"
                  ? true
                  : false
              }
              onChange={(event, id, name) =>
                handleSelectChange4(event, id, name)
              }
              // checked={studyData[0].no_study_exp}
            />
            {errors?.find((error) => error.key == "association_completed") && (
              <Typography color={"red !important"}>
                {`*${
                  errors?.find((error) => error.key == "association_completed")
                    .message
                }`}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
