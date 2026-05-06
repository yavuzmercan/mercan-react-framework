import { type ComponentType } from 'react';
import { IntroPage } from './Intro';
import { InstallPage } from './Install';
import { ThemingPage } from './Theming';
import { I18nPage } from './I18n';
import { IconsPage } from './Icons';
import { FontsPage } from './Fonts';
import { HooksPage } from './Hooks';
import { DataGridPage } from './DataGridPage';
import { PresetsPage } from './Presets';
import { ResponsiveLayoutPage } from './ResponsiveLayout';
import { BoxPage, StackPage, GridPage, DividerPage, ContainerPage } from './Layout';
import { TextPage, HeadingPage } from './Typography';
import {
  ButtonPage, InputPage, TextAreaPage, CheckboxPage, RadioPage, SwitchPage,
  SelectPage, SliderPage, FormFieldPage,
} from './Forms';
import {
  AvatarPage, BadgePage, TagPage, CardPage, ProgressPage, SpinnerPage, SkeletonPage, ListPage,
} from './Display';
import { AlertPage, ToastPage, ModalPage, TooltipPage, PopoverPage } from './Feedback';
import {
  TabsPage, BreadcrumbPage, PaginationPage, MenuPage, DrawerPage, AccordionPage,
} from './Navigation';
import {
  AspectRatioPage, CenterPage, SimpleGridPage,
  NumberInputPage, PinInputPage, InputGroupPage, ToggleGroupPage, FileInputPage,
  AvatarGroupPage, StatPage, KbdCodePage, EmptyStatePage, StepperPage, TimelinePage,
  TablePage, BannerPage, LinkPage,
} from './NewComponents';
import {
  PasswordInputPage, RatingPage, ComboboxPage, MultiSelectPage, CalendarPage, DatePickerPage,
  DescriptionListPage, CodeBlockPage, CopyButtonPage, HighlightPage,
  HoverCardPage, LoadingOverlayPage, ConfirmDialogPage,
  AppShellPage, NavBarPage, FooterPage,
  CommandPalettePage, BackToTopPage, SplitterPage,
} from './MoreComponents';

export const PAGES: Record<string, ComponentType> = {
  '/': IntroPage,
  '/install': InstallPage,
  '/theming': ThemingPage,
  '/presets': PresetsPage,
  '/responsive': ResponsiveLayoutPage,
  '/i18n': I18nPage,
  '/icons': IconsPage,
  '/fonts': FontsPage,
  '/hooks': HooksPage,

  '/box': BoxPage,
  '/stack': StackPage,
  '/grid': GridPage,
  '/simplegrid': SimpleGridPage,
  '/aspectratio': AspectRatioPage,
  '/center': CenterPage,
  '/divider': DividerPage,
  '/container': ContainerPage,
  '/appshell': AppShellPage,
  '/navbar': NavBarPage,
  '/footer': FooterPage,

  '/text': TextPage,
  '/heading': HeadingPage,

  '/button': ButtonPage,
  '/input': InputPage,
  '/inputgroup': InputGroupPage,
  '/passwordinput': PasswordInputPage,
  '/numberinput': NumberInputPage,
  '/pininput': PinInputPage,
  '/textarea': TextAreaPage,
  '/checkbox': CheckboxPage,
  '/radio': RadioPage,
  '/switch': SwitchPage,
  '/togglegroup': ToggleGroupPage,
  '/rating': RatingPage,
  '/select': SelectPage,
  '/combobox': ComboboxPage,
  '/multiselect': MultiSelectPage,
  '/slider': SliderPage,
  '/calendar': CalendarPage,
  '/datepicker': DatePickerPage,
  '/fileinput': FileInputPage,
  '/formfield': FormFieldPage,

  '/avatar': AvatarPage,
  '/avatargroup': AvatarGroupPage,
  '/badge': BadgePage,
  '/tag': TagPage,
  '/card': CardPage,
  '/stat': StatPage,
  '/kbdcode': KbdCodePage,
  '/codeblock': CodeBlockPage,
  '/copybutton': CopyButtonPage,
  '/highlight': HighlightPage,
  '/dl': DescriptionListPage,
  '/progress': ProgressPage,
  '/spinner': SpinnerPage,
  '/skeleton': SkeletonPage,
  '/empty': EmptyStatePage,
  '/stepper': StepperPage,
  '/timeline': TimelinePage,
  '/list': ListPage,
  '/table': TablePage,
  '/datagrid': DataGridPage,

  '/alert': AlertPage,
  '/banner': BannerPage,
  '/toast': ToastPage,
  '/modal': ModalPage,
  '/confirm': ConfirmDialogPage,
  '/tooltip': TooltipPage,
  '/popover': PopoverPage,
  '/hovercard': HoverCardPage,
  '/loading': LoadingOverlayPage,

  '/tabs': TabsPage,
  '/link': LinkPage,
  '/breadcrumb': BreadcrumbPage,
  '/pagination': PaginationPage,
  '/menu': MenuPage,
  '/drawer': DrawerPage,
  '/accordion': AccordionPage,
  '/cmdk': CommandPalettePage,
  '/backtotop': BackToTopPage,
  '/splitter': SplitterPage,
};
