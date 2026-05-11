import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useIsMounted, useLatest, useMount, useUnmount, useUpdate, useUpdateEffect,
} from '../core';
import { Button } from '../components/forms/Button';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';

const meta: Meta = {
  title: 'Hooks/Lifecycle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tiny lifecycle helpers. Wrappers around useEffect / useState that express common patterns more clearly.',
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

const MountChild = () => {
  const [msg, setMsg] = useState('mounting…');
  useMount(() => setMsg('mounted ✓'));
  useUnmount(() => console.log('Child unmounted'));
  return <Badge colorScheme="success">{msg}</Badge>;
};

export const UseMountUnmount: Story = {
  name: 'useMount / useUnmount',
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <Demo title="useMount(fn) / useUnmount(fn)" source="run once on mount / once on unmount (stable refs)">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={() => setShow((s) => !s)}>{show ? 'unmount' : 'mount'}</Button>
          {show && <MountChild />}
        </HStack>
        <Text tone="muted" size="sm">Open devtools console to see the unmount log.</Text>
      </Demo>
    );
  },
};

const UpdateEffectChild = ({ value }: { value: number }) => {
  const [log, setLog] = useState<string[]>([]);
  useUpdateEffect(() => {
    setLog((l) => [...l, `update ${value}`]);
  }, [value]);
  return <Code>{log.length === 0 ? '(skipped initial render)' : log.join(' → ')}</Code>;
};

export const UseUpdateEffect: Story = {
  name: 'useUpdateEffect',
  render: () => {
    const [n, setN] = useState(0);
    return (
      <Demo title="useUpdateEffect(fn, deps)" source="like useEffect, but skips the first render">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={() => setN((x) => x + 1)}>change deps</Button>
          <Badge>{n}</Badge>
        </HStack>
        <UpdateEffectChild value={n} />
      </Demo>
    );
  },
};

export const UseUpdate: Story = {
  name: 'useUpdate',
  render: () => {
    const update = useUpdate();
    const renderedAt = Date.now();
    return (
      <Demo title="useUpdate()" source="returns a stable function that forces a re-render">
        <Code>rendered at {new Date(renderedAt).toLocaleTimeString()}</Code>
        <Button size="sm" onClick={update}>force re-render</Button>
      </Demo>
    );
  },
};

export const UseIsMounted: Story = {
  name: 'useIsMounted',
  render: () => {
    const [data, setData] = useState<string | null>(null);
    const isMounted = useIsMounted();
    const fetchSlow = () => {
      setData(null);
      setTimeout(() => {
        if (isMounted()) setData('Loaded after 1s');
        else console.log('Component unmounted, skipping setState');
      }, 1000);
    };
    return (
      <Demo title="useIsMounted()" source="returns a getter that's true while the component is mounted">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={fetchSlow}>start 1s task</Button>
          <Badge>{data ?? '…'}</Badge>
        </HStack>
        <Text tone="muted" size="sm">Use this to guard async setState calls without leaking errors.</Text>
      </Demo>
    );
  },
};

const LatestChild = ({ count }: { count: number }) => {
  const latest = useLatest(count);
  const [snapshot, setSnapshot] = useState<number | null>(null);
  useEffect(() => {
    const id = setTimeout(() => setSnapshot(latest.current), 1500);
    return () => clearTimeout(id);
  }, [latest]);
  return (
    <Text tone="muted" size="sm">
      after 1.5s, snapshot read <Code>{String(snapshot)}</Code> from <Code>latest.current</Code>
    </Text>
  );
};

export const UseLatest: Story = {
  name: 'useLatest',
  render: () => {
    const [n, setN] = useState(0);
    return (
      <Demo title="useLatest(value)" source="ref that always points to the most recent value — for callbacks/timers">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={() => setN((x) => x + 1)}>+1</Button>
          <Badge>{n}</Badge>
        </HStack>
        <LatestChild key={n === 0 ? 'reset' : 'live'} count={n} />
      </Demo>
    );
  },
};
