const generateCreatedAtLocal = () => {
    const now = new Date();
    const timeZoneOffset = now.getTimezoneOffset() * 60000; 
    return new Date(now.getTime() - timeZoneOffset);
}

module.exports = generateCreatedAtLocal;