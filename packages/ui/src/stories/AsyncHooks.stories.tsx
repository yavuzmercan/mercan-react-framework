import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useAsync, useCountdown, useDebounce, useDebouncedCallback,
  useFetch, useInterval, useNow, useThrottle, useThrottledCallback, useTimeout,
} from '../core';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Badge } from '../components/display/Badge';
import { Spinner } from '../components/display/Spinner';
import { Alert } from '../components/feedback/Alert';
import { HStack, VStack } from '../components/layout/Stack';

const meta: Meta = {
  title: 'Hooks/Async',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Time-based and request-driven hooks. Most are unmount-safe (cancel timers, abort fetches) so you can drop them into any component without leaking work.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Demo = ({ title, source, children }: { title: string; source: string; children: React.ReactNode }) => (
  <VStack gap="sm" style={{ maxWidth: 560 }}>
    <HStack gap="sm" align="center">
      <Code>{title}</Code>
      <Text tone="muted" size="sm">{source}</Text>
    </HStack>
    {children}
  </VStack>
);

export const UseDebounce: Story = {
  name: 'useDebounce',
  render: () => {
    const [raw, setRaw] = useState('');
    const debounced = useDebounce(raw, 400);
    return (
      <Demo title="useDebounce(value, delay=200)" source="value version — re-renders only after the user pauses">
        <Input value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="Type quickly…" />
        <HStack gap="md">
          <Text>raw: <Code>{raw || '∅'}</Code></Text>
          <Text>debounced (400ms): <Code>{debounced || '∅'}</Code></Text>
        </HStack>
      </Demo>
    );
  },
};

export const UseDebouncedCallback: Story = {
  name: 'useDebouncedCallback',
  render: () => {
    const [last, setLast] = useState<string>('—');
    const [calls, setCalls] = useState(0);
    const onSearch = useDebouncedCallback((q: string) => {
      setLast(q);
      setCalls((n) => n + 1);
    }, 400);
    return (
      <Demo title="useDebouncedCallback(fn, delay)" source="function version — fires after silence; .cancel/.flush available">
        <Input placeholder="Type to fire" onChange={(e) => onSearch(e.target.value)} />
        <Text>last fired call: <Code>{last}</Code> · total calls: <Code>{calls}</Code></Text>
        <HStack gap="sm">
          <Button size="sm" variant="ghost" onClick={() => onSearch.cancel()}>cancel pending</Button>
          <Button size="sm" variant="ghost" onClick={() => onSearch.flush()}>flush now</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseThrottle: Story = {
  name: 'useThrottle',
  render: () => {
    const [n, setN] = useState(0);
    const throttled = useThrottle(n, 500);
    return (
      <Demo title="useThrottle(value, 500)" source="emits the latest value at most once per interval">
        <HStack gap="sm" align="center">
          <Text>n: <Code>{n}</Code></Text>
          <Text>throttled: <Code>{throttled}</Code></Text>
          <Button size="sm" onClick={() => setN((x) => x + 1)}>+1</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseThrottledCallback: Story = {
  name: 'useThrottledCallback',
  render: () => {
    const [hits, setHits] = useState(0);
    const onClick = useThrottledCallback(() => setHits((n) => n + 1), 500);
    return (
      <Demo title="useThrottledCallback(fn, 500)" source="rapid clicks → at most one fire per 500ms">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={onClick}>spam click</Button>
          <Badge>{hits} accepted</Badge>
        </HStack>
      </Demo>
    );
  },
};

export const UseInterval: Story = {
  name: 'useInterval',
  render: () => {
    const [n, setN] = useState(0);
    const [delay, setDelay] = useState<number | null>(1000);
    useInterval(() => setN((x) => x + 1), delay);
    return (
      <Demo title="useInterval(callback, ms | null)" source="declarative setInterval; pass null to pause">
        <HStack gap="sm" align="center">
          <Badge>{n}</Badge>
          <Button size="sm" onClick={() => setDelay(delay === null ? 1000 : null)}>
            {delay === null ? 'resume' : 'pause'}
          </Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseTimeout: Story = {
  name: 'useTimeout',
  render: () => {
    const [msg, setMsg] = useState('Press start');
    const t = useTimeout(() => setMsg('⏰ Fired!'), 2000);
    return (
      <Demo title="useTimeout(callback, ms | null)" source="returns { reset, clear }">
        <HStack gap="sm" align="center">
          <Badge>{msg}</Badge>
          <Button size="sm" onClick={() => { setMsg('Counting…'); t.reset(); }}>start (2s)</Button>
          <Button size="sm" variant="ghost" onClick={() => { setMsg('Cancelled'); t.clear(); }}>cancel</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseCountdown: Story = {
  name: 'useCountdown',
  render: () => {
    const c = useCountdown(10);
    return (
      <Demo title="useCountdown(seconds)" source="seconds-based timer with onComplete">
        <HStack gap="sm" align="center">
          <Badge colorScheme={c.seconds === 0 ? 'success' : 'primary'}>{c.seconds}s</Badge>
          <Button size="sm" onClick={c.start} disabled={c.isRunning || c.seconds === 0}>start</Button>
          <Button size="sm" variant="outline" onClick={c.pause} disabled={!c.isRunning}>pause</Button>
          <Button size="sm" variant="ghost" onClick={() => c.reset()}>reset</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseNow: Story = {
  name: 'useNow',
  render: () => {
    const now = useNow(1000);
    return (
      <Demo title="useNow(intervalMs=1000)" source="re-renders every interval with a fresh Date">
        <Text>{now.toLocaleString()}</Text>
      </Demo>
    );
  },
};

export const UseAsync: Story = {
  name: 'useAsync',
  render: () => {
    const fetchUser = async (id: number) => {
      await new Promise((r) => setTimeout(r, 500));
      if (id === 0) throw new Error('Bad id');
      return { id, name: 'User ' + id };
    };
    const a = useAsync(fetchUser);
    return (
      <Demo title="useAsync(fn)" source="loading / error / data + run() and reset()">
        <HStack gap="sm">
          <Button size="sm" onClick={() => a.run(1)} loading={a.loading}>fetch user 1</Button>
          <Button size="sm" colorScheme="danger" onClick={() => a.run(0).catch(() => {})}>fetch invalid</Button>
          <Button size="sm" variant="ghost" onClick={a.reset}>reset</Button>
        </HStack>
        {a.loading && <Spinner size="sm" />}
        {a.error && <Alert status="danger" title="Error">{a.error.message}</Alert>}
        {a.data && <Code>{JSON.stringify(a.data)}</Code>}
      </Demo>
    );
  },
};

export const UseFetch: Story = {
  name: 'useFetch',
  render: () => {
    const [enabled, setEnabled] = useState(false);
    const f = useFetch<{ userId: number; title: string }>(
      enabled ? 'https://jsonplaceholder.typicode.com/todos/1' : null,
    );
    return (
      <Demo title="useFetch(url, options)" source="React-friendly fetch wrapper, aborts on unmount/url change">
        <HStack gap="sm">
          <Button size="sm" onClick={() => setEnabled(true)} loading={f.loading}>fetch todo</Button>
          <Button size="sm" variant="ghost" onClick={f.refetch} disabled={!enabled}>refetch</Button>
          <Button size="sm" variant="ghost" onClick={f.abort} disabled={!f.loading}>abort</Button>
        </HStack>
        {f.error && <Alert status="danger">{f.error.message}</Alert>}
        {f.data && <Code>{JSON.stringify(f.data, null, 2)}</Code>}
      </Demo>
    );
  },
};
