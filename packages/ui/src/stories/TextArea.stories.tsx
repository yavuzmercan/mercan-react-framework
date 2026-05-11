import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../components/forms/TextArea';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof TextArea> = {
  title: 'Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: { placeholder: 'Tell us about yourself…', rows: 4 },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 480 }}>
      <FormField label="Default">
        <TextArea placeholder="Type something…" />
      </FormField>
      <FormField label="With value">
        <TextArea defaultValue="Pre-filled content for editing." />
      </FormField>
      <FormField label="Invalid" errorText="Required">
        <TextArea invalid />
      </FormField>
      <FormField label="Disabled">
        <TextArea disabled defaultValue="Read-only here" />
      </FormField>
    </VStack>
  ),
};
