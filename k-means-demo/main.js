const { generateParsedData } = require('./data.js')
const { clusterItAll } = require('./cluster.js')


const n = 300;
const numFeatures = 20;
const k = 10;
const unnormalizedWeights = new Array(numFeatures).fill(Math.random());
const weights = unnormalizedWeights.map(val => val / unnormalizedWeights.reduce((sum, val) => sum + val, 0));
const data = generateParsedData(n, numFeatures);

const clusters = clusterItAll(k, data, weights);

console.log('clusters', clusters);
