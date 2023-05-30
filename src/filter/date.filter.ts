import {DATE_FILTER_OPTIONS} from "@/config/date-filter.options";

export function dateFilter(date: Date) {
  return Intl.DateTimeFormat('ru-Ru', DATE_FILTER_OPTIONS).format(date)
}