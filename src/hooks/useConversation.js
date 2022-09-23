import { useEffect, useState } from "react";
import { getRoomByid } from "../api";
import { createQuestion } from "../api";
import { botPhrases } from "../constants/botCatchPharses";

const useConversation = () => {
  const [questions, setQuestions] = useState([]);

  const fetchRoomById = async (id) => {
    const room = await getRoomByid(id);
    setQuestions(room.messages);
  };

  const addNewQuestion = async ({ content, fromUserId, roomId }) => {
    const question = await createQuestion({ content, fromUserId, roomId });
    addQuestion(question);
  };

  const addQuestion = async (question) => {
    setQuestions((prev) => [...prev, question]);
  };

  const getSassyPhrase = () => {
    const randromNumber = Math.floor(Math.random() * botPhrases.length);
    const phrase = botPhrases[randromNumber];
    return phrase;
  };

  const addBotMessage = (answers) => {
    if (!answers.length) return;

    const [bestAnswer] = answers;
    const sassyPhrase = getSassyPhrase();
    console.log("bestAnswer", bestAnswer);
    const modifiedBotAnswer = {
      ...bestAnswer,
      answer: `${sassyPhrase}\n ${bestAnswer.answer}`,
    };
    addQuestion({
      ...modifiedBotAnswer,
      isBotMessage: true,
      from: { userName: "Botshtein" },
    });
  };

  return {
    addNewQuestion,
    addQuestion,
    fetchRoomById,
    addBotMessage,
    questions,
  };
};

export default useConversation;
