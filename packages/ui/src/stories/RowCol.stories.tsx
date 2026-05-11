import type { Meta, StoryObj } from '@storybook/react';
import { Row, Col } from '../components/layout/RowCol';
import { Box } from '../components/layout/Box';
import { Avatar } from '../components/display/Avatar';
import { Button } from '../components/forms/Button';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';
import { Plus } from '../icons';

const meta: Meta<typeof Row> = {
  title: 'Layout/RowCol',
  component: Row,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bootstrap-style 12-column grid. `<Row gutter>` sets the spacing; each `<Col>` accepts a base `span` (1–12, "auto", or "fill") plus per-breakpoint overrides (sm/md/lg/xl/2xl), `offset`, and `order`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Row>;

const Tile = ({ children }: { children: React.ReactNode }) => (
  <Box bg="surfaceAlt" radius="md" p="md" style={{ textAlign: 'center' }}>
    <Text weight="medium">{children}</Text>
  </Box>
);

export const ResponsiveSpans: Story = {
  render: () => (
    <Row gutter="md">
      <Col span={12} md={6} lg={4}><Tile>span 12 / md 6 / lg 4</Tile></Col>
      <Col span={12} md={6} lg={4}><Tile>span 12 / md 6 / lg 4</Tile></Col>
      <Col span={12} md={12} lg={4}><Tile>span 12 / md 12 / lg 4</Tile></Col>
    </Row>
  ),
};

export const Sidebar: Story = {
  render: () => (
    <Row gutter="md">
      <Col span={12} md={4} lg={3}><Tile>Sidebar</Tile></Col>
      <Col span={12} md={8} lg={9}><Tile>Main</Tile></Col>
    </Row>
  ),
};

export const AutoFill: Story = {
  name: 'auto + fill',
  render: () => (
    <Row gutter="md" align="center">
      <Col span="auto"><Avatar name="MU" size="sm" /></Col>
      <Col span="fill"><Tile>fill — grows to remaining space</Tile></Col>
      <Col span="auto">
        <Button size="sm" leftIcon={<Plus size={14} />}>Action</Button>
      </Col>
    </Row>
  ),
};

export const OffsetAndOrder: Story = {
  render: () => (
    <VStack gap="md">
      <Row gutter="md">
        <Col span={6} offset={3}><Tile>span 6, offset 3</Tile></Col>
      </Row>
      <Row gutter="md">
        <Col span={4} order={3}><Tile>order 3 (rendered first)</Tile></Col>
        <Col span={4} order={1}><Tile>order 1</Tile></Col>
        <Col span={4} order={2}><Tile>order 2</Tile></Col>
      </Row>
    </VStack>
  ),
};
