import { getDefaultClassNames, type DayPicker } from 'react-day-picker';
import { cn } from '@/src/lib/utils/utils';
import { buttonVariants, Button } from '@/src/components/ui/button';
import { ComponentProps } from 'react';

export function getCalendarClassNames(
  className: string | undefined,
  classNames: ComponentProps<typeof DayPicker>['classNames'],
  captionLayout:
    | 'label'
    | 'dropdown'
    | 'buttons'
    | 'dropdown-months'
    | 'dropdown-years'
    | undefined,
  buttonVariant: ComponentProps<typeof Button>['variant']
) {
  const defaultClassNames = getDefaultClassNames();

  return {
    root: cn('w-fit', defaultClassNames.root),
    months: cn(
      'flex gap-4 flex-col md:flex-row relative',
      defaultClassNames.months
    ),
    month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
    nav: cn(
      'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
      defaultClassNames.nav
    ),
    button_previous: cn(
      buttonVariants({ variant: buttonVariant }),
      'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
      defaultClassNames.button_previous
    ),
    button_next: cn(
      buttonVariants({ variant: buttonVariant }),
      'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
      defaultClassNames.button_next
    ),
    month_caption: cn(
      'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
      defaultClassNames.month_caption
    ),
    dropdowns: cn(
      'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
      defaultClassNames.dropdowns
    ),
    dropdown_root: cn(
      'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
      defaultClassNames.dropdown_root
    ),
    dropdown: cn(
      'absolute bg-popover inset-0 opacity-0',
      defaultClassNames.dropdown
    ),
    caption_label: cn(
      'select-none font-medium',
      captionLayout === 'label'
        ? 'text-sm'
        : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
      defaultClassNames.caption_label
    ),
    table: 'w-full border-collapse',
    weekdays: cn('flex', defaultClassNames.weekdays),
    weekday: cn(
      'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
      defaultClassNames.weekday
    ),
    week: cn('flex w-full mt-2', defaultClassNames.week),
    week_number_header: cn(
      'select-none w-(--cell-size)',
      defaultClassNames.week_number_header
    ),
    week_number: cn(
      'text-[0.8rem] select-none text-muted-foreground',
      defaultClassNames.week_number
    ),
    day: cn(
      'relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
      // We can't easily access props.showWeekNumber here without passing props,
      // but usually this is fine to keep static or pass full props.
      // For simplicity, let's keep it generic or pass the needed boolean.
      '[&:first-child[data-selected=true]_button]:rounded-l-md',
      defaultClassNames.day
    ),
    range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
    range_middle: cn('rounded-none', defaultClassNames.range_middle),
    range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
    today: cn(
      'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
      defaultClassNames.today
    ),
    outside: cn(
      'text-muted-foreground aria-selected:text-muted-foreground',
      defaultClassNames.outside
    ),
    disabled: cn(
      'text-muted-foreground opacity-50',
      defaultClassNames.disabled
    ),
    hidden: cn('invisible', defaultClassNames.hidden),
    ...classNames,
  };
}
