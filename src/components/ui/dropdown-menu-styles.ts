// Common className patterns for dropdown menu components
export const DROPDOWN_ANIMATION_CLASSES =
  'data-[state=open]:animate-in data-[state=closed]:animate-out ' +
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ' +
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ' +
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 ' +
  'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

export const DROPDOWN_ITEM_BASE_CLASSES =
  'relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm ' +
  'outline-none transition-colors focus:bg-accent focus:text-accent-foreground ' +
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export const DROPDOWN_ICON_CLASSES =
  '[\u0026_svg]:pointer-events-none [\u0026_svg]:size-4 [\u0026_svg]:shrink-0';
