interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export function formatTimestamp(timestamp: Timestamp): string {
    const date = new Date(timestamp.seconds * 1000);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}