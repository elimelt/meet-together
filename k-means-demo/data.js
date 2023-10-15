function generateParsedData (count, numFeatures, featLength) {
    const featLengths = []

    for (let i = 0; i < numFeatures; i++)
        featLengths.push(featLength !== undefined
            ? featLength
            : Math.floor(Math.random() * 10) + 1);

    const data = [];

    const makeEntry = (id) => {
        const entry = [];

        for (let i = 0; i < numFeatures; i++) {
            const feat = [];
            for (let j = 0; j < featLengths[i]; j++) {
                feat.push(Math.floor(Math.random() * 10) + 1);
            }
            entry.push(feat);
        }
        return { id: id, val: entry };
    }

    for (let i = 0; i < count; i++) {
        data.push(makeEntry(i));
    }

    return data;

}



function generateFormData (count) {
  const data = []
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Henry',
    'Irene',
    'Jack'
  ]

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const email = `${name}@gmail.com`
    const x = Math.floor(Math.random() * 10) + 1
    const y = Math.floor(Math.random() * 10) + 1
    const z = Math.floor(Math.random() * 10) + 1
    const checkBox = Array.from({ length: 6 }, () => Math.round(Math.random()))
    const multipleChoiceGrid = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Math.round(Math.random()))
    )

    data.push({
      name: name,
      email: email,
      x: x,
      y: y,
      z: z,
      checkBox: checkBox,
      multipleChoiceGrid: multipleChoiceGrid
    })
  }

  return data
}

module.exports = { generateFormData, generateParsedData }
