import { searchForAnswer } from "../api";

const useBot = () => {
  const search = async (question) => {
    const answer = await searchForAnswer({ question });
    return answer;
  };

  return { search };
};

export default useBot;
