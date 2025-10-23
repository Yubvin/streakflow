import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../../core/utils/date.utils';

/**
 * Transforms date string to relative time format
 * @example {{ habit.lastCheckIn | relativeTime }} => "2 days ago"
 */
@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(dateString: string | null): string {
    return DateUtils.formatRelativeTime(dateString);
  }
}

