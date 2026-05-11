import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/display/Code';
import { CodeBlock } from '../components/display/CodeBlock';
import { CopyButton } from '../components/display/CopyButton';
import { VStack, HStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta = {
  title: 'Display/Code',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const SAMPLE = `import { Button } from '@yavuzmercan/ui';

export const Demo = () => <Button>Click me</Button>;`;

export const Inline: Story = {
  render: () => (
    <Text>
      Use <Code>npm install @yavuzmercan/ui</Code> to add the package, then import{' '}
      <Code>Button</Code> from <Code>@yavuzmercan/ui</Code>.
    </Text>
  ),
};

export const BlockCode: Story = {
  name: 'Code (block)',
  render: () => (
    <Code block>{SAMPLE}</Code>
  ),
};

export const CodeBlockWithLanguage: Story = {
  name: 'CodeBlock (with header + copy)',
  render: () => <CodeBlock code={SAMPLE} language="tsx" />,
};

export const CopyOnly: Story = {
  name: 'CopyButton standalone',
  render: () => (
    <VStack gap="md" align="start">
      <CopyButton value="hello-world" />
      <CopyButton value="custom render">
        {(copied) => (
          <HStack gap="xs" align="center">
            {copied ? '✓ Copied!' : 'Copy custom text'}
          </HStack>
        )}
      </CopyButton>
    </VStack>
  ),
};
