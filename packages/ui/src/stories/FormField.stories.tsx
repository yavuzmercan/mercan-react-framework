import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../components/forms/FormField';
import { FormGroup } from '../components/forms/FormGroup';
import { Input } from '../components/forms/Input';
import { TextArea } from '../components/forms/TextArea';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A label + control + help/error wrapper. Auto-generates an `id` for the control, wires `aria-describedby` to help/error nodes, and propagates `invalid`/`aria-invalid`. Accepts a single child.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Playground: Story = {
  args: { label: 'Email', helpText: 'We never share your email.' },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <FormField {...args}>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 360 }}>
      <FormField label="Just a label">
        <Input />
      </FormField>
      <FormField label="With help" helpText="Anything you want here.">
        <Input />
      </FormField>
      <FormField label="Required" required>
        <Input />
      </FormField>
      <FormField label="With error" errorText="This field is required.">
        <Input />
      </FormField>
    </VStack>
  ),
};

export const InsideFormGroup: Story = {
  name: 'Inside FormGroup',
  render: () => (
    <FormGroup style={{ maxWidth: 360 }}>
      <FormField label="Name" required>
        <Input placeholder="Ada Lovelace" />
      </FormField>
      <FormField label="Email" required helpText="We'll send a confirmation link.">
        <Input type="email" placeholder="ada@example.com" />
      </FormField>
      <FormField label="Bio">
        <TextArea placeholder="Tell us about yourself…" rows={3} />
      </FormField>
    </FormGroup>
  ),
};
