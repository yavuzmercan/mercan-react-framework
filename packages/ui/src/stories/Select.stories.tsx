import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/forms/Select';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const COUNTRIES = [
  { value: 'tr', label: 'Türkiye' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    options: COUNTRIES,
    placeholder: 'Select a country',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <VStack gap="sm">
      <Select size="sm" options={COUNTRIES} placeholder="Small" />
      <Select size="md" options={COUNTRIES} placeholder="Medium" />
      <Select size="lg" options={COUNTRIES} placeholder="Large" />
    </VStack>
  ),
};

export const InsideFormField: Story = {
  name: 'Inside FormField',
  render: () => (
    <VStack gap="md" style={{ maxWidth: 320 }}>
      <FormField label="Country" required helpText="Native HTML <select> under the hood.">
        <Select options={COUNTRIES} placeholder="Pick one" />
      </FormField>
      <FormField label="Country" errorText="Required">
        <Select options={COUNTRIES} placeholder="Pick one" invalid />
      </FormField>
    </VStack>
  ),
};
