import { clusterItAll } from './cluster.js'

const aT =
  'ya29.a0AfB_byABpoof-4sL3vMy9DeGrxfdT3CiHsP5sidmziygQhw0TSZenqrOjsEjRfxMV_V_vSBS9dHj60qYw8Sw5BCwN_wVV3G2udKNyseaYac0eJVfIWmSPeHeeiSo2OJcVDSQwu3yLLaYE0V6XF1qP7PoG74U9sm4d5LyaCgYKAWsSARESFQGOcNnCkq2D30-wOAsHN4YoTwPxng0171'
async function getFormMetadata (formID, accessToken = aT) {
  const apiUrl = `https://forms.googleapis.com/v1/forms/${formID}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Define a function to fetch form responses
async function getFormResponses (formID, accessToken = aT) {
  const apiUrl = `https://forms.googleapis.com/v1/forms/${formID}/responses`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const processedMetadata = metadata => {
  return metadata.items.map(question => {
    return {
      title: question.title || '',
      id:
        question.questionItem &&
        question.questionItem.question &&
        question.questionItem.question.questionId,
      type:
        (question.questionItem &&
          question.questionItem.question &&
          question.questionItem.question.choiceQuestion &&
          question.questionItem.question.choiceQuestion.type) ||
        '',
      options: (
        (question.questionItem &&
          question.questionItem.question &&
          question.questionItem.question.choiceQuestion &&
          question.questionItem.question.choiceQuestion.options) ||
        []
      ).map(e => e.value)
    }
  })
}

const processedFormdata = formData => {
  return formData.responses.map(response => {
    return {
      title: response.respondentEmail || '',
      options: response.answers
    }
  })
}

function parseQuestionTypes (response) {
  const questionTypesMap = {}

  response.items.forEach(item => {
    const questionId = item.itemId

    let questionType =
      item.questionItem !== undefined
        ? item.questionItem.question.choiceQuestion.type
        : item.questionGroupItem !== undefined
        ? item.questionGroupItem.grid.columns.type === 'CHECKBOX'
          ? 'CHECKBOX_GRID'
          : 'RADIO_GRID'
        : null

    questionTypesMap[questionId] = questionType
  })

  return questionTypesMap
}

function getQuestionIdToItemIdMap (response) {
  const questionIdToItemIdMap = {}

  response.items.forEach(item => {
    const itemId = item.itemId

    if (item.questionItem !== undefined) {
      const questionId = item.questionItem.question.questionId
      questionIdToItemIdMap[questionId] = itemId
    } else if (item.questionGroupItem !== undefined) {
      const itemGroup = item.questionGroupItem.questions

      itemGroup.forEach(item => {
        const questionId = item.questionId
        questionIdToItemIdMap[questionId] = itemId
      })
    }
  })

  return questionIdToItemIdMap
}

function parseQuestionOptions (response, questionTypesMap) {
  const questionOptionsMap = {}

  response.items.forEach(item => {
    const questionId = item.itemId

    let questionType = questionTypesMap[questionId]

    let options = null

    if (questionType === 'RADIO') {
      options = item.questionItem.question.choiceQuestion.options.map(
        option => option.value
      )
    } else if (questionType === 'DROP_DOWN') {
      options = item.questionItem.question.choiceQuestion.options.map(
        option => option.value
      )
    } else if (questionType === 'CHECKBOX') {
      options = item.questionItem.question.choiceQuestion.options.map(
        option => option.value
      )
    } else if (questionType === 'CHECKBOX_GRID') {
      options = item.questionGroupItem.grid.columns.options.map(
        option => option.value
      )
    } else if (questionType === 'RADIO_GRID') {
      options = item.questionGroupItem.grid.columns.options.map(
        option => option.value
      )
    }

    if (options !== null) {
      questionOptionsMap[questionId] = options
    } else {
      questionOptionsMap[questionId] = null
    }
  })

  return questionOptionsMap
}

const parseResponse = (id, response, questionType, numerizedInputSpace) => {
  const trans = response.textAnswers.answers.map(e => e.value)

  const output = []
  Object.keys(numerizedInputSpace[id]).forEach((e, i) => {
    output.push(trans.indexOf(e) !== -1 ? 1 : 0)
  })

  return output
}

const parseResponses = (
  response,
  questionTypesMap,
  questionIdMap,
  numerizedInputSpace
) => {
  const { responses } = response

  const data = {}

  responses.forEach(r => {
    const email = r.respondentEmail
    const answers = r.answers

    const questions = {}

    Object.keys(answers).forEach(id => {
      const itemId = questionIdMap[id]
      const answer = answers[id]
      const type = questionTypesMap[itemId]

      questions[itemId] = {
        answer: parseResponse(itemId, answer, type, numerizedInputSpace),
        type: type
      }
    })

    data[email] = questions
  })

  return data
}

const numerizeOptionSpace = questionOptions => {
  const data = {}

  Object.keys(questionOptions).forEach((id, i) => {
    const options = questionOptions[id]

    data[id] = {}
    options.forEach((option, j) => {
      data[id][option] = j
    })
  })

  return data
}

const finalFormatting = data => {
  const output = []

  Object.keys(data).forEach(email => {
    const answers = data[email]

    const vals = []

    for (let id of Object.keys(answers)) {
      const answer = answers[id]

      vals.push(answer.answer)
    }

    const entry = {
      id: email,
      val: vals
    }

    output.push(entry)
  })

  return output
}

const accessToken =
  'ya29.a0AfB_byABpoof-4sL3vMy9DeGrxfdT3CiHsP5sidmziygQhw0TSZenqrOjsEjRfxMV_V_vSBS9dHj60qYw8Sw5BCwN_wVV3G2udKNyseaYac0eJVfIWmSPeHeeiSo2OJcVDSQwu3yLLaYE0V6XF1qP7PoG74U9sm4d5LyaCgYKAWsSARESFQGOcNnCkq2D30-wOAsHN4YoTwPxng0171'
async function clusterFormData (formID, k, weights) {
  const meta = await getFormMetadata(formID, accessToken)

  const questionIdMap = getQuestionIdToItemIdMap(meta)

  const questionTypes = parseQuestionTypes(meta)
  const optionsData = parseQuestionOptions(meta, questionTypes)
  const numericalData = numerizeOptionSpace(optionsData)

  const res = await getFormResponses(formID, accessToken)
  const responses = parseResponses(
    res,
    questionTypes,
    questionIdMap,
    numericalData
  )

  const finalData = finalFormatting(responses)

  console.log(finalData)

  const clusters = clusterItAll(k, finalData, weights)

  return clusters
}

export {
  processedFormdata,
  processedMetadata,
  getFormMetadata,
  getFormResponses,
  clusterFormData
}
