import { useState } from "react";
import { createAnswer, getQuestionById, updateAnswer } from "../api";
import useUser from "./useUser";

const useQuestionThread = () => {
  const [answers, setAnswers] = useState([]);
  const { setUser } = useUser();

  const fetchQuestionById = async (questionId) => {
    if (!questionId) return;

    const question = await getQuestionById(questionId);
    const { content, answers, from, id } = question;
    setAnswers([{ content, from, id }, ...answers]);
  };

  const addAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const answerOnQuestion = async ({ questionId, answer, fromUserId }) => {
    const answerCreated = await createAnswer({
      questionId,
      answer,
      fromUserId,
    });

    setUser((prevUser) => ({
      ...prevUser,
      answers: [...prevUser.answers, answerCreated],
    }));

    addAnswer(answerCreated);
  };

  const voteOnAnswer = async ({ id, partialUpdateObject }) => {
    const updateResult = await updateAnswer(id, partialUpdateObject);
    const updatedAnswers = answers.map((answer) => {
      if (answer.id === id) return updateResult;
      else return answer;
    });
    setAnswers(updatedAnswers);
  };

  return {
    fetchQuestionById,
    addAnswer,
    answerOnQuestion,
    voteOnAnswer,
    answers,
  };
};

export default useQuestionThread;
