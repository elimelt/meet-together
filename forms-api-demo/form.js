// Define a function to fetch form metadata
async function getFormMetadata(formID) {
    const accessToken = "ya29.a0AfB_byAmDHllCGUVSIB35KyhYzwr8aLSDP6MjQZBYSje59jYXGwYfl5HS5d4mBt6FkgQCD5aF1hd5Xhk_brgBmqTCqjOCMn11BMBaLF5G3OJXX1U4-3eROaWTz5NQg69KA6pxF9LPRvc3QIHU8NguXBir8yeaUGi6J90aCgYKAYsSARESFQGOcNnC9xxvhVpHxk18zFTieJjo-Q0171"; // Replace with your actual access token
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
  async function getFormResponses(formID) {
    const accessToken = "ya29.a0AfB_byAmDHllCGUVSIB35KyhYzwr8aLSDP6MjQZBYSje59jYXGwYfl5HS5d4mBt6FkgQCD5aF1hd5Xhk_brgBmqTCqjOCMn11BMBaLF5G3OJXX1U4-3eROaWTz5NQg69KA6pxF9LPRvc3QIHU8NguXBir8yeaUGi6J90aCgYKAYsSARESFQGOcNnC9xxvhVpHxk18zFTieJjo-Q0171"; // Replace with your actual access token
    const apiUrl = `https://forms.googleapis.com/v1/forms/${formID}/responses`;
  
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
  
  const formID = "1COaD0aW1PwPEj2tW4QtQ_IRY3JPK0kc5BulEK8GjADk";
  
  // Fetch form metadata and responses concurrently using Promise.all
  Promise.all([getFormMetadata(formID), getFormResponses(formID)])
    .then(([metadata, formData]) => {
      // Process metadata
      const processedMetadata = metadata.items.map((question) => {
        console.log(
          JSON.stringify(
            (
              question &&
              question.questionItem &&
              question.questionItem.question &&
              question.questionItem.question.choiceQuestion &&
              question.questionItem.question.choiceQuestion.options
            )
          )
        );
        return {
          title: question.title || "",
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
  
      // Log the processed metadata and form data
      console.log("Meta Data:", processedMetadata);
      console.log("Form Data:", formData);
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
  