import { useState } from 'react';
import {
  PasswordInput, Rating, Combobox, MultiSelect, Calendar, DatePicker,
  DescriptionList, CodeBlock, CopyButton, Highlight,
  HoverCard, LoadingOverlay, ConfirmDialog,
  AppShell, NavBar, Footer,
  CommandPalette, type CommandItem, BackToTop, Splitter,
  Heading, Text, VStack, HStack, Card, CardBody, Button, Avatar, Box, Link,
} from '@yavuzmercan/ui';
import {
  Home, Search, Settings, User, Bell, Mail, Plus, Trash, Edit,
} from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

/* ===== Forms ===== */

export const PasswordInputPage = () => {
  const [v, setV] = useState('');
  return (
    <VStack gap="lg">
      <Heading level={1}>PasswordInput</Heading>
      <Story title="With visibility toggle" code={`<PasswordInput value={v} onChange={(e) => setV(e.target.value)} />`}>
        <PasswordInput value={v} onChange={(e) => setV(e.target.value)} placeholder="Password" />
      </Story>
      <PropsTable rows={[
        { prop: 'hideToggle', type: 'boolean', description: 'Removes the eye icon button.' },
        { prop: 'invalid', type: 'boolean', description: 'Shows the invalid state.' },
      ]} />
    </VStack>
  );
};

export const RatingPage = () => {
  const [v, setV] = useState(3);
  return (
    <VStack gap="lg">
      <Heading level={1}>Rating</Heading>
      <Story title="Star rating" code={`<Rating value={v} onChange={setV} />`}>
        <VStack gap="sm">
          <Rating value={v} onChange={setV} />
          <Text tone="muted" size="sm">Selected: {v} of 5</Text>
        </VStack>
      </Story>
      <Story title="Read-only" code={`<Rating value={4.5} readOnly />`}>
        <Rating value={4} readOnly />
      </Story>
      <Story title="Custom count and size" code={`<Rating count={10} size={28} />`}>
        <Rating count={10} size={28} />
      </Story>
    </VStack>
  );
};

const cities = [
  { label: 'İstanbul', value: 'ist' },
  { label: 'Ankara', value: 'ank' },
  { label: 'İzmir', value: 'izm' },
  { label: 'Antalya', value: 'ant' },
  { label: 'Bursa', value: 'bur' },
  { label: 'Adana', value: 'ada' },
  { label: 'Konya', value: 'kon' },
];

export const ComboboxPage = () => {
  const [v, setV] = useState('');
  return (
    <VStack gap="lg">
      <Heading level={1}>Combobox</Heading>
      <Text>Searchable single-select. Type to filter, ↑/↓ to navigate, Enter to select.</Text>
      <Story title="With cities" code={`<Combobox options={cities} value={v} onChange={setV} />`}>
        <Box style={{ width: 280 }}>
          <Combobox options={cities} value={v} onChange={setV} placeholder="Pick a city…" />
        </Box>
      </Story>
    </VStack>
  );
};

export const MultiSelectPage = () => {
  const [v, setV] = useState<string[]>(['ist', 'izm']);
  return (
    <VStack gap="lg">
      <Heading level={1}>MultiSelect</Heading>
      <Text>Multiple values shown as removable tags. Backspace to remove the last item.</Text>
      <Story title="Tags" code={`<MultiSelect options={cities} value={v} onChange={setV} />`}>
        <Box style={{ width: 360 }}>
          <MultiSelect options={cities} value={v} onChange={setV} placeholder="Pick cities" />
        </Box>
      </Story>
    </VStack>
  );
};

export const CalendarPage = () => {
  const [d, setD] = useState<Date | null>(new Date());
  return (
    <VStack gap="lg">
      <Heading level={1}>Calendar</Heading>
      <Story title="Month view" code={`<Calendar value={d} onChange={setD} />`}>
        <HStack gap="lg" align="start">
          <Calendar value={d} onChange={setD} />
          <Text tone="muted" size="sm">Selected: {d?.toLocaleDateString() ?? '—'}</Text>
        </HStack>
      </Story>
    </VStack>
  );
};

export const DatePickerPage = () => {
  const [d, setD] = useState<Date | null>(null);
  return (
    <VStack gap="lg">
      <Heading level={1}>DatePicker</Heading>
      <Story title="Pick a date" code={`<DatePicker value={d} onChange={setD} />`}>
        <Box style={{ width: 240 }}>
          <DatePicker value={d} onChange={setD} />
        </Box>
      </Story>
    </VStack>
  );
};

/* ===== Display ===== */

export const DescriptionListPage = () => (
  <VStack gap="lg">
    <Heading level={1}>DescriptionList</Heading>
    <Story title="Key/value display" code={`<DescriptionList items={[{ term: 'Name', description: 'Ada' }]} />`}>
      <Card><CardBody>
        <DescriptionList items={[
          { term: 'Name', description: 'Ada Lovelace' },
          { term: 'Email', description: 'ada@example.com' },
          { term: 'Role', description: 'Administrator' },
          { term: 'Joined', description: 'May 2026' },
          { term: 'Status', description: <Highlight colorScheme="success">Active</Highlight> },
        ]} />
      </CardBody></Card>
    </Story>
  </VStack>
);

export const CodeBlockPage = () => (
  <VStack gap="lg">
    <Heading level={1}>CodeBlock</Heading>
    <Story title="With language and copy" code={`<CodeBlock language="tsx" code="…" />`}>
      <CodeBlock
        language="tsx"
        code={`function greet(name: string) {\n  return \`Hello, \${name}\`;\n}`}
      />
    </Story>
  </VStack>
);

export const CopyButtonPage = () => (
  <VStack gap="lg">
    <Heading level={1}>CopyButton</Heading>
    <Story title="One-click copy" code={`<CopyButton value="Hello world" />`}>
      <HStack gap="md" align="center">
        <CopyButton value="Hello, world!" />
        <CopyButton value="https://mercan.dev" label="Copy URL" />
      </HStack>
    </Story>
  </VStack>
);

export const HighlightPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Highlight</Heading>
    <Story title="Inline marker" code={`<Highlight>important</Highlight>`}>
      <Text>
        Mercan is a <Highlight>themeable</Highlight> React framework with{' '}
        <Highlight colorScheme="primary">brand support</Highlight>,{' '}
        <Highlight colorScheme="success">i18n built-in</Highlight>, and{' '}
        <Highlight colorScheme="danger">no extra dependencies</Highlight>.
      </Text>
    </Story>
  </VStack>
);

/* ===== Feedback ===== */

export const HoverCardPage = () => (
  <VStack gap="lg">
    <Heading level={1}>HoverCard</Heading>
    <Story title="Rich hover preview" code={`<HoverCard trigger={<Link>@ada</Link>}>…</HoverCard>`}>
      <Text>
        Hover over{' '}
        <HoverCard
          trigger={<Link href="#">@ada-lovelace</Link>}
        >
          <HStack gap="md">
            <Avatar name="Ada Lovelace" size="md" />
            <VStack gap="xs">
              <Text weight="semibold">Ada Lovelace</Text>
              <Text size="sm" tone="muted">First computer programmer.</Text>
              <Text size="sm" tone="muted">Joined May 2026</Text>
            </VStack>
          </HStack>
        </HoverCard>{' '}
        to see the rich card.
      </Text>
    </Story>
  </VStack>
);

export const LoadingOverlayPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <VStack gap="lg">
      <Heading level={1}>LoadingOverlay</Heading>
      <Story title="Section overlay" code={`<Card><LoadingOverlay visible={loading} message="Saving…" />…</Card>`}>
        <VStack gap="md">
          <Button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
            Trigger 1.5s loading
          </Button>
          <Card style={{ position: 'relative' }} className="mf-loading-host">
            <CardBody>
              <Heading level={5}>Some panel</Heading>
              <Text tone="muted">This area can be blocked while loading.</Text>
              <LoadingOverlay visible={loading} message="Saving…" />
            </CardBody>
          </Card>
        </VStack>
      </Story>
    </VStack>
  );
};

export const ConfirmDialogPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="lg">
      <Heading level={1}>ConfirmDialog</Heading>
      <Story title="Delete confirm" code={`<ConfirmDialog isOpen={…} onConfirm={…} confirmColorScheme="danger" />`}>
        <Button colorScheme="danger" leftIcon={<Trash size={14} />} onClick={() => setOpen(true)}>
          Delete account
        </Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Delete account?"
          message="This cannot be undone. All your data will be permanently deleted."
          confirmLabel="Yes, delete"
          confirmColorScheme="danger"
        />
      </Story>
    </VStack>
  );
};

/* ===== Layout / Shell ===== */

export const AppShellPage = () => (
  <VStack gap="lg">
    <Heading level={1}>AppShell</Heading>
    <Text>Layout primitive that arranges navbar, sidebar, main and footer in a CSS grid.</Text>
    <Story title="Mini preview" code={`<AppShell navbar={<NavBar …/>} sidebar={…} footer={…}>…</AppShell>`}>
      <Box style={{ height: 280, border: '1px solid var(--mf-color-borderSubtle)', borderRadius: 8, overflow: 'hidden' }}>
        <AppShell
          navbar={<NavBar brand={<><Home size={16} /> Mercan</>} actions={<Button size="sm" variant="ghost">Action</Button>} />}
          sidebar={
            <VStack gap="xs">
              <Text size="sm" weight="medium">Home</Text>
              <Text size="sm" tone="muted">Settings</Text>
              <Text size="sm" tone="muted">Reports</Text>
            </VStack>
          }
          footer={<Footer copyright="© 2026 Mercan" />}
        >
          <Heading level={4}>Main content</Heading>
          <Text tone="muted">This is the main grid area.</Text>
        </AppShell>
      </Box>
    </Story>
    <PropsTable rows={[
      { prop: 'navbar', type: 'ReactNode', description: 'Top bar slot.' },
      { prop: 'sidebar', type: 'ReactNode', description: 'Left aside slot. If omitted, content takes full width.' },
      { prop: 'footer', type: 'ReactNode', description: 'Bottom row slot.' },
      { prop: 'sidebarWidth', type: 'number | string', defaultValue: '240', description: 'Sidebar width (px or any CSS length).' },
    ]} />
  </VStack>
);

export const NavBarPage = () => (
  <VStack gap="lg">
    <Heading level={1}>NavBar</Heading>
    <Story title="Brand + nav + actions" code={`<NavBar brand={<>…</>} actions={<>…</>}>…</NavBar>`}>
      <NavBar
        brand={<><Home size={18} /> <span>Mercan</span></>}
        actions={
          <>
            <Button variant="ghost" size="sm" leftIcon={<Bell size={14} />}>3</Button>
            <Avatar name="Ada Lovelace" size="sm" />
          </>
        }
      >
        <Link href="#">Home</Link>
        <Link href="#" tone="muted">Settings</Link>
        <Link href="#" tone="muted">Help</Link>
      </NavBar>
    </Story>
  </VStack>
);

export const FooterPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Footer</Heading>
    <Story title="With copyright and links" code={`<Footer copyright="© 2026 Mercan" links={<>…</>} />`}>
      <Footer
        copyright="© 2026 Mercan UI. All rights reserved."
        links={
          <>
            <Link href="#" tone="muted">Privacy</Link>
            <Link href="#" tone="muted">Terms</Link>
            <Link href="#" tone="muted">Contact</Link>
          </>
        }
      />
    </Story>
  </VStack>
);

/* ===== Navigation ===== */

export const CommandPalettePage = () => {
  const [open, setOpen] = useState(false);
  const items: CommandItem[] = [
    { id: 'home', label: 'Go to Home', icon: <Home size={14} />, shortcut: ['G', 'H'], group: 'Navigation', onSelect: () => alert('Home') },
    { id: 'settings', label: 'Open Settings', icon: <Settings size={14} />, shortcut: ['G', 'S'], group: 'Navigation', onSelect: () => alert('Settings') },
    { id: 'profile', label: 'Profile', icon: <User size={14} />, group: 'Navigation', onSelect: () => alert('Profile') },
    { id: 'new', label: 'Create new', icon: <Plus size={14} />, shortcut: ['⌘', 'N'], group: 'Actions', onSelect: () => alert('Create') },
    { id: 'edit', label: 'Edit current', icon: <Edit size={14} />, shortcut: ['⌘', 'E'], group: 'Actions', onSelect: () => alert('Edit') },
    { id: 'mail', label: 'Send message', icon: <Mail size={14} />, group: 'Actions', onSelect: () => alert('Mail') },
  ];
  return (
    <VStack gap="lg">
      <Heading level={1}>CommandPalette</Heading>
      <Text>⌘K-style searchable command modal with grouped items, shortcuts and keyboard navigation.</Text>
      <Story title="Open palette" code={`<CommandPalette isOpen={open} onClose={…} items={items} />`}>
        <Button leftIcon={<Search size={14} />} onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandPalette isOpen={open} onClose={() => setOpen(false)} items={items} />
      </Story>
    </VStack>
  );
};

export const BackToTopPage = () => (
  <VStack gap="lg">
    <Heading level={1}>BackToTop</Heading>
    <Text>Floating button that appears after scrolling past <code>threshold</code>. Try scrolling down on this docs page to see it.</Text>
    <Story title="Mount once at app root" code={`<BackToTop threshold={300} />`}>
      <Text tone="muted" size="sm">Already mounted on this docs app — scroll the main panel.</Text>
    </Story>
  </VStack>
);

export const SplitterPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Splitter</Heading>
    <Text>Resizable two-pane layout. Drag the divider to resize.</Text>
    <Story title="Horizontal" code={`<Splitter>\n  <Pane1 />\n  <Pane2 />\n</Splitter>`}>
      <Box style={{ height: 200, border: '1px solid var(--mf-color-borderSubtle)', borderRadius: 8, overflow: 'hidden' }}>
        <Splitter defaultSize={40}>
          <Box p="md" bg="surfaceAlt" style={{ height: '100%' }}>Sidebar</Box>
          <Box p="md" style={{ height: '100%' }}>Main content</Box>
        </Splitter>
      </Box>
    </Story>
    <Story title="Vertical" code={`<Splitter direction="vertical">…</Splitter>`}>
      <Box style={{ height: 240, border: '1px solid var(--mf-color-borderSubtle)', borderRadius: 8, overflow: 'hidden' }}>
        <Splitter direction="vertical" defaultSize={60}>
          <Box p="md" bg="surfaceAlt" style={{ width: '100%' }}>Top pane</Box>
          <Box p="md" style={{ width: '100%' }}>Bottom pane</Box>
        </Splitter>
      </Box>
    </Story>
  </VStack>
);
