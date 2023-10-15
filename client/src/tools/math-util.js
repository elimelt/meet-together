function euclideanDistance(point1, point2) {

    // console.log('point1', point1)
    // console.log('point2', point2)

    if (point1.val.length !== point2.val.length)
        return Infinity;

    let sum = 0;

    for (let i = 0; i < point1.val.length; i++) {
        let v1 = isNaN(point1.val[i])
            ? Infinity
            : point1.val[i]

        let v2 = isNaN(point2.val[i])
            ? Infinity
            : point2.val[i]

        sum += Math.pow(v2 - v1, 2)
    }

    return Math.sqrt(sum);
}

export { euclideanDistance }