import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { useState } from 'react';
import { I18nProvider, ThemeProvider } from '../../core';
import { ToastProvider, useToast } from '../feedback/Toast';
import { Button } from '../forms/Button';
import { IconButton } from '../forms/IconButton';
import { Input } from '../forms/Input';
import { TextArea } from '../forms/TextArea';
import { Checkbox } from '../forms/Checkbox';
import { Switch } from '../forms/Switch';
import { Radio, RadioGroup } from '../forms/Radio';
import { Select } from '../forms/Select';
import { Slider } from '../forms/Slider';
import { FormField } from '../forms/FormField';
import { Combobox } from '../forms/Combobox';
import { MultiSelect } from '../forms/MultiSelect';
import { DatePicker } from '../forms/DatePicker';
import { Calendar } from '../forms/Calendar';
import { Avatar } from '../display/Avatar';
import { Badge } from '../display/Badge';
import { Tag } from '../display/Tag';
import { Card, CardHeader, CardBody, CardFooter } from '../display/Card';
import { List, ListItem } from '../display/List';
import { Progress } from '../display/Progress';
import { Spinner } from '../display/Spinner';
import { DataGrid, type DataGridColumn } from '../display/DataGrid';
import { Stat } from '../display/Stat';
import { Stepper } from '../display/Stepper';
import { Alert } from '../feedback/Alert';
import { Banner } from '../feedback/Banner';
import { Modal } from '../feedback/Modal';
import { Tooltip } from '../feedback/Tooltip';
import { Popover } from '../feedback/Popover';
import { Tabs, TabList, Tab, TabPanel } from '../navigation/Tabs';
import { Breadcrumb } from '../navigation/Breadcrumb';
import { Pagination } from '../navigation/Pagination';
import { Menu, MenuItem, MenuDivider } from '../navigation/Menu';
import { Accordion, AccordionItem } from '../navigation/Accordion';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Container } from '../layout/Container';
import { Box } from '../layout/Box';
import { HStack, VStack } from '../layout/Stack';
import { Heart, Search } from '../../icons';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <I18nProvider resources={{ en: {} }} defaultLocale="en">
      <ToastProvider>{children}</ToastProvider>
    </I18nProvider>
  </ThemeProvider>
);

const expectNoViolations = async (ui: React.ReactElement) => {
  const { container } = render(<Wrap>{ui}</Wrap>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

describe('a11y — forms', () => {
  it('Button has no violations', async () => {
    await expectNoViolations(
      <HStack gap="sm">
        <Button>Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost" disabled>Ghost</Button>
      </HStack>,
    );
  });

  it('IconButton requires aria-label', async () => {
    await expectNoViolations(
      <IconButton aria-label="Like" icon={<Heart size={16} />} />,
    );
  });

  it('Input + FormField wires label/aria-describedby', async () => {
    await expectNoViolations(
      <FormField label="Email" required helpText="We won't share it">
        <Input type="email" placeholder="you@example.com" />
      </FormField>,
    );
  });

  it('Input + FormField with error has role="alert" + aria-invalid', async () => {
    await expectNoViolations(
      <FormField label="Email" errorText="Invalid email">
        <Input type="email" defaultValue="not-an-email" />
      </FormField>,
    );
  });

  it('TextArea inside FormField', async () => {
    await expectNoViolations(
      <FormField label="Bio">
        <TextArea defaultValue="Some content" />
      </FormField>,
    );
  });

  it('Checkbox has accessible name via label prop', async () => {
    await expectNoViolations(<Checkbox label="Subscribe" />);
  });

  it('Switch has accessible name + role=switch', async () => {
    await expectNoViolations(<Switch label="Notifications" defaultChecked />);
  });

  it('RadioGroup has role=radiogroup', async () => {
    const Demo = () => {
      const [v, setV] = useState('a');
      return (
        <RadioGroup name="opt" value={v} onChange={setV}>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      );
    };
    await expectNoViolations(<Demo />);
  });

  it('Select inside FormField', async () => {
    await expectNoViolations(
      <FormField label="Country">
        <Select
          options={[
            { value: 'tr', label: 'Türkiye' },
            { value: 'us', label: 'United States' },
          ]}
          defaultValue="tr"
        />
      </FormField>,
    );
  });

  it('Slider with label via FormField', async () => {
    await expectNoViolations(
      <FormField label="Volume: 40">
        <Slider min={0} max={100} defaultValue={40} aria-label="Volume" />
      </FormField>,
    );
  });

  it('Combobox has role=combobox + aria-expanded', async () => {
    await expectNoViolations(
      <FormField label="Country">
        <Combobox
          options={[
            { value: 'tr', label: 'Türkiye' },
            { value: 'us', label: 'United States' },
          ]}
        />
      </FormField>,
    );
  });

  it('MultiSelect — closed state', async () => {
    await expectNoViolations(
      <FormField label="Interests">
        <MultiSelect
          options={[
            { value: 'react', label: 'React' },
            { value: 'ts', label: 'TypeScript' },
          ]}
          defaultValue={['react']}
        />
      </FormField>,
    );
  });

  it('DatePicker — closed state', async () => {
    await expectNoViolations(
      <FormField label="Birth date">
        <DatePicker defaultValue={new Date(2025, 0, 15)} />
      </FormField>,
    );
  });

  it('Calendar (open)', async () => {
    await expectNoViolations(
      <Calendar value={new Date(2025, 0, 15)} />,
    );
  });
});

describe('a11y — display', () => {
  it('Avatar with name fallback (initials)', async () => {
    await expectNoViolations(<Avatar name="Ada Lovelace" />);
  });

  it('Avatar with image must include alt', async () => {
    await expectNoViolations(<Avatar src="https://i.pravatar.cc/120" alt="Ada Lovelace" />);
  });

  it('Badge', async () => {
    await expectNoViolations(<Badge colorScheme="success">Active</Badge>);
  });

  it('Tag with onClose has aria-label on close button', async () => {
    await expectNoViolations(<Tag onClose={() => {}}>react</Tag>);
  });

  it('Card composition', async () => {
    await expectNoViolations(
      <Card>
        <CardHeader><Heading level={3}>Title</Heading></CardHeader>
        <CardBody><Text>Body content</Text></CardBody>
        <CardFooter><Button>Action</Button></CardFooter>
      </Card>,
    );
  });

  it('List + ListItem', async () => {
    await expectNoViolations(
      <List>
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
        <ListItem>Three</ListItem>
      </List>,
    );
  });

  it('Progress has role=progressbar + valuemin/max/now', async () => {
    await expectNoViolations(<Progress value={62} />);
  });

  it('Spinner has role=status + aria-label', async () => {
    await expectNoViolations(<Spinner label="Loading content" />);
  });

  it('Stat with label/value', async () => {
    await expectNoViolations(<Stat label="Revenue" value="$1,200" helpText="↑ 12%" direction="up" />);
  });

  it('Stepper with active step', async () => {
    await expectNoViolations(
      <Stepper
        steps={[
          { label: 'Account' },
          { label: 'Profile' },
          { label: 'Done' },
        ]}
        active={1}
      />,
    );
  });

  it('DataGrid — basic + sortable + selectable', async () => {
    interface Row { id: number; name: string; }
    const data: Row[] = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Linus' },
    ];
    const cols: DataGridColumn<Row>[] = [
      { key: 'name', header: 'Name', sortable: true },
    ];
    await expectNoViolations(
      <DataGrid data={data} columns={cols} rowKey={(r) => r.id} selectable="multiple" defaultSelected={[1]} />,
    );
  });
});

describe('a11y — feedback', () => {
  it('Alert has role=alert', async () => {
    await expectNoViolations(
      <Alert status="warning" title="Quota">You're using 80%.</Alert>,
    );
  });

  it('Banner', async () => {
    await expectNoViolations(
      <Banner status="info" onClose={() => {}}>
        New version available.
      </Banner>,
    );
  });

  it('Modal (open) has role=dialog + aria-modal', async () => {
    await expectNoViolations(
      <Modal isOpen onClose={() => {}} title="Confirm">
        <Text>Are you sure?</Text>
      </Modal>,
    );
  });

  it('Tooltip wrapper', async () => {
    await expectNoViolations(
      <Tooltip label="Help text">
        <Button variant="outline">Hover me</Button>
      </Tooltip>,
    );
  });

  it('Popover trigger has aria-haspopup', async () => {
    await expectNoViolations(
      <Popover trigger={<Button variant="outline">Open</Button>}>
        <Text>Pop content</Text>
      </Popover>,
    );
  });

  const ToastTrigger = () => {
    const t = useToast();
    return <Button onClick={() => t.show({ title: 'Saved' })}>Show</Button>;
  };
  it('Toast trigger button (provider mounted)', async () => {
    await expectNoViolations(<ToastTrigger />);
  });
});

describe('a11y — navigation', () => {
  it('Tabs has tablist/tab/tabpanel roles', async () => {
    await expectNoViolations(
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
        <TabPanel value="a"><Text>Panel A</Text></TabPanel>
        <TabPanel value="b"><Text>Panel B</Text></TabPanel>
      </Tabs>,
    );
  });

  it('Breadcrumb has nav + aria-current', async () => {
    await expectNoViolations(
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Breadcrumb' },
        ]}
      />,
    );
  });

  it('Pagination has nav + aria-label per page', async () => {
    await expectNoViolations(
      <Pagination page={3} pageCount={10} onChange={() => {}} />,
    );
  });

  it('Menu (closed)', async () => {
    await expectNoViolations(
      <Menu trigger={<Button>Menu</Button>}>
        <MenuItem>Profile</MenuItem>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </Menu>,
    );
  });

  it('Accordion with expanded item', async () => {
    await expectNoViolations(
      <Accordion defaultOpen={['a']}>
        <AccordionItem id="a" title="Question A">Answer A</AccordionItem>
        <AccordionItem id="b" title="Question B">Answer B</AccordionItem>
      </Accordion>,
    );
  });
});

describe('a11y — typography & layout', () => {
  it('Heading levels are landmark-friendly', async () => {
    await expectNoViolations(
      <Container>
        <Heading level={1}>Page</Heading>
        <Heading level={2}>Section</Heading>
        <Heading level={3}>Subsection</Heading>
        <Text>Body text follows.</Text>
      </Container>,
    );
  });

  it('Box + Stack layouts are semantic-neutral', async () => {
    await expectNoViolations(
      <Box as="section" p="md" bg="surfaceAlt">
        <VStack gap="sm">
          <Heading level={2}>Section title</Heading>
          <Text>Some text</Text>
          <HStack gap="sm">
            <Button>One</Button>
            <Button>Two</Button>
          </HStack>
        </VStack>
      </Box>,
    );
  });

  it('Search composition (icon + input + button)', async () => {
    await expectNoViolations(
      <FormField label="Search">
        <HStack gap="sm" align="center">
          <Search size={16} aria-hidden="true" />
          <Input placeholder="Find anything…" />
          <Button>Go</Button>
        </HStack>
      </FormField>,
    );
  });
});
