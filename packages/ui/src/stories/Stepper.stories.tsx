import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../components/display/Stepper';
import { Button } from '../components/forms/Button';
import { HStack, VStack } from '../components/layout/Stack';
import { Spacer } from '../components/layout/Spacer';

const STEPS = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Billing' },
  { label: 'Confirm' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Display/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { steps: STEPS, active: 1 },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <VStack gap="md">
        <Stepper steps={STEPS} active={active} />
        <HStack gap="sm">
          <Button variant="outline" disabled={active === 0} onClick={() => setActive((i) => i - 1)}>
            Back
          </Button>
          <Spacer />
          <Button disabled={active === STEPS.length - 1} onClick={() => setActive((i) => i + 1)}>
            Next
          </Button>
        </HStack>
      </VStack>
    );
  },
};
