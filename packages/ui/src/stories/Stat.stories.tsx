import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from '../components/display/Stat';
import { Card, CardBody } from '../components/display/Card';
import { Grid } from '../components/layout/Grid';

const meta: Meta<typeof Stat> = {
  title: 'Display/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'inline-radio', options: ['up', 'down', undefined] },
  },
  args: { label: 'Total revenue', value: '$48,210', helpText: '12% from last month', direction: 'up' },
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Playground: Story = {
  render: (args) => (
    <Card style={{ maxWidth: 240 }}>
      <CardBody><Stat {...args} /></CardBody>
    </Card>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="md">
      <Card><CardBody><Stat label="Revenue" value="$48,210" helpText="12% MoM" direction="up" /></CardBody></Card>
      <Card><CardBody><Stat label="Active users" value="3,421" helpText="3% WoW" direction="up" /></CardBody></Card>
      <Card><CardBody><Stat label="Churn" value="2.4%" helpText="0.4 pp" direction="down" /></CardBody></Card>
      <Card><CardBody><Stat label="Open tickets" value="17" helpText="No change" /></CardBody></Card>
    </Grid>
  ),
};
