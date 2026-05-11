import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '../components/forms/Combobox';
import { MultiSelect } from '../components/forms/MultiSelect';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const COUNTRIES = [
  { value: 'tr', label: 'Türkiye' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'cn', label: 'China' },
];

const TAGS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'design', label: 'Design systems' },
  { value: 'a11y', label: 'Accessibility' },
  { value: 'i18n', label: 'i18n' },
  { value: 'testing', label: 'Testing' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    options: COUNTRIES,
    placeholder: 'Search countries…',
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <div style={{ maxWidth: 320 }}>
        <Combobox {...args} value={v} onChange={setV} />
      </div>
    );
  },
};

export const InsideFormField: Story = {
  name: 'Inside FormField',
  render: () => (
    <VStack gap="md" style={{ maxWidth: 360 }}>
      <FormField label="Country" required helpText="Start typing to filter.">
        <Combobox options={COUNTRIES} placeholder="Search countries…" />
      </FormField>
      <FormField label="Country" errorText="Please pick a country">
        <Combobox options={COUNTRIES} invalid placeholder="Search countries…" />
      </FormField>
    </VStack>
  ),
};

export const MultiSelectStory: StoryObj<typeof MultiSelect> = {
  name: 'MultiSelect',
  render: () => {
    const [v, setV] = useState<string[]>(['react', 'typescript']);
    return (
      <div style={{ maxWidth: 480 }}>
        <FormField label="Interests" helpText="Backspace removes the last tag.">
          <MultiSelect options={TAGS} value={v} onChange={setV} placeholder="Pick a few…" />
        </FormField>
      </div>
    );
  },
};
