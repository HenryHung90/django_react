/**
 * 取的現在時間
 * @param type 需要取得何種形式的時間
 */
function getNowTime(type: 'hm' | 'hms' | 'full') {
    const date = new Date()
    let hour = date.getHours().toString()
    let minute = date.getMinutes().toString()
    let second = date.getSeconds().toString()

    if (hour.toString().length === 1) {
        hour = "0" + hour
    }
    if (minute.toString().length === 1) {
        minute = "0" + minute
    }
    if (second.toString().length === 1) {
        second = "0" + second
    }

    switch (type) {
        case "hm":
            return hour + ":" + minute
        case "hms":
            return hour + ":" + minute + ":" + second
        case "full":
            return `${date.getFullYear()}/${date.getMonth() + 1
            }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
}

/**
 * 計算從匯入的時間到現在總共經過多久
 * @param time
 */
function calculateTimeDifference(time: string) {
    // 將時間字符串轉換為 Date 對象
    const timePattern = /(\d{4})(\d{2})(\d{2})_(\d{2})-(\d{2})-(\d{2})/;
    const match = time.match(timePattern)
    if (!match) throw new Error('Invalid time format')

    console.log(match)
    // 多一個, 用意: 跳過 match 數組第一個元素，是為原始的 timeStr
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const givenDate = new Date(year, month - 1, day, hour, minute, second);

    // 獲取現在時間
    const now = new Date();

    // 計算時間差距（以毫秒為單位）
    const timeDiff = now.getTime() - givenDate.getTime();

    // 計算差距的天數、時數、分鐘數和秒數
    const diffInSeconds = Math.floor(timeDiff / 1000)
    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

    // 根據時間分別給予不同單位
    if (diffInSeconds < 60) {
        return `${seconds}秒`;
    } else if (diffInSeconds < 3600) {
        return `${minutes}分鐘`;
    } else if (diffInSeconds < 86400) {
        return `${hours}小時`;
    } else {
        return `${days}天`
    }
}

export {getNowTime, calculateTimeDifference}