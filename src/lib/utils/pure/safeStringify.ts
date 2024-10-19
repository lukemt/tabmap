export function safeStringify(obj: any, seen: Set<any> = new Set()): string {
    if (obj === null || typeof obj !== 'object') {
        return String(obj);
    }
    if (seen.has(obj)) {
        return '[Circular]';
    }
    seen.add(obj);
    const result: { [key: string]: any } = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        result[key] = safeStringify(obj[key], seen);
    }
    return JSON.stringify(result);
}
