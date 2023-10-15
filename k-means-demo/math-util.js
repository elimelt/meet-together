function euclideanDistance(point1, point2) {
    return Math.sqrt(point1.val.reduce((sum, val, i) => sum + Math.pow(val - point2.val[i], 2), 0));
}

module.exports = { euclideanDistance }