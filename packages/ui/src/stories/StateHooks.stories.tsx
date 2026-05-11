import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useArray, useBoolean, useControlled, useCounter, useDisclosure,
  useMap, usePrevious, useSet, useStateHistory, useStep, useToggle,
} from '../core';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Tag } from '../components/display/Tag';
import { Modal } from '../components/feedback/Modal';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';
import { Spacer } from '../components/layout/Spacer';

const meta: Meta = {
  title: 'Hooks/State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hooks for managing local component state. Each story below is a live demo of one hook — click and observe the rendered values to see what each hook returns.',
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

export const UseBoolean: Story = {
  name: 'useBoolean',
  render: () => {
    const b = useBoolean(false);
    return (
      <Demo title="useBoolean()" source="returns { value, setTrue, setFalse, toggle, set }">
        <HStack gap="sm" align="center">
          <Badge colorScheme={b.value ? 'success' : 'neutral'}>{String(b.value)}</Badge>
          <Button size="sm" onClick={b.setTrue}>setTrue</Button>
          <Button size="sm" onClick={b.setFalse}>setFalse</Button>
          <Button size="sm" onClick={b.toggle}>toggle</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseToggle: Story = {
  name: 'useToggle',
  render: () => {
    const [v, toggle] = useToggle(false);
    return (
      <Demo title="useToggle()" source="lighter version, returns [value, toggle(next?)]">
        <HStack gap="sm" align="center">
          <Badge>{String(v)}</Badge>
          <Button size="sm" onClick={() => toggle()}>toggle</Button>
          <Button size="sm" onClick={() => toggle(true)}>force on</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseCounter: Story = {
  name: 'useCounter',
  render: () => {
    const c = useCounter(5, { min: 0, max: 10 });
    return (
      <Demo title="useCounter(5, { min: 0, max: 10 })" source="returns { count, increment, decrement, set, reset }">
        <HStack gap="sm" align="center">
          <Badge>{c.count}</Badge>
          <Button size="sm" onClick={() => c.decrement()}>-</Button>
          <Button size="sm" onClick={() => c.increment()}>+</Button>
          <Button size="sm" onClick={() => c.increment(5)}>+5</Button>
          <Button size="sm" variant="ghost" onClick={c.reset}>reset</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseDisclosure: Story = {
  name: 'useDisclosure',
  render: () => {
    const d = useDisclosure();
    return (
      <Demo title="useDisclosure()" source="open/close/toggle pair — Modal/Drawer/Popover companion">
        <HStack gap="sm">
          <Button size="sm" onClick={d.open}>Open modal</Button>
          <Badge>{d.isOpen ? 'open' : 'closed'}</Badge>
        </HStack>
        <Modal isOpen={d.isOpen} onClose={d.close} title="Hello">
          <Text>Driven entirely by useDisclosure().</Text>
        </Modal>
      </Demo>
    );
  },
};

export const UseStep: Story = {
  name: 'useStep',
  render: () => {
    const s = useStep(4);
    return (
      <Demo title="useStep(max=4)" source="stepper state — wizard / multi-page form">
        <HStack gap="sm" align="center">
          <Badge>step {s.step + 1} / 4</Badge>
          <Button size="sm" onClick={s.prev} disabled={s.isFirst}>prev</Button>
          <Button size="sm" onClick={s.next} disabled={s.isLast}>next</Button>
          <Button size="sm" variant="ghost" onClick={s.reset}>reset</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseArray: Story = {
  name: 'useArray',
  render: () => {
    const a = useArray<string>(['react', 'typescript']);
    const [next, setNext] = useState('');
    return (
      <Demo title="useArray<T>([])" source="push/pop/removeAt/insertAt/clear/reset (immutable)">
        <HStack gap="sm" wrap>
          {a.array.map((v, i) => <Tag key={i} onClose={() => a.removeAt(i)}>{v}</Tag>)}
        </HStack>
        <HStack gap="sm">
          <Input value={next} onChange={(e) => setNext(e.target.value)} placeholder="add tag" />
          <Button size="sm" onClick={() => { if (next) { a.push(next); setNext(''); } }}>push</Button>
          <Button size="sm" variant="ghost" onClick={a.clear}>clear</Button>
          <Button size="sm" variant="ghost" onClick={a.reset}>reset</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseSet: Story = {
  name: 'useSet',
  render: () => {
    const s = useSet<string>(['a', 'b']);
    return (
      <Demo title="useSet<T>(initial)" source="add/remove/toggle/has/clear (returns immutable Set)">
        <HStack gap="sm" wrap>
          {Array.from(s.set).map((v) => <Tag key={v} onClose={() => s.remove(v)}>{v}</Tag>)}
        </HStack>
        <HStack gap="sm">
          {['a', 'b', 'c', 'd'].map((k) => (
            <Button key={k} size="sm" variant="outline" onClick={() => s.toggle(k)}>{s.has(k) ? '✓' : '+'} {k}</Button>
          ))}
        </HStack>
      </Demo>
    );
  },
};

export const UseMap: Story = {
  name: 'useMap',
  render: () => {
    const m = useMap<string, number>([['apples', 3], ['bananas', 5]]);
    return (
      <Demo title="useMap<K, V>(initial)" source="set/get/remove/clear/has (returns immutable Map)">
        <VStack gap="xs" align="start">
          {Array.from(m.map.entries()).map(([k, v]) => (
            <HStack key={k} gap="sm">
              <Text>{k}: <Code>{v}</Code></Text>
              <Button size="sm" variant="ghost" onClick={() => m.set(k, v + 1)}>+1</Button>
              <Button size="sm" variant="ghost" onClick={() => m.remove(k)}>remove</Button>
            </HStack>
          ))}
        </VStack>
      </Demo>
    );
  },
};

export const UseStateHistory: Story = {
  name: 'useStateHistory',
  render: () => {
    const h = useStateHistory(0, 20);
    return (
      <Demo title="useStateHistory(initial, capacity)" source="undo/redo state history">
        <HStack gap="sm" align="center">
          <Badge>{String(h.value)}</Badge>
          <Button size="sm" onClick={() => h.set(h.value + 1)}>+1</Button>
          <Button size="sm" onClick={() => h.set(h.value * 2)}>×2</Button>
          <Spacer />
          <Button size="sm" variant="ghost" onClick={h.undo} disabled={!h.canUndo}>undo</Button>
          <Button size="sm" variant="ghost" onClick={h.redo} disabled={!h.canRedo}>redo</Button>
        </HStack>
        <Text tone="muted" size="sm">history: <Code>{JSON.stringify(h.history)}</Code></Text>
      </Demo>
    );
  },
};

export const UsePrevious: Story = {
  name: 'usePrevious',
  render: () => {
    const [n, setN] = useState(0);
    const prev = usePrevious(n);
    return (
      <Demo title="usePrevious(value)" source="last value seen during the previous render">
        <HStack gap="sm" align="center">
          <Text>current <Code>{n}</Code></Text>
          <Text tone="muted">prev <Code>{String(prev)}</Code></Text>
          <Button size="sm" onClick={() => setN((x) => x + 1)}>+1</Button>
        </HStack>
      </Demo>
    );
  },
};

export const UseControlled: Story = {
  name: 'useControlled',
  render: () => {
    const [external, setExternal] = useState<string | undefined>(undefined);
    const [value, setValue] = useControlled({
      controlled: external,
      defaultValue: 'uncontrolled',
      onChange: (v) => console.log('onChange', v),
    });
    return (
      <Demo
        title="useControlled({ controlled, defaultValue, onChange })"
        source="bridge between controlled & uncontrolled component APIs"
      >
        <HStack gap="sm" align="center">
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Button size="sm" variant="outline" onClick={() => setExternal(external === undefined ? 'forced' : undefined)}>
            {external === undefined ? 'force controlled' : 'release control'}
          </Button>
        </HStack>
        <Text tone="muted" size="sm">
          mode: <Code>{external === undefined ? 'uncontrolled' : 'controlled'}</Code> · value: <Code>{value}</Code>
        </Text>
      </Demo>
    );
  },
};
