import type { Meta, StoryObj } from '@storybook/react';
import { useLocalStorage, useSessionStorage, useCookie } from '../core';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';
import { FormField } from '../components/forms/FormField';

const meta: Meta = {
  title: 'Hooks/Storage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Persisted state hooks. Each one mirrors the `useState` API but writes to a backing store. Try editing the values, then refresh the iframe — they survive.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Demo = ({ title, source, children }: { title: string; source: string; children: React.ReactNode }) => (
  <VStack gap="sm" style={{ maxWidth: 520 }}>
    <HStack gap="sm" align="center">
      <Code>{title}</Code>
      <Text tone="muted" size="sm">{source}</Text>
    </HStack>
    {children}
  </VStack>
);

export const UseLocalStorage: Story = {
  name: 'useLocalStorage',
  render: () => {
    const [name, setName, remove] = useLocalStorage('mf-demo-name', 'Ada');
    return (
      <Demo title="useLocalStorage(key, initial)" source="JSON-serialized + cross-tab sync via storage event">
        <FormField label="Stored name (refresh to verify persistence)">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <HStack gap="sm" align="center">
          <Text>raw value:</Text>
          <Code>{JSON.stringify(name)}</Code>
          <Button size="sm" variant="ghost" onClick={remove}>remove</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseSessionStorage: Story = {
  name: 'useSessionStorage',
  render: () => {
    const [count, setCount, remove] = useSessionStorage('mf-demo-count', 0);
    return (
      <Demo title="useSessionStorage(key, initial)" source="cleared when the tab closes">
        <HStack gap="sm" align="center">
          <Badge>{count}</Badge>
          <Button size="sm" onClick={() => setCount((n) => n + 1)}>+1</Button>
          <Button size="sm" variant="ghost" onClick={remove}>reset</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseCookie: Story = {
  name: 'useCookie',
  render: () => {
    const [value, setValue, remove] = useCookie('mf-demo-cookie', 'hello');
    return (
      <Demo title="useCookie(name, default)" source="document.cookie wrapper with options (expires/path/secure/...)">
        <FormField label="Cookie value">
          <Input value={value ?? ''} onChange={(e) => setValue(e.target.value, { expires: 7 })} placeholder="empty" />
        </FormField>
        <HStack gap="sm" align="center">
          <Text>document.cookie value:</Text>
          <Code>{value ?? '(none)'}</Code>
          <Button size="sm" variant="ghost" onClick={remove}>delete</Button>
        </HStack>
      </Demo>
    );
  },
};
