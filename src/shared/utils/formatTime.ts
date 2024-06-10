export function formatTime(minutes:number) {
    const totalSeconds = Math.floor(minutes * 60);
    const minutesPart = Math.floor(totalSeconds / 60);
    const secondsPart = totalSeconds % 60;
    return `${minutesPart}:${secondsPart.toString().padStart(2, '0')}`;
}