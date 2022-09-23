import instance from "./instance";

export const searchForAnswer = async ({ question }) => {
  try {
    const { data } = await instance.get(`messages/search`, {
      params: { content: question },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get users");
  }
};

/**
 *
 * @param {upvotes, downvotes} partialAnswerObject
 * @returns
 */
export const updateAnswer = async (id, partialAnswerObject) => {
  try {
    const { data } = await instance.patch(
      `messages/updateAnswer/${id}`,
      partialAnswerObject
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to update answer");
  }
};

export const createQuestion = async ({
  fromUserId,
  roomId,
  content,
  fromUserName = "Me",
}) => {
  try {
    const { data } = await instance.post("messages", {
      fromUserId,
      roomId,
      content,
    });
    return { ...data, from: { ...data.from, userName: fromUserName } };
  } catch (error) {
    console.error(error);
    throw new Error("failed to create a question");
  }
};

export const createAnswer = async ({ questionId, answer, fromUserId }) => {
  try {
    const { data } = await instance.post(`messages/addAnswer/${questionId}`, {
      answer,
      fromUserId,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to create an answer");
  }
};

export const getQuestionById = async (id) => {
  try {
    const result = await instance.get(`messages/${id}`);
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get message by id");
  }
};
