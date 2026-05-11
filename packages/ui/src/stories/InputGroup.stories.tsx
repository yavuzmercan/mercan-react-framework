import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, InputAddon } from '../components/forms/InputGroup';
import { Input } from '../components/forms/Input';
import { Button } from '../components/forms/Button';
import { VStack } from '../components/layout/Stack';
import { FormField } from '../components/forms/FormField';

const meta: Meta<typeof InputGroup> = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Visually joins an `Input` with prefix/suffix `InputAddon` elements (currency symbols, units, dropdowns, buttons).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Variants: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 360 }}>
      <FormField label="Price">
        <InputGroup>
          <InputAddon>$</InputAddon>
          <Input placeholder="0.00" />
          <InputAddon>USD</InputAddon>
        </InputGroup>
      </FormField>
      <FormField label="Website">
        <InputGroup>
          <InputAddon>https://</InputAddon>
          <Input placeholder="example.com" />
        </InputGroup>
      </FormField>
      <FormField label="Search">
        <InputGroup>
          <Input placeholder="Find anything…" />
          <Button>Go</Button>
        </InputGroup>
      </FormField>
    </VStack>
  ),
};
