type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'HTTP';

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}]: ${message}`;
  }

  public info(message: string): void {
    console.log(`\x1b[36m${this.formatMessage('INFO', message)}\x1b[0m`);
  }

  public warn(message: string): void {
    console.warn(`\x1b[33m${this.formatMessage('WARN', message)}\x1b[0m`);
  }

  public error(message: string, error?: unknown): void {
    console.error(`\x1b[31m${this.formatMessage('ERROR', message)}\x1b[0m`);
    if (error) {
      console.error(error);
    }
  }

  public http(message: string): void {
    console.log(`\x1b[35m${this.formatMessage('HTTP', message)}\x1b[0m`);
  }
}

export const logger = new Logger();
