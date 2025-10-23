import { Pipe, PipeTransform } from '@angular/core';
import { HabitUtils } from '../../core/utils/habit.utils';

/**
 * Formats streak number to readable format
 * @example {{ habit.currentStreak | streakFormat }} => "7 days"
 */
@Pipe({
  name: 'streakFormat',
  standalone: true
})
export class StreakFormatPipe implements PipeTransform {
  transform(streak: number): string {
    return HabitUtils.formatStreak(streak);
  }
}

