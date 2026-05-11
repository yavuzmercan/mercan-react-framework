import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '../components/forms/FileInput';
import { VStack } from '../components/layout/Stack';
import { FormField } from '../components/forms/FormField';

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
  },
  args: { hint: 'Click or drop files here' },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 480 }}>
      <FormField label="Single image" helpText="accept='image/*'">
        <FileInput accept="image/*" />
      </FormField>
      <FormField label="Multiple PDFs">
        <FileInput accept="application/pdf" multiple hint="Drop one or more PDFs" />
      </FormField>
      <FormField label="Disabled">
        <FileInput disabled />
      </FormField>
    </VStack>
  ),
};
