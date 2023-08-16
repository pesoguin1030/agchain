function formatDateAndTime(dateObject) {
    // Convert to yyyy-MM-dd hh:mm:ss
    var year = dateObject.getFullYear()
    var mon =
        dateObject.getMonth() + 1 < 10
            ? '0' + (dateObject.getMonth() + 1)
            : dateObject.getMonth() + 1
    var data =
        dateObject.getDate() < 10
            ? '0' + dateObject.getDate()
            : dateObject.getDate()
    var hour =
        dateObject.getHours() < 10
            ? '0' + dateObject.getHours()
            : dateObject.getHours()
    var min =
        dateObject.getMinutes() < 10
            ? '0' + dateObject.getMinutes()
            : dateObject.getMinutes()
    var seon =
        dateObject.getSeconds() < 10
            ? '0' + dateObject.getSeconds()
            : dateObject.getSeconds()

    var newDate =
        year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon
    return newDate
}

function formatDateAndTimeFromBlockNumber(blockNumber){
    const date = new Date(blockNumber * 1000);
    const dateFormat =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
    console.log("Debug formatDateAndTimeFromBlockNumber","\ninput=",blockNumber,"\noutput=",dateFormat)
    return dateFormat
}
module.exports = {
    formatDateAndTime,
    formatDateAndTimeFromBlockNumber,
}
