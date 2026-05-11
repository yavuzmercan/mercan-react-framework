export interface RouteEntry {
  path: string;
  label: string;
}

export interface RouteSection {
  section: string;
  entries: RouteEntry[];
}

export const ROUTES: RouteSection[] = [
  {
    section: 'Get Started',
    entries: [
      { path: '/', label: 'Introduction' },
      { path: '/install', label: 'Installation' },
      { path: '/theming', label: 'Theming' },
      { path: '/builder', label: 'Theme builder' },
      { path: '/presets', label: 'Theme presets' },
      { path: '/i18n', label: 'i18n' },
      { path: '/icons', label: 'Icons' },
      { path: '/fonts', label: 'Fonts' },
      { path: '/hooks', label: 'Hooks' },
      { path: '/responsive', label: 'Responsive layouts' },
    ],
  },
  {
    section: 'Layout',
    entries: [
      { path: '/box', label: 'Box' },
      { path: '/stack', label: 'Stack' },
      { path: '/grid', label: 'Grid' },
      { path: '/simplegrid', label: 'SimpleGrid' },
      { path: '/aspectratio', label: 'AspectRatio' },
      { path: '/center', label: 'Center' },
      { path: '/divider', label: 'Divider' },
      { path: '/container', label: 'Container' },
      { path: '/appshell', label: 'AppShell' },
      { path: '/navbar', label: 'NavBar' },
      { path: '/footer', label: 'Footer' },
    ],
  },
  {
    section: 'Typography',
    entries: [
      { path: '/text', label: 'Text' },
      { path: '/heading', label: 'Heading' },
    ],
  },
  {
    section: 'Forms',
    entries: [
      { path: '/button', label: 'Button' },
      { path: '/input', label: 'Input' },
      { path: '/inputgroup', label: 'InputGroup' },
      { path: '/passwordinput', label: 'PasswordInput' },
      { path: '/numberinput', label: 'NumberInput' },
      { path: '/pininput', label: 'PinInput' },
      { path: '/textarea', label: 'TextArea' },
      { path: '/checkbox', label: 'Checkbox' },
      { path: '/radio', label: 'Radio' },
      { path: '/switch', label: 'Switch' },
      { path: '/togglegroup', label: 'ToggleGroup' },
      { path: '/rating', label: 'Rating' },
      { path: '/select', label: 'Select' },
      { path: '/combobox', label: 'Combobox' },
      { path: '/multiselect', label: 'MultiSelect' },
      { path: '/slider', label: 'Slider' },
      { path: '/calendar', label: 'Calendar' },
      { path: '/datepicker', label: 'DatePicker' },
      { path: '/fileinput', label: 'FileInput' },
      { path: '/formfield', label: 'FormField' },
    ],
  },
  {
    section: 'Data Display',
    entries: [
      { path: '/avatar', label: 'Avatar' },
      { path: '/avatargroup', label: 'AvatarGroup' },
      { path: '/badge', label: 'Badge' },
      { path: '/tag', label: 'Tag' },
      { path: '/card', label: 'Card' },
      { path: '/stat', label: 'Stat' },
      { path: '/kbdcode', label: 'Kbd & Code' },
      { path: '/codeblock', label: 'CodeBlock' },
      { path: '/copybutton', label: 'CopyButton' },
      { path: '/highlight', label: 'Highlight' },
      { path: '/dl', label: 'DescriptionList' },
      { path: '/progress', label: 'Progress' },
      { path: '/spinner', label: 'Spinner' },
      { path: '/skeleton', label: 'Skeleton' },
      { path: '/empty', label: 'EmptyState' },
      { path: '/stepper', label: 'Stepper' },
      { path: '/timeline', label: 'Timeline' },
      { path: '/list', label: 'List' },
      { path: '/table', label: 'Table' },
      { path: '/datagrid', label: 'DataGrid' },
    ],
  },
  {
    section: 'Feedback',
    entries: [
      { path: '/alert', label: 'Alert' },
      { path: '/banner', label: 'Banner' },
      { path: '/toast', label: 'Toast' },
      { path: '/modal', label: 'Modal' },
      { path: '/confirm', label: 'ConfirmDialog' },
      { path: '/tooltip', label: 'Tooltip' },
      { path: '/popover', label: 'Popover' },
      { path: '/hovercard', label: 'HoverCard' },
      { path: '/loading', label: 'LoadingOverlay' },
    ],
  },
  {
    section: 'Navigation',
    entries: [
      { path: '/tabs', label: 'Tabs' },
      { path: '/link', label: 'Link' },
      { path: '/breadcrumb', label: 'Breadcrumb' },
      { path: '/pagination', label: 'Pagination' },
      { path: '/menu', label: 'Menu' },
      { path: '/drawer', label: 'Drawer' },
      { path: '/accordion', label: 'Accordion' },
      { path: '/cmdk', label: 'CommandPalette' },
      { path: '/backtotop', label: 'BackToTop' },
      { path: '/splitter', label: 'Splitter' },
    ],
  },
];
