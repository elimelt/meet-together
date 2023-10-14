
// /*
// * @param data: Array<Object> - data to be parsed
// * @returns Array<Object<String: string | number[]>> - parsed data
// */
// function findInputSpace(data) {
//     const inputSpace = {};
//     const counts = {};

//     const keys = Object.keys(data[0]);



//     data.forEach((entry) => {
//         Object.keys(entry).forEach((key) => {


//             if (!(key in inputSpace)) {
//                 inputSpace[key] = {};
//                 counts[key] = 0;
//             }

//             inputSpace[key][entry[key]] =
//         })
//     });
//     return inputSpace
// }

// /*
// * @param data: Array<Object> - data to be parsed
// * @returns Array<Object<String: number[]>> - parsed data
// */
// function parseData(data, inputSpace) {
//     const parsedData = data.map((item) => {
//         const parsedItem = {}
//         Object.keys(item).forEach((key) => {

//             if (typeof item[key] === 'string') {
//                 // if the data is textual, just keep it the same
//                 parsedItem[key] = item[key]
//             } else if (typeof item[key] === 'number') {
//                 // if the data is numerical, put it in an array
//                 parsedItem[key] = [item[key]]
//             } else if (Array.isArray(item[key])) {

//                 parsedItem[key] = item[key].map((item) => [item])

//             }
//         })
//         return parsedItem
//     });
// }

// module.exports = { parseData }