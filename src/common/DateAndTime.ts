
import strfime from 'strftime';

export function formatDate(date: Date): string {
  return strfime('%d %B, %Y', date);
}

export function formatTime(date: Date): string {
  return strfime('%H:%M', date);
}

export function parseDate(inputValue: any): Date|null {

  // yyyy-mm-dd
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

  if(typeof inputValue !== 'string') return null;

  const matches = inputValue.match(datePattern);
  if(!matches) return null;

  const dateNumber = Date.parse(inputValue);
  if(!dateNumber) return null;

  return new Date(dateNumber);
}

// returns true if date is on same day, regardless of time
export function onSameDay(eventDate: Date, paramDate: Date): boolean {
  if(eventDate.getFullYear() != paramDate.getFullYear()) return false;
  if(eventDate.getMonth() != paramDate.getMonth()) return false;
  if(eventDate.getDate() != paramDate.getDate()) return false;

  return true;
}