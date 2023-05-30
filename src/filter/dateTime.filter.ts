import {DATE_TIME_FILTER_OPTIONS} from "@/config/date-time-filter.options";

export function dateTimeFilter(date: Date) {
  return Intl.DateTimeFormat('ru-Ru', DATE_TIME_FILTER_OPTIONS).format(date)
}