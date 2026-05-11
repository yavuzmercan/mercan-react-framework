import { useState } from 'react';
import {
  MercanProvider,
  Container,
  HStack,
  VStack,
  Stack,
  Grid,
  GridItem,
  SimpleGrid,
  Row,
  Col,
  Box,
  Divider,
  Spacer,
  Heading,
  Text,
  Button,
  IconButton,
  Input,
  TextArea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  Slider,
  FormField,
  FormGroup,
  Avatar,
  Badge,
  Tag,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Progress,
  Spinner,
  Skeleton,
  List,
  ListItem,
  Alert,
  Modal,
  Tooltip,
  Popover,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Breadcrumb,
  Pagination,
  Menu,
  MenuItem,
  MenuDivider,
  Drawer,
  Accordion,
  AccordionItem,
  DataGrid,
  type DataGridColumn,
  Combobox,
  MultiSelect,
  DatePicker,
  useToast,
} from '@yavuzmercan/ui/components';
import {
  useColorMode,
  useTranslation,
  useBreakpoint,
  useBreakpointDown,
  presets,
  useForm,
  type PresetName,
  type Resolver,
} from '@yavuzmercan/ui';
import {
  Sun,
  Moon,
  Heart,
  Settings,
  Search,
  Mail,
  Plus,
  Trash,
  Download,
  Check,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Bell,
  MenuIcon,
  Home,
  Star,
  ChevronRight,
} from '@yavuzmercan/ui/icons';
import { resources } from './locales';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box as="section" py="2xl">
    <VStack gap="lg">
      <Heading level={3}>{title}</Heading>
      <Divider />
      {children}
    </VStack>
  </Box>
);

interface TopBarProps {
  preset: 'system' | PresetName;
  onPresetChange: (p: 'system' | PresetName) => void;
}

const TopBar = ({ preset, onPresetChange }: TopBarProps) => {
  const { t, locale, setLocale } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointDown('md');

  const presetOptions = [
    { value: 'system', label: 'Default' },
    ...Object.entries(presets).map(([key, p]) => ({ value: key, label: p.name })),
  ];

  return (
    <Box
      as="header"
      px="lg"
      py="md"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--mf-color-surface)',
        borderBottom: '1px solid var(--mf-color-borderSubtle)',
      }}
    >
      <Container size="xl">
        <HStack align="center" gap="md" wrap>
          <Heading level={4}>{t('app.title')}</Heading>
          <Spacer />
          {!isMobile && (
            <Select
              aria-label="Preset"
              value={preset}
              onChange={(e) => onPresetChange(e.target.value as 'system' | PresetName)}
              options={presetOptions}
              style={{ width: 140 }}
            />
          )}
          <Select
            aria-label="Language"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'tr', label: 'Türkçe' },
            ]}
            style={{ width: 120 }}
          />
          <Tooltip label="Saved to localStorage — persists across reloads">
            <Button
              variant="outline"
              colorScheme="secondary"
              onClick={toggleColorMode}
              leftIcon={colorMode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
            >
              {colorMode === 'light' ? t('nav.light') : t('nav.dark')}
            </Button>
          </Tooltip>
        </HStack>
      </Container>
    </Box>
  );
};

const ButtonsSection = () => {
  const { t } = useTranslation();
  return (
    <Section title={t('sections.buttons')}>
      <VStack gap="md">
        <HStack gap="sm" wrap>
          <Button leftIcon={<Plus size={16} />}>{t('actions.primary')}</Button>
          <Button colorScheme="secondary" leftIcon={<Download size={16} />}>{t('actions.secondary')}</Button>
          <Button colorScheme="danger" leftIcon={<Trash size={16} />}>{t('actions.danger')}</Button>
          <Button variant="outline" rightIcon={<ChevronRight size={16} />}>{t('actions.outline')}</Button>
          <Button variant="ghost" leftIcon={<Mail size={16} />}>{t('actions.ghost')}</Button>
          <Button variant="link">{t('actions.link')}</Button>
        </HStack>
        <HStack gap="sm" wrap align="center">
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button loading>loading</Button>
          <Button disabled>disabled</Button>
          <IconButton aria-label="Like" icon={<Heart size={18} />} />
          <IconButton aria-label="Settings" variant="solid" colorScheme="primary" icon={<Settings size={18} />} />
          <IconButton aria-label="Notifications" variant="outline" icon={<Bell size={18} />} />
        </HStack>
      </VStack>
    </Section>
  );
};

const TypographySection = () => {
  const { t } = useTranslation();
  return (
    <Section title={t('sections.typography')}>
      <VStack gap="sm">
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Text size="lg" weight="semibold">Large semibold</Text>
        <Text>Regular paragraph text.</Text>
        <Text tone="muted" size="sm">Muted small text.</Text>
        <HStack gap="sm">
          <Text tone="primary">primary</Text>
          <Text tone="success">success</Text>
          <Text tone="warning">warning</Text>
          <Text tone="danger">danger</Text>
          <Text tone="info">info</Text>
        </HStack>
      </VStack>
    </Section>
  );
};

const FormsSection = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('admin');
  const [agree, setAgree] = useState(false);
  const [notify, setNotify] = useState(true);
  const [volume, setVolume] = useState(40);

  return (
    <Section title={t('sections.inputs')}>
      <Grid columns={2} gap="lg" style={{ alignItems: 'start' }}>
        <FormGroup>
          <FormField label={t('form.name')} required>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('form.name')} />
          </FormField>
          <FormField
            label={t('form.email')}
            errorText={email && !email.includes('@') ? t('form.requiredHelp') : undefined}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('form.emailPlaceholder')}
            />
          </FormField>
          <FormField label={t('form.bio')} helpText="Markdown supported.">
            <TextArea value={bio} onChange={(e) => setBio(e.target.value)} placeholder={t('form.bioPlaceholder')} />
          </FormField>
          <FormField label="Search">
            <HStack
              gap="sm"
              align="center"
              style={{
                border: '1px solid var(--mf-color-border)',
                borderRadius: 'var(--mf-radius-md)',
                paddingInline: 'var(--mf-spacing-md)',
                background: 'var(--mf-color-surface)',
              }}
            >
              <Search size={16} color="var(--mf-color-textMuted)" />
              <Input
                placeholder="Find anything…"
                style={{ border: 0, padding: '8px 0', background: 'transparent' }}
              />
            </HStack>
          </FormField>
        </FormGroup>
        <FormGroup>
          <FormField label={t('form.role')}>
            <RadioGroup name="role" value={role} onChange={setRole}>
              <Stack direction="row" gap="md">
                <Radio value="admin" label="Admin" />
                <Radio value="editor" label="Editor" />
                <Radio value="viewer" label="Viewer" />
              </Stack>
            </RadioGroup>
          </FormField>
          <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} label={t('form.newsletter')} />
          <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} label={t('form.notifications')} />
          <FormField label={`${t('form.volume')}: ${volume}`}>
            <Slider value={volume} min={0} max={100} onChange={(e) => setVolume(Number(e.target.value))} />
          </FormField>
          <Select
            placeholder="Select country"
            options={[
              { value: 'tr', label: 'Türkiye' },
              { value: 'us', label: 'United States' },
              { value: 'de', label: 'Deutschland' },
            ]}
          />
        </FormGroup>
      </Grid>
    </Section>
  );
};

const DisplaySection = () => {
  const { t } = useTranslation();
  return (
    <Section title={t('sections.display')}>
      <VStack gap="lg">
        <HStack gap="md" align="center" wrap>
          <Avatar name="Mercan UI" size="sm" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="Linus Torvalds" size="lg" />
          <Avatar size="xl" src="https://i.pravatar.cc/120?img=12" alt="random" />
          <Badge colorScheme="primary">
            <HStack gap="xs" align="center"><Star size={10} /> New</HStack>
          </Badge>
          <Badge colorScheme="success">
            <HStack gap="xs" align="center"><Check size={10} /> Active</HStack>
          </Badge>
          <Badge colorScheme="warning">Pending</Badge>
          <Badge colorScheme="danger">Failed</Badge>
          <Badge colorScheme="neutral">Draft</Badge>
          <Tag>react</Tag>
          <Tag onClose={() => {}}>typescript</Tag>
        </HStack>
        <Grid columns={3} gap="lg">
          <Card>
            <CardHeader>
              <Heading level={5}>Card title</Heading>
            </CardHeader>
            <CardBody>
              <Text tone="muted">Plain bordered card with header, body and footer.</Text>
            </CardBody>
            <CardFooter>
              <HStack gap="sm">
                <Spacer />
                <Button variant="ghost">{t('actions.cancel')}</Button>
                <Button>{t('actions.save')}</Button>
              </HStack>
            </CardFooter>
          </Card>
          <Card shadow>
            <CardBody>
              <VStack gap="sm">
                <Heading level={5}>With shadow</Heading>
                <Text tone="muted">Cards lift off the page using elevation.</Text>
                <Image
                  rounded
                  src="https://picsum.photos/400/200"
                  alt="random"
                  style={{ aspectRatio: '2/1', objectFit: 'cover' }}
                />
              </VStack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <VStack gap="sm">
                <Heading level={5}>Loading state</Heading>
                <Skeleton height={14} width="60%" />
                <Skeleton height={14} />
                <Skeleton height={14} width="80%" />
                <HStack gap="sm" align="center">
                  <Spinner size="sm" />
                  <Text tone="muted" size="sm">Fetching…</Text>
                </HStack>
                <Progress value={62} />
                <Progress indeterminate />
              </VStack>
            </CardBody>
          </Card>
        </Grid>
        <Card>
          <List interactive>
            <ListItem>
              <HStack align="center" gap="md">
                <User size={20} color="var(--mf-color-primary)" />
                <VStack gap="none">
                  <Text weight="medium">First item</Text>
                  <Text tone="muted" size="sm">Click to view</Text>
                </VStack>
                <Spacer />
                <Badge colorScheme="primary">5</Badge>
                <ChevronRight size={16} color="var(--mf-color-textMuted)" />
              </HStack>
            </ListItem>
            <ListItem>
              <HStack align="center" gap="md">
                <Mail size={20} color="var(--mf-color-info)" />
                <VStack gap="none">
                  <Text weight="medium">Second item</Text>
                  <Text tone="muted" size="sm">Status: active</Text>
                </VStack>
                <Spacer />
                <Badge colorScheme="success">OK</Badge>
                <ChevronRight size={16} color="var(--mf-color-textMuted)" />
              </HStack>
            </ListItem>
          </List>
        </Card>
      </VStack>
    </Section>
  );
};

const FeedbackSection = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const toast = useToast();
  return (
    <Section title={t('sections.feedback')}>
      <VStack gap="md">
        <Alert status="info" title="Heads up" icon={<Info size={20} />}>An informational message.</Alert>
        <Alert status="success" title="Saved" icon={<CheckCircle size={20} />}>Your changes have been stored.</Alert>
        <Alert status="warning" title="Quota" icon={<AlertTriangle size={20} />}>You are using 80% of your quota.</Alert>
        <Alert status="danger" title="Error" icon={<XCircle size={20} />}>Something went wrong.</Alert>
        <HStack gap="sm" wrap>
          <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>{t('actions.open')} Modal</Button>
          <Button
            variant="outline"
            onClick={() => toast.show({ title: t('toasts.saved'), status: 'success' })}
            leftIcon={<Check size={16} />}
          >
            {t('actions.showToast')}
          </Button>
          <Button
            variant="outline"
            colorScheme="danger"
            onClick={() => toast.show({ title: t('toasts.failed'), message: 'Try again', status: 'danger' })}
            leftIcon={<XCircle size={16} />}
          >
            {t('toasts.failed')}
          </Button>
          <Tooltip label="Save your work">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
          <Popover trigger={<Button variant="outline">Popover</Button>}>
            <VStack gap="sm">
              <Heading level={5}>Pop content</Heading>
              <Text tone="muted" size="sm">A floating panel with arbitrary content.</Text>
              <Button size="sm">Action</Button>
            </VStack>
          </Popover>
        </HStack>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal title"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                {t('actions.cancel')}
              </Button>
              <Button onClick={() => setModalOpen(false)}>{t('actions.save')}</Button>
            </>
          }
        >
          <Text>This is a modal with a footer. Press Esc or click outside to close.</Text>
        </Modal>
      </VStack>
    </Section>
  );
};

const NavigationSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(3);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Section title={t('sections.navigation')}>
      <VStack gap="lg">
        <Breadcrumb
          items={[
            { label: <HStack gap="xs" align="center"><Home size={14} /> Home</HStack>, href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Navigation' },
          ]}
        />
        <Tabs defaultValue="overview">
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="usage">Usage</Tab>
            <Tab value="api">API</Tab>
            <Tab value="changelog" disabled>Changelog</Tab>
          </TabList>
          <TabPanel value="overview">
            <Text tone="muted">Overview of the navigation primitives.</Text>
          </TabPanel>
          <TabPanel value="usage">
            <Text tone="muted">Examples of how to compose them.</Text>
          </TabPanel>
          <TabPanel value="api">
            <Text tone="muted">Detailed prop reference.</Text>
          </TabPanel>
        </Tabs>
        <HStack gap="md" wrap align="center">
          <Pagination page={page} pageCount={12} onChange={setPage} />
          <Menu
            trigger={
              <Button variant="outline" leftIcon={<MenuIcon size={16} />}>
                Menu
              </Button>
            }
          >
            <MenuItem>
              <HStack gap="sm" align="center"><User size={14} /> Profile</HStack>
            </MenuItem>
            <MenuItem>
              <HStack gap="sm" align="center"><Settings size={14} /> Settings</HStack>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <HStack gap="sm" align="center"><XCircle size={14} /> Logout</HStack>
            </MenuItem>
          </Menu>
          <Button onClick={() => setDrawerOpen(true)} leftIcon={<Settings size={16} />}>
            Open drawer
          </Button>
        </HStack>
        <Accordion defaultOpen={['a']}>
          <AccordionItem id="a" title="Can I customize the theme?">
            Pass a `lightOverride` or `darkOverride` to <code>MercanProvider</code> with any subset of tokens.
          </AccordionItem>
          <AccordionItem id="b" title="How does i18n work?">
            Provide `resources` keyed by locale; use <code>useTranslation()</code> in your components.
          </AccordionItem>
          <AccordionItem id="c" title="Is it accessible?">
            Components ship with sensible roles, focus rings, and keyboard handlers (Esc to close, etc.).
          </AccordionItem>
        </Accordion>
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
          <VStack gap="md">
            <Text tone="muted">Drawer content with form items.</Text>
            <FormField label={t('form.name')}>
              <Input placeholder={t('form.name')} />
            </FormField>
            <Switch label={t('form.notifications')} defaultChecked />
            <Button onClick={() => setDrawerOpen(false)}>{t('actions.close')}</Button>
          </VStack>
        </Drawer>
      </VStack>
    </Section>
  );
};

const ComposedSection = () => {
  const { t, formatNumber } = useTranslation();
  return (
    <Section title={t('sections.composed')}>
      <Grid columns={2} gap="lg">
        <Card shadow>
          <CardBody>
            <VStack gap="md">
              <HStack align="center" gap="md">
                <Avatar name="Ada Lovelace" />
                <VStack gap="none">
                  <Heading level={5}>{t('sample.welcome', { name: 'Ada' })}</Heading>
                  <Text tone="muted" size="sm">{t('sample.itemCount', { count: 12 })}</Text>
                </VStack>
                <Spacer />
                <Badge colorScheme="success">
                  <HStack gap="xs" align="center"><Check size={10} /> Active</HStack>
                </Badge>
              </HStack>
              <Divider />
              <Text>You have <strong>{formatNumber(1240)}</strong> followers and <strong>{formatNumber(0.98, { style: 'percent' })}</strong> engagement.</Text>
              <HStack gap="sm">
                <Spacer />
                <Button variant="ghost" rightIcon={<ChevronRight size={14} />}>{t('sample.readMore')}</Button>
                <Button leftIcon={<Check size={16} />}>{t('actions.save')}</Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <VStack gap="md">
              <Heading level={5}>Quick form</Heading>
              <FormField label={t('form.name')} required>
                <Input placeholder={t('form.name')} />
              </FormField>
              <FormField label={t('form.email')}>
                <Input placeholder={t('form.emailPlaceholder')} />
              </FormField>
              <Button fullWidth leftIcon={<Mail size={16} />}>{t('actions.submit')}</Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </Section>
  );
};

interface PresetsSectionProps {
  preset: 'system' | PresetName;
  onPresetChange: (p: 'system' | PresetName) => void;
}

const PresetsSection = ({ preset, onPresetChange }: PresetsSectionProps) => {
  const { t } = useTranslation();
  return (
    <Section title={t('sections.presets')}>
      <VStack gap="md">
        <Text tone="muted">
          Eight built-in presets ship with Mercan UI. Click any tile to apply it instantly — light & dark variants are
          included.
        </Text>
        <SimpleGrid minChildWidth={{ base: 220, md: 260 }} gap="md">
          {(Object.entries(presets) as Array<[PresetName, (typeof presets)[PresetName]]>).map(([key, p]) => {
            const isActive = preset === key;
            return (
              <Card key={key} shadow={isActive}>
                <CardBody>
                  <VStack gap="sm">
                    <HStack align="center" gap="sm">
                      <Heading level={5}>{p.name}</Heading>
                      <Spacer />
                      {isActive && (
                        <Badge colorScheme="primary">
                          <HStack gap="xs" align="center"><Check size={10} /> Active</HStack>
                        </Badge>
                      )}
                    </HStack>
                    <Text tone="muted" size="sm">{p.description ?? '—'}</Text>
                    <Button
                      size="sm"
                      variant={isActive ? 'solid' : 'outline'}
                      onClick={() => onPresetChange(isActive ? 'system' : key)}
                    >
                      {isActive ? 'Reset to default' : `Apply ${p.name}`}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Section>
  );
};

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'pending' | 'inactive';
  createdAt: Date;
}

const SAMPLE_USERS: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'active', createdAt: new Date(2023, 1, 14) },
  { id: 2, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Admin', status: 'active', createdAt: new Date(2022, 8, 3) },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor', status: 'active', createdAt: new Date(2024, 0, 22) },
  { id: 4, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', status: 'pending', createdAt: new Date(2025, 5, 8) },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Viewer', status: 'active', createdAt: new Date(2024, 3, 17) },
  { id: 6, name: 'Donald Knuth', email: 'don@example.com', role: 'Viewer', status: 'inactive', createdAt: new Date(2021, 11, 30) },
  { id: 7, name: 'Edsger Dijkstra', email: 'edsger@example.com', role: 'Editor', status: 'active', createdAt: new Date(2023, 6, 4) },
  { id: 8, name: 'Barbara Liskov', email: 'barbara@example.com', role: 'Admin', status: 'active', createdAt: new Date(2024, 9, 11) },
  { id: 9, name: 'John Carmack', email: 'john@example.com', role: 'Viewer', status: 'pending', createdAt: new Date(2025, 2, 19) },
  { id: 10, name: 'Anders Hejlsberg', email: 'anders@example.com', role: 'Editor', status: 'active', createdAt: new Date(2023, 4, 25) },
  { id: 11, name: 'Brendan Eich', email: 'brendan@example.com', role: 'Admin', status: 'inactive', createdAt: new Date(2022, 2, 1) },
  { id: 12, name: 'Rich Hickey', email: 'rich@example.com', role: 'Viewer', status: 'active', createdAt: new Date(2024, 7, 14) },
];

const statusToScheme: Record<User['status'], 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
};

const DataGridSection = () => {
  const { t, formatDate } = useTranslation();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Array<string | number>>([]);

  const columns: DataGridColumn<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      cell: (row) => (
        <HStack gap="sm" align="center">
          <Avatar name={row.name} size="sm" />
          <VStack gap="none">
            <Text weight="medium" size="sm">{row.name}</Text>
            <Text tone="muted" size="xs">{row.email}</Text>
          </VStack>
        </HStack>
      ),
    },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      cell: (row) => (
        <Badge colorScheme={statusToScheme[row.status]}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      sortable: true,
      sortAccessor: (row) => row.createdAt,
      cell: (row) => formatDate(row.createdAt, { dateStyle: 'medium' }),
      align: 'right',
    },
  ];

  return (
    <Section title={t('sections.datagrid')}>
      <VStack gap="md">
        <Text tone="muted">
          Click any sortable header to cycle asc → desc → off. Selection, pagination, sticky header, and density are all
          built-in. {selected.length > 0 && <strong>{selected.length} selected.</strong>}
        </Text>
        <Card>
          <DataGrid<User>
            data={SAMPLE_USERS}
            columns={columns}
            rowKey={(r) => r.id}
            selectable="multiple"
            selected={selected}
            onSelectionChange={setSelected}
            defaultSort={{ key: 'name', direction: 'asc' }}
            striped
            hover
            density="comfortable"
            pagination={{ pageSize: 5, page, onPageChange: setPage }}
          />
        </Card>
      </VStack>
    </Section>
  );
};

const ResponsiveLayoutSection = () => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  return (
    <Section title={t('sections.responsive')}>
      <VStack gap="lg">
        <HStack gap="sm" align="center" wrap>
          <Text>Active breakpoint:</Text>
          <Badge colorScheme="primary">
            <code style={{ fontFamily: 'var(--mf-fonts-mono)' }}>{breakpoint}</code>
          </Badge>
          <Text tone="muted" size="sm">— resize the window to see layouts respond live.</Text>
        </HStack>

        <VStack gap="sm">
          <Heading level={5}>Responsive Grid</Heading>
          <Text tone="muted" size="sm">
            <code>{`columns={{ base: 1, sm: 2, md: 3, lg: 4 }}`}</code>
          </Text>
          <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
            {Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} bg="surfaceAlt" radius="md" p="md" style={{ textAlign: 'center' }}>
                <Text weight="medium">Tile {i + 1}</Text>
              </Box>
            ))}
          </Grid>
        </VStack>

        <VStack gap="sm">
          <Heading level={5}>Asymmetric Grid (GridItem)</Heading>
          <Text tone="muted" size="sm">
            <code>{`<GridItem colSpan={{ base: 1, md: 4 }}>`}</code> — hero spans full row on md+
          </Text>
          <Grid columns={{ base: 1, md: 4 }} gap="md">
            <GridItem colSpan={{ base: 1, md: 4 }}>
              <Box bg="surface" border radius="md" p="lg">
                <Heading level={6}>Hero — full width on md+</Heading>
                <Text tone="muted" size="sm">colSpan {`{ base: 1, md: 4 }`}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Box bg="surface" border radius="md" p="md"><Text>Card — half on md+</Text></Box>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <Box bg="surface" border radius="md" p="md"><Text>Card</Text></Box>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <Box bg="surface" border radius="md" p="md"><Text>Card</Text></Box>
            </GridItem>
          </Grid>
        </VStack>

        <VStack gap="sm">
          <Heading level={5}>Bootstrap-style Row + Col 12-grid</Heading>
          <Text tone="muted" size="sm">
            <code>{`<Col span={12} md={6} lg={4}>`}</code>
          </Text>
          <Row gutter="md">
            <Col span={12} md={6} lg={4}>
              <Box bg="surfaceAlt" radius="md" p="md"><Text>span 12 / md 6 / lg 4</Text></Box>
            </Col>
            <Col span={12} md={6} lg={4}>
              <Box bg="surfaceAlt" radius="md" p="md"><Text>span 12 / md 6 / lg 4</Text></Box>
            </Col>
            <Col span={12} md={12} lg={4}>
              <Box bg="surfaceAlt" radius="md" p="md"><Text>span 12 / md 12 / lg 4</Text></Box>
            </Col>
          </Row>
          <Text tone="muted" size="sm">Sidebar pattern with offset:</Text>
          <Row gutter="md">
            <Col span={12} md={4} lg={3}>
              <Box bg="surface" border radius="md" p="md"><Text weight="medium">Sidebar</Text></Box>
            </Col>
            <Col span={12} md={8} lg={9}>
              <Box bg="surface" border radius="md" p="md"><Text weight="medium">Main content area</Text></Box>
            </Col>
          </Row>
          <Text tone="muted" size="sm">Auto + fill — flex-style:</Text>
          <Row gutter="md" align="center">
            <Col span="auto">
              <Avatar name="Mercan UI" size="sm" />
            </Col>
            <Col span="fill">
              <Box bg="surfaceAlt" radius="md" p="sm"><Text>fill — grows to remaining space</Text></Box>
            </Col>
            <Col span="auto">
              <Button size="sm" leftIcon={<Plus size={14} />}>Action</Button>
            </Col>
          </Row>
        </VStack>

        <VStack gap="sm">
          <Heading level={5}>Stack with responsive direction</Heading>
          <Text tone="muted" size="sm">
            <code>{`direction={{ base: 'column', md: 'row' }}`}</code> — stacks vertically on mobile, horizontal on md+
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} gap="md">
            <Box bg="surfaceAlt" radius="md" p="md" style={{ flex: 1 }}><Text>Pane A</Text></Box>
            <Box bg="surfaceAlt" radius="md" p="md" style={{ flex: 1 }}><Text>Pane B</Text></Box>
            <Box bg="surfaceAlt" radius="md" p="md" style={{ flex: 1 }}><Text>Pane C</Text></Box>
          </Stack>
        </VStack>
      </VStack>
    </Section>
  );
};

interface SignupValues {
  fullName: string;
  email: string;
  country: string;
  interests: string[];
  birthDate: Date | null;
  agree: boolean;
}

const COUNTRIES = [
  { value: 'tr', label: 'Türkiye' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
];

const INTERESTS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'design', label: 'Design systems' },
  { value: 'a11y', label: 'Accessibility' },
  { value: 'i18n', label: 'i18n' },
  { value: 'testing', label: 'Testing' },
];

const signupResolver: Resolver<SignupValues> = (v) => {
  const errors: Partial<Record<keyof SignupValues, string>> = {};
  if (v.fullName.trim().length < 2) errors.fullName = 'At least 2 characters';
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = 'Invalid email';
  if (!v.country) errors.country = 'Please pick a country';
  if (v.interests.length === 0) errors.interests = 'Pick at least one';
  if (!v.birthDate) errors.birthDate = 'Required';
  else if (v.birthDate > new Date()) errors.birthDate = 'Cannot be in the future';
  if (!v.agree) errors.agree = 'You must accept the terms';
  return errors;
};

const ValidatedFormSection = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const form = useForm<SignupValues>({
    defaultValues: {
      fullName: '',
      email: '',
      country: '',
      interests: [],
      birthDate: null,
      agree: false,
    },
    resolver: signupResolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.show({
      title: 'Form submitted',
      message: `${values.fullName} — ${values.interests.length} interests`,
      status: 'success',
    });
    form.reset();
  });

  const fullName = form.getFieldState('fullName');
  const email = form.getFieldState('email');
  const country = form.getFieldState('country');
  const interests = form.getFieldState('interests');
  const birthDate = form.getFieldState('birthDate');
  const agree = form.getFieldState('agree');

  return (
    <Section title={t('sections.validatedForm')}>
      <VStack gap="md">
        <Text tone="muted">
          <code>useForm</code> hook ties values, errors, touched, and async submit together. Errors surface
          on submit, then revalidate live as you type.
        </Text>
        <Card>
          <CardBody>
            <form onSubmit={onSubmit} noValidate>
              <Grid columns={{ base: 1, md: 2 }} gap="md">
                <FormField
                  label="Full name"
                  required
                  errorText={fullName.touched ? fullName.error : undefined}
                >
                  <Input
                    placeholder="Ada Lovelace"
                    {...form.register('fullName')}
                  />
                </FormField>
                <FormField
                  label="Email"
                  required
                  errorText={email.touched ? email.error : undefined}
                >
                  <Input
                    type="email"
                    placeholder="ada@example.com"
                    {...form.register('email')}
                  />
                </FormField>
                <FormField
                  label="Country"
                  required
                  errorText={country.touched ? country.error : undefined}
                >
                  <Combobox
                    options={COUNTRIES}
                    value={form.values.country}
                    onChange={(v) => form.setValue('country', v)}
                    placeholder="Search countries…"
                    invalid={country.touched && !!country.error}
                  />
                </FormField>
                <FormField
                  label="Birth date"
                  required
                  errorText={birthDate.touched ? birthDate.error : undefined}
                >
                  <DatePicker
                    value={form.values.birthDate}
                    onChange={(d) => form.setValue('birthDate', d)}
                    maxDate={new Date()}
                    invalid={birthDate.touched && !!birthDate.error}
                  />
                </FormField>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <FormField
                    label="Interests"
                    required
                    errorText={interests.touched ? interests.error : undefined}
                  >
                    <MultiSelect
                      options={INTERESTS}
                      value={form.values.interests}
                      onChange={(v) => form.setValue('interests', v)}
                      placeholder="Pick a few…"
                    />
                  </FormField>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <Checkbox
                    checked={form.values.agree}
                    onChange={(e) => form.setValue('agree', e.target.checked)}
                    label="I accept the terms and conditions"
                  />
                  {agree.touched && agree.error && (
                    <Text tone="danger" size="sm">{agree.error}</Text>
                  )}
                </GridItem>
              </Grid>
              <HStack gap="sm" align="center" style={{ marginTop: 'var(--mf-spacing-lg)' }}>
                <Text tone="muted" size="sm">
                  isDirty: <code>{String(form.isDirty)}</code> · isValid: <code>{String(form.isValid)}</code>
                  {' '}· submitCount: <code>{form.submitCount}</code>
                </Text>
                <Spacer />
                <Button variant="ghost" type="button" onClick={() => form.reset()} disabled={!form.isDirty}>
                  Reset
                </Button>
                <Button type="submit" loading={form.isSubmitting} leftIcon={<Check size={16} />}>
                  Submit
                </Button>
              </HStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Section>
  );
};

export const App = () => {
  const [preset, setPreset] = useState<'system' | PresetName>('system');

  return (
    <MercanProvider
      defaultColorMode="light"
      locale="en"
      fallbackLocale="en"
      resources={resources}
      lightOverride={{
        radii: { md: '10px', lg: '14px' },
      }}
      brand={{ primary: '#006eb8ff', secondary: '#2d3142' }}
      darkBrand={{ primary: '#ff5a5f', secondary: '#2d3142' }}
      preset={preset === 'system' ? undefined : preset}
    >
      <TopBar preset={preset} onPresetChange={setPreset} />
      <Container size="xl">
        <Box py="xl">
          <VStack gap="md">
            <Heading level={1}>Mercan UI</Heading>
            <Text tone="muted" size="lg">
              A theme-aware, i18n-ready React component framework. Toggle the theme, language, or preset above —
              your choice persists across reloads.
            </Text>
          </VStack>
        </Box>
        <PresetsSection preset={preset} onPresetChange={setPreset} />
        <ResponsiveLayoutSection />
        <ValidatedFormSection />
        <DataGridSection />
        <ButtonsSection />
        <TypographySection />
        <FormsSection />
        <DisplaySection />
        <FeedbackSection />
        <NavigationSection />
        <ComposedSection />
        <Box py="2xl">
          <Text tone="muted" size="sm" align="center">
            Mercan React Framework — built with React + TypeScript.
          </Text>
        </Box>
      </Container>
    </MercanProvider>
  );
};
