import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '../components/forms/Radio';
import { Stack } from '../components/layout/Stack';

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: () => {
    const [v, setV] = useState('admin');
    return (
      <RadioGroup name="role" value={v} onChange={setV}>
        <Stack direction="row" gap="md">
          <Radio value="admin" label="Admin" />
          <Radio value="editor" label="Editor" />
          <Radio value="viewer" label="Viewer" />
        </Stack>
      </RadioGroup>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [v, setV] = useState('email');
    return (
      <RadioGroup name="contact" value={v} onChange={setV}>
        <Stack direction="column" gap="sm">
          <Radio value="email" label="Email me" />
          <Radio value="sms" label="Send me an SMS" />
          <Radio value="phone" label="Call me" />
          <Radio value="none" label="Don't contact me" disabled />
        </Stack>
      </RadioGroup>
    );
  },
};
