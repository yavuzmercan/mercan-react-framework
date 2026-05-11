import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../components/forms/DatePicker';
import { Calendar } from '../components/forms/Calendar';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    placeholder: 'Select date',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState<Date | null>(null);
    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker {...args} value={v} onChange={setV} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  name: 'With min/max bounds',
  render: () => {
    const today = new Date();
    const inAWeek = new Date(today);
    inAWeek.setDate(today.getDate() + 7);
    const aWeekAgo = new Date(today);
    aWeekAgo.setDate(today.getDate() - 7);
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField
          label="Within ±7 days"
          helpText="minDate / maxDate disable out-of-range days in the popover."
        >
          <DatePicker minDate={aWeekAgo} maxDate={inAWeek} />
        </FormField>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 320 }}>
      <FormField label="Default">
        <DatePicker />
      </FormField>
      <FormField label="With value">
        <DatePicker defaultValue={new Date(2025, 0, 15)} />
      </FormField>
      <FormField label="Invalid" errorText="Required">
        <DatePicker invalid />
      </FormField>
      <FormField label="Disabled">
        <DatePicker disabled defaultValue={new Date(2025, 0, 15)} />
      </FormField>
    </VStack>
  ),
};

export const StandaloneCalendar: StoryObj<typeof Calendar> = {
  name: 'Calendar (inline)',
  render: () => {
    const [v, setV] = useState<Date | null>(new Date());
    return <Calendar value={v} onChange={setV} />;
  },
};
