const isoTimeFormat = (date) => {
    const formatDate = new Date(date);
    const time = formatDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return time;
}

export default isoTimeFormat
