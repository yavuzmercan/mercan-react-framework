import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingOverlay } from '../components/feedback/LoadingOverlay';
import { Button } from '../components/forms/Button';
import { Card, CardBody } from '../components/display/Card';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    spinnerSize: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: { visible: true, message: 'Loading…', spinnerSize: 'lg' },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Local: Story = {
  render: () => {
    const [busy, setBusy] = useState(false);
    return (
      <Card style={{ position: 'relative', minHeight: 200, maxWidth: 360 }}>
        <CardBody>
          <Text>Click below to simulate a 2s async load. The overlay covers the parent card.</Text>
          <Button
            style={{ marginTop: 12 }}
            onClick={() => {
              setBusy(true);
              setTimeout(() => setBusy(false), 2000);
            }}
          >
            Run task
          </Button>
        </CardBody>
        <LoadingOverlay visible={busy} message="Working…" />
      </Card>
    );
  },
};
