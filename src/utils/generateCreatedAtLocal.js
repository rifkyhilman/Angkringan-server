const generateCreatedAtLocal = () => {
    const timeZone = "Asia/Jakarta"; 
    const now = new Date();
    const localTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone
    }).format(now);

    const [month, day, year, hour, minute, second] = localTime.match(/\d+/g);
    const localCreatedAt = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`);
    return localCreatedAt
}

module.exports = generateCreatedAtLocal;