export function generateHash(str: string): number {
    let hash = 0
    let i = 0
    let len = str.length
    while (i < len) {
        hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return Math.abs(hash);
}