// Define a function to fetch form metadata
export async function getFormMetadata(formID) {
  const accessToken = 'ya29.a0AfB_byAtCN1NDtC8-bCzXKfuJ7uDSObBNqdsP1d6v1GIm4AK1gCWifujNrMxnOmo7yRPm56VKZgDEd9MNPXQ1FXxCYnRBNueqsHcm2qHuvF_L6ZFnh7WClL5lYy-lOkcCNXZ0xq0VHmrkGuiqJy61OG_xmCxx0FYjqzHaCgYKAfgSARESFQGOcNnCYELoJGjkVY8M-dJb6Hbuvg0171';
  const apiUrl = `https://forms.googleapis.com/v1/forms/${formID}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Define a function to fetch form responses
export async function getFormResponses(formID) {
  const accessToken = 'ya29.a0AfB_byAtCN1NDtC8-bCzXKfuJ7uDSObBNqdsP1d6v1GIm4AK1gCWifujNrMxnOmo7yRPm56VKZgDEd9MNPXQ1FXxCYnRBNueqsHcm2qHuvF_L6ZFnh7WClL5lYy-lOkcCNXZ0xq0VHmrkGuiqJy61OG_xmCxx0FYjqzHaCgYKAfgSARESFQGOcNnCYELoJGjkVY8M-dJb6Hbuvg0171';
  const apiUrl = `https://forms.googleapis.com/v1/forms/${formID}/responses`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const formID = "1COaD0aW1PwPEj2tW4QtQ_IRY3JPK0kc5BulEK8GjADk";

export const processedMetadata = (metadata) => {
  return metadata.items.map((question) => {
    return {
      title: question.title || "",
      id: (
        question.questionItem &&
        question.questionItem.question &&
        question.questionItem.question.questionId
      ),
      type: (
        question.questionItem &&
        question.questionItem.question &&
        question.questionItem.question.choiceQuestion &&
        question.questionItem.question.choiceQuestion.type
      ) || "",
      options: (
        (question.questionItem &&
          question.questionItem.question &&
          question.questionItem.question.choiceQuestion &&
          question.questionItem.question.choiceQuestion.options) || []
      ).map((e) => e.value),
    };
  });
}

export const processedFormdata = (formData) => {
  return formData.responses.map((response) => {
    return {
      title: response.respondentEmail || "",
      options: response.answers,
    };
  });
}

// Fetch form metadata and responses concurrently using Promise.all
// Promise.all([getFormMetadata(formID), getFormResponses(formID)])
//   .then(([metadata, formData]) => {
//     // Process metadata
//     const processedMetadata = metadata.items.map((question) => {
//       return {
//         title: question.title || "",
//         id: (
//           question.questionItem &&
//           question.questionItem.question &&
//           question.questionItem.question.questionId
//         ),
//         type: (
//           question.questionItem &&
//           question.questionItem.question &&
//           question.questionItem.question.choiceQuestion &&
//           question.questionItem.question.choiceQuestion.type
//         ) || "",
//         options: (
//           (question.questionItem &&
//             question.questionItem.question &&
//             question.questionItem.question.choiceQuestion &&
//             question.questionItem.question.choiceQuestion.options) || []
//         ).map((e) => e.value),
//       };
//     });

//     const processedFormdata = formData.responses.map((response) => {
//       return {
//         title: response.respondentEmail || "",
//         options: response.answers,
//       };
//     });

//     console.log("Meta Data:", processedMetadata);
//     console.log("Form Data:", processedFormdata);
//   })
//   .catch((error) => {
//     // Handle errors here
//     console.error("Error:", error);
//   }
// );