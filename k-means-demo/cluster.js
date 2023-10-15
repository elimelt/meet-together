const { euclideanDistance } = require('./math-util')

function getRandomCentroids (data, k) {
  const centroids = []
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomCentroid = data[randomIndex].val
    if (
      !centroids.some(
        centroid => JSON.stringify(centroid) === JSON.stringify(randomCentroid)
      )
    ) {
      centroids.push(randomCentroid)
    }
  }
  return centroids
}

function assignToClusters (data, centroids) {
  const clusters = new Array(centroids.length).fill().map(() => [])
  for (const point of data) {
    const distances = centroids.map(centroid =>
      euclideanDistance(point, { val: centroid })
    )
    const closestCentroidIndex = distances.indexOf(Math.min(...distances))
    clusters[closestCentroidIndex].push(point)
  }
  return clusters
}

function calculateCentroids (clusters) {
  return clusters.map(cluster => {
    const clusterSize = cluster.length
    const clusterSum = cluster.reduce((acc, point) => {
      return acc.map((dim, index) => dim + point.val[index])
    }, new Array(cluster[0].val.length).fill(0))
    return clusterSum.map(val => val / clusterSize)
  })
}

function kMeans (data, k, maxIterations = 100) {
  let centroids = getRandomCentroids(data, k)
  let iterations = 0
  let prevCentroids = []
  while (
    iterations < maxIterations &&
    !centroids.every(
      (centroid, i) =>
        JSON.stringify(centroid) === JSON.stringify(prevCentroids[i])
    )
  ) {
    prevCentroids = centroids.map(centroid => [...centroid])
    const clusters = assignToClusters(data, centroids)
    centroids = calculateCentroids(clusters)
    iterations++
  }
  return assignToClusters(data, centroids)
}

function calcRank(i, j, groupSets, weights) {
    let score = 0;

    for (let k = 0; k < groupSets.length; k++) {
        const featureGroups = groupSets[k];

        for (let l = 0; l < featureGroups.length; l++) {
            const group = featureGroups[l];

            if (group.has(i) && group.has(j)) {
                score += weights[k];
            }
        }
    }

    return score;
}

function calcRankings(groupSets, weights, n) {
    const rankings = [];

    for (let i = 0; i < n; i++) {
        const ranking = [];
        for (let j = 0; j < n; j++) {
            ranking.push(calcRank(i, j, groupSets, weights));
        }

        rankings.push(ranking);
    }

    return rankings;
}

function createFinalGroups (sortedIDs, sortedRankings, k) {

    const lonely = new Set();
    const n = sortedIDs.length;

    // add k least popular
    for (let i = k; i < sortedIDs.length; i++)
        lonely.add(sortedIDs[i]);

    const magnets = {};

    for (let i = 0; i < k; i++) {
        magnets[sortedIDs[i]] = []
    }

    console.log('magnets', magnets)

    let d = 0;
    while (d < Math.floor(n / k)) {
        if (lonely.size == 0)
                break;

        for (let id of Object.keys(magnets)) {
            console.log('id', id)

            if (lonely.size == 0)
                break;

            const bestMatches = sortedRankings[id];
            let i = 0;

            while (i == id || !lonely.has(bestMatches[i]))
                i++;

            lonely.delete(bestMatches[i]);
            magnets[id].push(bestMatches[i]);

        }
        d++;
        console.log('d', d)
    }

    return magnets;

}

const clusterFeature = (k, data, featIdx) => {
    const entityFeatures = data.map(entity => ({
      val: entity.val[featIdx],
      id: entity.id
    }))

    const clusters = kMeans(entityFeatures, k, 10)
    return clusters
  }

  const clusterFeatures = (k, data) => {
    const featureClusters = []

    for (let f = 0; f < data[0].val.length; f++) {
      const clust = clusterFeature(k, data, f)
      featureClusters.push(clust)
    }

    return featureClusters
  }



  const parseClustersIntoGroupings = (featureClusters) =>
      featureClusters.map(
          clusters => clusters.map(
              cluster => cluster.map(
                  e => e.id)))

  const parseClustersIntoGroupSets = (featureClusters) => {
      const featureGroupSets = [];

      for (const clusters of featureClusters) {
          const groupSets = [];
          for (const cluster of clusters) {
              const groupSet = new Set();
              for (const entity of cluster) {
                  groupSet.add(entity.id)
              }
              groupSets.push(groupSet);
          }
          featureGroupSets.push(groupSets);
      }

      return featureGroupSets;
  }

  const parseDataMap = (data) => {
      const dataMap = {};

      for (const entity of data) {
          dataMap[entity.id] = entity.val;
      }

      return dataMap;
  }

  const idMap = (data) => {
      const idMap = {};

      for (let i = 0; i < data.length; i++) {
          idMap[entity.id] = i;
      }

      return idMap;
  }

  const sortRankings = (rankings) => {
      const sortedRankings = [];

      for (const ranking of rankings) {
          const sortedRanking = ranking
              .map((val, i) => [i, val]).sort((a, b) => b[1] - a[1]).map(pair => pair[0]);
          sortedRankings.push(sortedRanking);
      }

      return sortedRankings;
  }




  const rankPopularity = (rankings) => {
      const popularity = new Array(rankings.length).fill(0);

      for (const ranking of rankings) {
          for (let i = 0; i < ranking.length; i++) {
              popularity[i] += ranking[i];
          }
      }

      const popIndicies = popularity.map((val, i) => [i, val]).sort((a, b) => a[1] - b[1]).map(pair => pair[0]);

      return popIndicies;
  }


  const clusterItAll = (k, data, weights) => {
      const clusters = clusterFeatures(k, data);

      const groupSets = parseClustersIntoGroupSets(clusters);

      const rankings = calcRankings(groupSets, weights, data.length)

      const sortedRankings = sortRankings(rankings);

      const popIndicies = rankPopularity(rankings);

      const finalGroups = createFinalGroups(popIndicies, sortedRankings, k);

      return finalGroups;
  }


  // then, you can sort the people by their popularity score from LEAST TO GREATEST

  // the first k (number of groups) people will be the group leaders/"magnets", who will act as draft
  // leaders and pick from among "lonely", which is an array of currently unassigned people

  // the order in which picks happen is 0 -> k, k -> 0, 0 -> k, k -> 0, etc. until there have been d picks,
  // where d is the floor of n (number of people) / k (number of groups) -> this is # of people/group

  // any remaining people become the drafters to join the group that is most preferable TO THEM
module.exports = { clusterItAll }
