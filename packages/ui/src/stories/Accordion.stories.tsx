import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from '../components/navigation/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  args: { defaultOpen: ['a'] },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="a" title="Can I customize the theme?">
        Pass a `lightOverride` or `darkOverride` to <code>MercanProvider</code> with any subset of tokens.
      </AccordionItem>
      <AccordionItem id="b" title="How does i18n work?">
        Provide `resources` keyed by locale; use <code>useTranslation()</code> in your components.
      </AccordionItem>
      <AccordionItem id="c" title="Is it accessible?">
        Components ship with sensible roles, focus rings, and keyboard handlers.
      </AccordionItem>
    </Accordion>
  ),
};

export const AllowMultiple: Story = {
  args: { allowMultiple: true, defaultOpen: ['a', 'b'] },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="a" title="Section A">First panel</AccordionItem>
      <AccordionItem id="b" title="Section B">Second panel</AccordionItem>
      <AccordionItem id="c" title="Section C">Third panel</AccordionItem>
    </Accordion>
  ),
};
