// Define a function to fetch form metadata
export async function getFormMetadata(formID) {
  const accessToken = "ya29.a0AfB_byByZageyIozKmwcSxlDP5f3GGoNPlNPnH7wIbM43fDItu73Fm6qzGLZduJwxp19gR3usVsbQbIlRx7_kNp0aH5nyTxejQ8z9ta4TR8kR5l2jq6wT_E5eEikZ4QwAFsiFejbDlNRNSgAosCeyUn1tastidmSipsLaCgYKAUsSARESFQGOcNnCH8or5K4LJZ2EM-ajynenpg0171"; // Replace with your actual access token
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
  const accessToken = "ya29.a0AfB_byByZageyIozKmwcSxlDP5f3GGoNPlNPnH7wIbM43fDItu73Fm6qzGLZduJwxp19gR3usVsbQbIlRx7_kNp0aH5nyTxejQ8z9ta4TR8kR5l2jq6wT_E5eEikZ4QwAFsiFejbDlNRNSgAosCeyUn1tastidmSipsLaCgYKAUsSARESFQGOcNnCH8or5K4LJZ2EM-ajynenpg0171";
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

// Fetch form metadata and responses concurrently using Promise.all
Promise.all([getFormMetadata(formID), getFormResponses(formID)])
  .then(([metadata, formData]) => {
    // Process metadata
    const processedMetadata = metadata.items.map((question) => {
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

    const processedFormdata = formData.responses.map((response) => {
      return {
        title: response.respondentEmail || "",
        options: response.answers,
      };
    });

    console.log("Meta Data:", processedMetadata);
    console.log("Form Data:", processedFormdata);
  })
  .catch((error) => {
    // Handle errors here
    console.error("Error:", error);
  }
);