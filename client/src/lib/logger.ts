// Logging utility for the frontend
// Matches the backend format: [LEVEL] filename:line_number - message

type LogLevel = 'info' | 'debug' | 'warn' | 'error';

class Logger {
  private level: LogLevel = 'info';
  private enabled = true;

  constructor() {
    // Check if logging is enabled based on environment or settings
    this.enabled = process.env.NODE_ENV !== 'production';
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }

 setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.enabled) return false;

    const levelPriority: Record<LogLevel, number> = {
      error: 4,
      warn: 3,
      info: 2,
      debug: 1
    };

    const currentPriority = levelPriority[this.level];
    const messagePriority = levelPriority[level];

    return messagePriority >= currentPriority;
  }

 private log(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    // Get the caller's filename and line number
    const stack = new Error().stack;
    let callerInfo = 'unknown:0';
    
    if (stack) {
      // Extract the caller's file and line number from the stack trace
      const stackLines = stack.split('\n');
      // Skip the first line (the Error object creation) and the second line (this function)
      // The third line should be the caller
      if (stackLines.length >= 4) {
        const callerLine = stackLines[3];
        const match = callerLine.match(/at (.*) \((.*):(\d+):(\d+)\)|at (.*):(\d+):(\d+)/);
        if (match) {
          const filePath = match[2] || match[5] || 'unknown';
          const lineNumber = match[3] || match[6] || '0';
          // Extract just the filename from the path
          const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || 'unknown';
          callerInfo = `${fileName}:${lineNumber}`;
        }
      }
    }

    const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const formattedMessage = `[${timestamp}] ${level.toUpperCase()} - ${callerInfo} - ${message}`;
    
    switch (level) {
      case 'error':
        console.error(formattedMessage, ...args);
        break;
      case 'warn':
        console.warn(formattedMessage, ...args);
        break;
      case 'info':
        console.info(formattedMessage, ...args);
        break;
      case 'debug':
        console.debug(formattedMessage, ...args);
        break;
      default:
        console.log(formattedMessage, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    this.log('info', message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log('debug', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log('error', message, ...args);
  }
}

// Create a singleton logger instance
const logger = new Logger();
export default logger;

// Also export a function to get the logger instance if needed
export const getLogger = (): Logger => logger;
