/**
 * Date utilities
 */
export class DateUtils {
  /**
   * Formats date to relative time (Today, Yesterday, 2 days ago)
   */
  static formatRelativeTime(dateString: string | null): string {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }

  /**
   * Checks if date is today
   */
  static isToday(dateString: string | null): boolean {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Formats date to readable format
   */
  static formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
    const date = new Date(dateString);
    return format === 'short' 
      ? date.toLocaleDateString()
      : date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
  }

  /**
   * Gets start of day
   */
  static getStartOfDay(date: Date = new Date()): Date {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  /**
   * Gets end of day
   */
  static getEndOfDay(date: Date = new Date()): Date {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }

  /**
   * Checks if date was yesterday
   */
  static isYesterday(dateString: string | null): boolean {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  }
}

