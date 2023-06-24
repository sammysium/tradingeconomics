export function dateTimeStringToYear(datetime: string): number {
    var d = new Date(datetime);
    return d.getFullYear();
}