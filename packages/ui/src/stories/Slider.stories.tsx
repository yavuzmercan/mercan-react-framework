import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/forms/Slider';
import { FormField } from '../components/forms/FormField';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { min: 0, max: 100, defaultValue: 40 },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState(40);
    return (
      <FormField label={`Volume: ${v}`}>
        <Slider value={v} min={0} max={100} onChange={(e) => setV(Number(e.target.value))} />
      </FormField>
    );
  },
};

export const Stepped: Story = {
  render: () => (
    <FormField label="Step 10" helpText="step={10}">
      <Slider min={0} max={100} step={10} defaultValue={50} />
    </FormField>
  ),
};
