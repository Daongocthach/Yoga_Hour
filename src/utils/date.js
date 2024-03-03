export function checkFirstDayOfMonth() {
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentSecond = currentDate.getSeconds()

    if (currentDay === 1 && currentHour === 0 && currentMinute === 0 && currentSecond === 0) {
        return true
    } else {
        return false
    }
}