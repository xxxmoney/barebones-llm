import type {DateTime} from 'ts-luxon';

export interface MessageDto {
  id: string;
  text: string;
  role: string;
  date: DateTime;
}
