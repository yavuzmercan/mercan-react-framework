import { useState } from 'react';
import {
  Tabs, TabList, Tab, TabPanel, Breadcrumb, Pagination, Menu, MenuItem, MenuDivider,
  Drawer, Accordion, AccordionItem, Button, Heading, Text, VStack, HStack,
} from '@yavuzmercan/ui';
import { Story } from '../Story';

export const TabsPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Tabs</Heading>
    <Story title="Basic" code={`<Tabs defaultValue="a">\n  <TabList><Tab value="a">A</Tab></TabList>\n  <TabPanel value="a">…</TabPanel>\n</Tabs>`}>
      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="usage">Usage</Tab>
          <Tab value="api">API</Tab>
        </TabList>
        <TabPanel value="overview"><Text>Overview content.</Text></TabPanel>
        <TabPanel value="usage"><Text>Usage content.</Text></TabPanel>
        <TabPanel value="api"><Text>API content.</Text></TabPanel>
      </Tabs>
    </Story>
  </VStack>
);

export const BreadcrumbPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Breadcrumb</Heading>
    <Story title="Items" code={`<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Settings' }]} />`}>
      <Breadcrumb items={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Navigation' },
      ]} />
    </Story>
  </VStack>
);

export const PaginationPage = () => {
  const [page, setPage] = useState(3);
  return (
    <VStack gap="lg">
      <Heading level={1}>Pagination</Heading>
      <Story title="Controlled" code={`<Pagination page={page} pageCount={12} onChange={setPage} />`}>
        <Pagination page={page} pageCount={12} onChange={setPage} />
      </Story>
    </VStack>
  );
};

export const MenuPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Menu</Heading>
    <Story title="With trigger" code={`<Menu trigger={<Button>Menu ▾</Button>}>\n  <MenuItem>Profile</MenuItem>\n</Menu>`}>
      <Menu trigger={<Button variant="outline">Menu ▾</Button>}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Story>
  </VStack>
);

export const DrawerPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="lg">
      <Heading level={1}>Drawer</Heading>
      <Story title="Side panel" code={`<Drawer isOpen={open} onClose={() => setOpen(false)} side="right" />`}>
        <HStack gap="sm">
          <Button onClick={() => setOpen(true)}>Open right drawer</Button>
        </HStack>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="Settings">
          <Text>Drawer content goes here. Press Esc or click outside to close.</Text>
        </Drawer>
      </Story>
    </VStack>
  );
};

export const AccordionPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Accordion</Heading>
    <Story title="Single open" code={`<Accordion defaultOpen={['a']}>\n  <AccordionItem id="a" title="…">…</AccordionItem>\n</Accordion>`}>
      <Accordion defaultOpen={['a']}>
        <AccordionItem id="a" title="What is Mercan?">A theme-aware React UI framework.</AccordionItem>
        <AccordionItem id="b" title="Is it accessible?">Components ship with sensible roles and keyboard handlers.</AccordionItem>
        <AccordionItem id="c" title="Can I customize it?">Yes — via brand prop, token override, or CSS variables.</AccordionItem>
      </Accordion>
    </Story>
    <Story title="Multiple open" code={`<Accordion allowMultiple>…</Accordion>`}>
      <Accordion allowMultiple defaultOpen={['x', 'y']}>
        <AccordionItem id="x" title="First">First panel.</AccordionItem>
        <AccordionItem id="y" title="Second">Second panel.</AccordionItem>
        <AccordionItem id="z" title="Third">Third panel.</AccordionItem>
      </Accordion>
    </Story>
  </VStack>
);
