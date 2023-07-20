// To get unix epoch time
const convertToUnixEpochString = (dateTime) => {
    // UTC Date Conversion
    const origin = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0))
    let unixEpoch = ''
    if (dateTime != null && dateTime != undefined && dateTime != new Date(0)) {
        // Unix Epoch time calculation
        const diff = Math.floor((dateTime.getTime() - origin.getTime()) / 1000)
        unixEpoch = diff?.toString()?.trim()
    }

    return unixEpoch
}

module.exports = { convertToUnixEpochString }