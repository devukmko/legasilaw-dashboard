export function formatToWIB(utcDateString: string): { date: string, time: string } {
    const utcDate = new Date(utcDateString); // Parse the UTC date string
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta', // Convert to WIB (UTC+7)
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    };

    const formatter = new Intl.DateTimeFormat('id-ID', options);
    const formattedDate = formatter.format(utcDate);

    // Replace ", " between date and time with a line break
    const [date, time] = formattedDate.split(', ');
    return {date, time};
}