
function formatDate(isoString) {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "long",
    })
}

function convertToHourMinute(isoString) {
    const date = new Date(isoString)
    return date.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
}

function stripDateTime(isoString) {
    if (!isoString) return "";
    return isoString.split("T")[0]
}

export default {
    formatDate,
    convertToHourMinute,
    stripDateTime
}
