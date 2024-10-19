import { safeStringify } from "../pure/safeStringify";

export function alertOnError() {
  // alert on console.error
  const consoleError = console.error
  console.error = (...args: any[]) => {
    consoleError(...args);
    const errorMessage = args.map(arg =>
      typeof arg === 'string' ? arg : safeStringify(arg)
    ).join('\n');
    alert('Error: ' + errorMessage);
  }
}