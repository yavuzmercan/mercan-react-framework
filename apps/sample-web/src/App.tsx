import { useState } from 'react';
import {
  MercanProvider,
  Container,
  HStack,
  VStack,
  Stack,
  Grid,
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
  useToast,
} from '@yavuzmercan/ui/components';
import { useColorMode, useTranslation } from '@yavuzmercan/ui';
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

const TopBar = () => {
  const { t, locale, setLocale } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="header"
      px="xl"
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
        <HStack align="center" gap="md">
          <Heading level={4}>{t('app.title')}</Heading>
          <Spacer />
          <Select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'tr', label: 'Türkçe' },
            ]}
            style={{ width: 140 }}
          />
          <Button
            variant="outline"
            colorScheme="secondary"
            onClick={toggleColorMode}
            leftIcon={colorMode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          >
            {colorMode === 'light' ? t('nav.light') : t('nav.dark')}
          </Button>
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

export const App = () => {
  return (
    <MercanProvider
      defaultColorMode="light"
      locale="en"
      fallbackLocale="en"
      resources={resources}
      lightOverride={{
        radii: { md: '10px', lg: '14px' },
      }}
      brand={{primary: '#006eb8ff', secondary: '#2d3142'}}
      darkBrand={{primary: '#ff5a5f', secondary: '#2d3142'}}
    >
      <TopBar />
      <Container size="xl">
        <Box py="xl">
          <VStack gap="md">
            <Heading level={1}>Mercan UI</Heading>
            <Text tone="muted" size="lg">
              A theme-aware, i18n-ready React component framework. Toggle the theme and language above.
            </Text>
          </VStack>
        </Box>
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
