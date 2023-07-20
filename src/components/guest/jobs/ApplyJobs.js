import React, { useState } from "react";
import { postAnswers } from "../../../redux/guest/getQuestions";
import { useDispatch } from "react-redux";
import { ALERT_TYPE } from "../../../utils/Constants";
import { Box, Button, Paper, Typography } from "@mui/material";
import InputBox from "../../common/InputBox";
import locale from "../../../i18n/locale";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../../redux/configSlice";

export default function ApplyJobs({ questions }) {
  const i18n = locale.en;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [answers, setAnswers] = useState([]);
  const handleApply = async () => {
    try {
      const { payload } = await dispatch(
        postAnswers({ data: answers, job_id: questions?.at(0).job_id })
      );
      if (payload?.status == "sccess") {
        history("/candidate/my-jobs");
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.SUCCESS,
            msg: "Applied Successfully",
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
      // console.error("Error occurred:", error);
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "",
        })
      );
    }
  };
  const handleChange = (event, id) => {
    if (answers.find((item) => item.question_id === id)) {
      setAnswers(
        answers.map((item) =>
          item.question_id == id
            ? { ...item, answer: event.target.value }
            : item
        )
      );
    } else {
      setAnswers([...answers, { question_id: id, answer: event.target.value }]);
    }
  };

  return (
    <Box>
      <Paper
        component="form"
        sx={{
          p: 2,
          width: { xs: "90%", sm: "70%", md: "60%" },
          margin: "auto",
        }}
        className="login-box"
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          A quick Q&A session
        </Typography>
        <Box sx={{ mt: 3 }}>
          {questions.map((question, index) => {
            return (
              <>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  Q.{index + 1} &nbsp;
                  {question.question}
                </Typography>
                <InputBox
                  id="answer"
                  type="text"
                  onChange={(event) =>
                    handleChange(event, question.question_id)
                  }
                  placeholder={"Answer"}
                  sx={{ mb: 2, height: "30px !important" }}
                />
              </>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
          <Button
            sx={{
              boxShadow: 0,
              fontSize: "12px",
              width: "100%",
              height: "43px",
            }}
            variant="contained"
            color="redButton100"
            onClick={handleApply}
          >
            {i18n["jobCard.apply"]}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
