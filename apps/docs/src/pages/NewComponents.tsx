import { useState } from 'react';
import {
  AspectRatio, Center, SimpleGrid, Box, Card, CardBody,
  NumberInput, PinInput, InputGroup, InputAddon, ToggleGroup, ToggleButton, FileInput, Input,
  AvatarGroup, Avatar, Stat, Kbd, Code, EmptyState, Stepper, Timeline, TimelineItem, Table,
  Banner, Link, Heading, Text, VStack, HStack, Button,
} from '@yavuzmercan/ui';
import { Search, Mail, Bell, Plus, ExternalLink, Info, Check, AlertTriangle } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

/* ===== Layout ===== */

export const AspectRatioPage = () => (
  <VStack gap="lg">
    <Heading level={1}>AspectRatio</Heading>
    <Text>Locks a child to a specific width:height ratio.</Text>
    <Story title="16:9 video frame" code={`<AspectRatio ratio={16/9}>\n  <iframe src="…" />\n</AspectRatio>`}>
      <Box style={{ maxWidth: 480 }}>
        <AspectRatio ratio={16 / 9}>
          <img src="https://picsum.photos/640/360" alt="" style={{ borderRadius: 8 }} />
        </AspectRatio>
      </Box>
    </Story>
    <PropsTable rows={[
      { prop: 'ratio', type: 'number', defaultValue: '16/9', description: 'Width / height ratio.' },
    ]} />
  </VStack>
);

export const CenterPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Center</Heading>
    <Text>Flex container that centers children both axes.</Text>
    <Story title="Basic" code={`<Center style={{ height: 120 }}>Content</Center>`}>
      <Center style={{ height: 120, background: 'var(--mf-color-surfaceAlt)', borderRadius: 8 }}>
        <Text>Centered</Text>
      </Center>
    </Story>
  </VStack>
);

export const SimpleGridPage = () => (
  <VStack gap="lg">
    <Heading level={1}>SimpleGrid</Heading>
    <Text>Grid that auto-fits columns based on a minimum child width — instantly responsive.</Text>
    <Story title="Auto-fit columns" code={`<SimpleGrid minChildWidth={180} gap="md">…</SimpleGrid>`}>
      <SimpleGrid minChildWidth={180} gap="md">
        {Array.from({ length: 5 }).map((_, i) => (
          <Box key={i} bg="surfaceAlt" p="md" radius="md">item {i + 1}</Box>
        ))}
      </SimpleGrid>
    </Story>
    <Story title="Fixed columns" code={`<SimpleGrid columns={4} gap="sm">…</SimpleGrid>`}>
      <SimpleGrid columns={4} gap="sm">
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i} bg="surfaceAlt" p="sm" radius="sm">{i + 1}</Box>
        ))}
      </SimpleGrid>
    </Story>
    <PropsTable rows={[
      { prop: 'minChildWidth', type: 'number | string', description: 'Minimum width per column. Enables auto-fit.' },
      { prop: 'columns', type: 'number', description: 'Fixed number of equal columns (ignored if minChildWidth set).' },
      { prop: 'gap', type: 'SpacingKey', defaultValue: "'md'", description: 'Gap token.' },
    ]} />
  </VStack>
);

/* ===== Forms ===== */

export const NumberInputPage = () => {
  const [v, setV] = useState(5);
  return (
    <VStack gap="lg">
      <Heading level={1}>NumberInput</Heading>
      <Story title="With min/max" code={`<NumberInput value={v} onChange={setV} min={0} max={10} />`}>
        <NumberInput value={v} onChange={setV} min={0} max={10} />
      </Story>
      <PropsTable rows={[
        { prop: 'value', type: 'number', description: 'Controlled value.' },
        { prop: 'onChange', type: '(value: number) => void', description: 'Called with the clamped value.' },
        { prop: 'min / max / step', type: 'number', description: 'Numeric bounds and step size.' },
      ]} />
    </VStack>
  );
};

export const PinInputPage = () => {
  const [code, setCode] = useState('');
  return (
    <VStack gap="lg">
      <Heading level={1}>PinInput</Heading>
      <Text>Multi-cell input for OTP codes. Handles paste, backspace, arrow nav.</Text>
      <Story title="6-digit numeric" code={`<PinInput length={6} value={code} onChange={setCode} onComplete={…} />`}>
        <VStack gap="sm">
          <PinInput length={6} value={code} onChange={setCode} />
          <Text tone="muted" size="sm">Value: {code || '—'}</Text>
        </VStack>
      </Story>
      <Story title="Masked alphanumeric" code={`<PinInput length={4} type="alphanumeric" mask />`}>
        <PinInput length={4} type="alphanumeric" mask />
      </Story>
    </VStack>
  );
};

export const InputGroupPage = () => (
  <VStack gap="lg">
    <Heading level={1}>InputGroup</Heading>
    <Text>Compose an input with prepend/append addons.</Text>
    <Story title="Prefix and suffix" code={`<InputGroup>\n  <InputAddon>https://</InputAddon>\n  <Input placeholder="example" />\n  <InputAddon>.com</InputAddon>\n</InputGroup>`}>
      <InputGroup>
        <InputAddon>https://</InputAddon>
        <Input placeholder="example" />
        <InputAddon>.com</InputAddon>
      </InputGroup>
    </Story>
    <Story title="With icon" code={`<InputGroup>\n  <InputAddon><Search size={14} /></InputAddon>\n  <Input placeholder="Search" />\n</InputGroup>`}>
      <InputGroup>
        <InputAddon><Search size={14} /></InputAddon>
        <Input placeholder="Search" />
      </InputGroup>
    </Story>
  </VStack>
);

export const ToggleGroupPage = () => {
  const [view, setView] = useState<string | string[]>('grid');
  return (
    <VStack gap="lg">
      <Heading level={1}>ToggleGroup</Heading>
      <Text>Segmented control. Single or multi-select.</Text>
      <Story title="Single select" code={`<ToggleGroup value={view} onChange={setView}>\n  <ToggleButton value="grid">Grid</ToggleButton>\n</ToggleGroup>`}>
        <ToggleGroup value={view} onChange={setView}>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
      </Story>
      <Story title="Multi select" code={`<ToggleGroup multiple defaultValue={['bold']}>\n  …\n</ToggleGroup>`}>
        <ToggleGroup multiple defaultValue={['bold']}>
          <ToggleButton value="bold">B</ToggleButton>
          <ToggleButton value="italic">I</ToggleButton>
          <ToggleButton value="underline">U</ToggleButton>
        </ToggleGroup>
      </Story>
    </VStack>
  );
};

export const FileInputPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <VStack gap="lg">
      <Heading level={1}>FileInput</Heading>
      <Text>Click or drag-and-drop. Accepts <code>accept</code> and <code>multiple</code>.</Text>
      <Story title="Drag and drop" code={`<FileInput multiple onChange={setFiles} />`}>
        <FileInput multiple value={files} onChange={setFiles} accept="image/*" />
      </Story>
    </VStack>
  );
};

/* ===== Display ===== */

export const AvatarGroupPage = () => (
  <VStack gap="lg">
    <Heading level={1}>AvatarGroup</Heading>
    <Story title="Stacked avatars" code={`<AvatarGroup max={3}>\n  <Avatar name="A" />\n  …\n</AvatarGroup>`}>
      <AvatarGroup max={3}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Linus Torvalds" />
        <Avatar name="Margaret Hamilton" />
      </AvatarGroup>
    </Story>
  </VStack>
);

export const StatPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Stat</Heading>
    <Story title="With direction" code={`<Stat label="Revenue" value="$45.2k" helpText="12% from last month" direction="up" />`}>
      <SimpleGrid columns={3} gap="md">
        <Card><CardBody>
          <Stat label="Active Users" value="3,421" helpText="12% from last month" direction="up" />
        </CardBody></Card>
        <Card><CardBody>
          <Stat label="Revenue" value="$45.2k" helpText="-3% from last month" direction="down" />
        </CardBody></Card>
        <Card><CardBody>
          <Stat label="Conversion" value="2.4%" helpText="No change" />
        </CardBody></Card>
      </SimpleGrid>
    </Story>
  </VStack>
);

export const KbdCodePage = () => (
  <VStack gap="lg">
    <Heading level={1}>Kbd & Code</Heading>
    <Story title="Keyboard shortcuts" code={`Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search.`}>
      <Text>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette. Use <Kbd>Esc</Kbd> to close.</Text>
    </Story>
    <Story title="Inline code" code={`Use <Code>const</Code> for immutable bindings.`}>
      <Text>Use <Code>const</Code> for immutable bindings, <Code>let</Code> for mutable ones.</Text>
    </Story>
    <Story title="Code block" code={`<Code block>{snippet}</Code>`}>
      <Code block>{`function greet(name: string) {\n  return \`Hello, \${name}\`;\n}`}</Code>
    </Story>
  </VStack>
);

export const EmptyStatePage = () => (
  <VStack gap="lg">
    <Heading level={1}>EmptyState</Heading>
    <Story title="Inbox zero" code={`<EmptyState icon={<Mail />} title="Inbox zero" description="…" action={<Button>Compose</Button>} />`}>
      <Card><CardBody>
        <EmptyState
          icon={<Mail size={28} />}
          title="No messages"
          description="When you receive messages, they'll appear here."
          action={<Button leftIcon={<Plus size={14} />}>Compose</Button>}
        />
      </CardBody></Card>
    </Story>
  </VStack>
);

export const StepperPage = () => {
  const [step, setStep] = useState(1);
  return (
    <VStack gap="lg">
      <Heading level={1}>Stepper</Heading>
      <Story title="Multi-step flow" code={`<Stepper steps={[…]} active={step} />`}>
        <VStack gap="md">
          <Stepper
            active={step}
            steps={[
              { label: 'Account' },
              { label: 'Profile' },
              { label: 'Verify' },
              { label: 'Done' },
            ]}
          />
          <HStack gap="sm">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
            <Button onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}>Next</Button>
          </HStack>
        </VStack>
      </Story>
    </VStack>
  );
};

export const TimelinePage = () => (
  <VStack gap="lg">
    <Heading level={1}>Timeline</Heading>
    <Story title="Activity feed" code={`<Timeline>\n  <TimelineItem>…</TimelineItem>\n</Timeline>`}>
      <Timeline>
        <TimelineItem>
          <Text weight="medium">Order placed</Text>
          <Text tone="muted" size="sm">2 hours ago</Text>
        </TimelineItem>
        <TimelineItem dotColor="var(--mf-color-success)">
          <Text weight="medium">Payment received</Text>
          <Text tone="muted" size="sm">1 hour ago</Text>
        </TimelineItem>
        <TimelineItem dotColor="var(--mf-color-warning)" isLast>
          <Text weight="medium">Awaiting shipment</Text>
          <Text tone="muted" size="sm">just now</Text>
        </TimelineItem>
      </Timeline>
    </Story>
  </VStack>
);

/* ===== Data ===== */

interface Person { name: string; email: string; role: string; status: string; }

const people: Person[] = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'active' },
  { name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', status: 'active' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'Viewer', status: 'invited' },
];

export const TablePage = () => (
  <VStack gap="lg">
    <Heading level={1}>Table</Heading>
    <Story title="Data table" code={`<Table data={rows} columns={[…]} striped hover />`}>
      <Table<Person>
        striped
        hover
        data={people}
        rowKey={(r) => r.email}
        columns={[
          { key: 'name', header: 'Name', cell: (r) => (
            <HStack gap="sm" align="center">
              <Avatar name={r.name} size="sm" />
              <Text weight="medium">{r.name}</Text>
            </HStack>
          )},
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status', align: 'right', cell: (r) => (
            <span style={{ color: r.status === 'active' ? 'var(--mf-color-success)' : 'var(--mf-color-warning)' }}>
              {r.status}
            </span>
          )},
        ]}
      />
    </Story>
    <PropsTable rows={[
      { prop: 'data', type: 'T[]', description: 'Array of row objects.' },
      { prop: 'columns', type: 'TableColumn<T>[]', description: 'Column definitions with optional cell renderer.' },
      { prop: 'striped', type: 'boolean', description: 'Alternate row backgrounds.' },
      { prop: 'hover', type: 'boolean', description: 'Highlight rows on hover.' },
      { prop: 'rowKey', type: '(row, i) => key', description: 'Stable key generator.' },
    ]} />
  </VStack>
);

/* ===== Feedback ===== */

export const BannerPage = () => {
  const [show, setShow] = useState(true);
  return (
    <VStack gap="lg">
      <Heading level={1}>Banner</Heading>
      <Text>Page-level message bar with optional close button and action.</Text>
      <Story title="Dismissible banner" code={`<Banner status="info" onClose={…}>New version available.</Banner>`}>
        <VStack gap="sm">
          <Banner status="info" icon={<Info size={16} />}>
            A new version is available.{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Reload</span>
          </Banner>
          <Banner status="warning" icon={<AlertTriangle size={16} />} onClose={() => setShow(false)} style={{ display: show ? 'flex' : 'none' }}>
            Your subscription expires in 3 days.
          </Banner>
          <Banner status="success" icon={<Check size={16} />}>
            Settings saved.
          </Banner>
        </VStack>
      </Story>
    </VStack>
  );
};

/* ===== Navigation ===== */

export const LinkPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Link</Heading>
    <Story title="Internal & external" code={`<Link href="/about">About</Link>\n<Link href="https://…" external>Docs</Link>`}>
      <VStack gap="sm">
        <Text><Link href="#">Internal link</Link></Text>
        <Text><Link href="https://example.com" external>External link</Link></Text>
        <Text>
          Inline <Link href="#" tone="muted">muted link</Link> in a sentence.
        </Text>
      </VStack>
    </Story>
    <PropsTable rows={[
      { prop: 'external', type: 'boolean', description: 'Adds target=_blank, rel=noopener and an arrow indicator.' },
      { prop: 'tone', type: "'default' | 'muted'", defaultValue: "'default'", description: 'Color tone.' },
    ]} />
  </VStack>
);
