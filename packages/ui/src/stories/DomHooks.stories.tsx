import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useClickOutside, useDocumentTitle, useElementSize, useEscape,
  useEventListener, useFocusWithin, useHotkey, useHover,
  useIntersectionObserver, useScrollIntoView, useScrollLock,
  useScrollPosition, useWindowSize,
} from '../core';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Badge } from '../components/display/Badge';
import { Kbd } from '../components/display/Kbd';
import { HStack, VStack } from '../components/layout/Stack';
import { Box } from '../components/layout/Box';
import { FormField } from '../components/forms/FormField';

const meta: Meta = {
  title: 'Hooks/DOM',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DOM-aware hooks: clicks, focus, hover, keyboard, scroll, resize, intersection. Most take a `RefObject` and clean up listeners on unmount.',
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

export const UseClickOutside: Story = {
  name: 'useClickOutside',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [hits, setHits] = useState(0);
    useClickOutside(ref, () => setHits((n) => n + 1));
    return (
      <Demo title="useClickOutside(ref, handler)" source="fires when a mousedown lands outside the ref">
        <Box ref={ref} bg="surfaceAlt" border radius="md" p="md" style={{ display: 'inline-block' }}>
          Inside this box (click here, no fires)
        </Box>
        <Text tone="muted" size="sm">outside clicks: <Code>{hits}</Code> — click anywhere outside ↑</Text>
      </Demo>
    );
  },
};

export const UseEscape: Story = {
  name: 'useEscape',
  render: () => {
    const [count, setCount] = useState(0);
    useEscape(() => setCount((n) => n + 1));
    return (
      <Demo title="useEscape(handler, enabled?)" source="fires once per Escape keypress">
        <Text>Escape pressed: <Badge>{count}</Badge> time(s)</Text>
      </Demo>
    );
  },
};

export const UseHotkey: Story = {
  name: 'useHotkey',
  render: () => {
    const [last, setLast] = useState('—');
    useHotkey('mod+k', () => setLast('mod+k'));
    useHotkey('shift+?', () => setLast('shift+?'));
    useHotkey(['ctrl+shift+p', 'meta+shift+p'], () => setLast('palette'));
    return (
      <Demo title="useHotkey(combo, fn)" source="cross-platform hotkeys; mod = ⌘ on Mac, Ctrl elsewhere">
        <HStack gap="md" align="center" wrap>
          <span><Kbd>⌘</Kbd>+<Kbd>K</Kbd></span>
          <span><Kbd>Shift</Kbd>+<Kbd>?</Kbd></span>
          <span><Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>P</Kbd></span>
        </HStack>
        <Text>last fired: <Code>{last}</Code></Text>
      </Demo>
    );
  },
};

export const UseHover: Story = {
  name: 'useHover',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const hovered = useHover(ref);
    return (
      <Demo title="useHover(ref)" source="boolean — pointerenter/leave">
        <Box ref={ref} bg={hovered ? 'surface' : 'surfaceAlt'} border radius="md" p="lg" style={{ display: 'inline-block', transition: 'background 0.2s' }}>
          {hovered ? 'Hovered ✨' : 'Hover me'}
        </Box>
      </Demo>
    );
  },
};

export const UseFocusWithin: Story = {
  name: 'useFocusWithin',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const focused = useFocusWithin(ref);
    return (
      <Demo title="useFocusWithin(ref)" source="true while any descendant is focused">
        <Box ref={ref} border radius="md" p="md" style={{ background: focused ? 'var(--mf-color-primary-50, var(--mf-color-surfaceAlt))' : 'var(--mf-color-surfaceAlt)' }}>
          <FormField label="Try focusing one of these:">
            <Input placeholder="One" />
          </FormField>
          <FormField label="Or this">
            <Input placeholder="Two" />
          </FormField>
        </Box>
        <Text>focused within: <Code>{String(focused)}</Code></Text>
      </Demo>
    );
  },
};

export const UseElementSize: Story = {
  name: 'useElementSize',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const size = useElementSize(ref);
    return (
      <Demo title="useElementSize(ref)" source="ResizeObserver in disguise">
        <textarea
          ref={ref as any}
          defaultValue="Drag the corner to resize me…"
          style={{ width: 240, height: 80, padding: 8, fontFamily: 'inherit', resize: 'both' }}
        />
        <Text>size: <Code>{`${Math.round(size.width)} × ${Math.round(size.height)}`}</Code></Text>
      </Demo>
    );
  },
};

export const UseWindowSize: Story = {
  name: 'useWindowSize',
  render: () => {
    const size = useWindowSize();
    return (
      <Demo title="useWindowSize()" source="reactive innerWidth/innerHeight">
        <Code>{`${size.width} × ${size.height}`}</Code>
        <Text tone="muted" size="sm">Resize the iframe to update.</Text>
      </Demo>
    );
  },
};

export const UseEventListener: Story = {
  name: 'useEventListener',
  render: () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEventListener('mousemove', (e) => setPos({ x: e.clientX, y: e.clientY }));
    return (
      <Demo title="useEventListener(event, handler, target?)" source="overloaded for window / document / element">
        <Code>{`mouse: ${pos.x}, ${pos.y}`}</Code>
      </Demo>
    );
  },
};

export const UseIntersectionObserver: Story = {
  name: 'useIntersectionObserver',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.5 });
    return (
      <Demo title="useIntersectionObserver(ref, options)" source="track viewport intersection (50% here)">
        <Box border radius="md" p="md" style={{ height: 220, overflow: 'auto' }}>
          <Box style={{ height: 200 }}><Text tone="muted">Scroll down ↓</Text></Box>
          <Box ref={ref} bg={isIntersecting ? 'surface' : 'surfaceAlt'} radius="md" p="md" style={{ transition: 'background 0.3s' }}>
            <Text>I am {isIntersecting ? 'visible' : 'off-screen'}.</Text>
          </Box>
          <Box style={{ height: 200 }} />
        </Box>
      </Demo>
    );
  },
};

export const UseScrollPosition: Story = {
  name: 'useScrollPosition',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const pos = useScrollPosition(ref);
    return (
      <Demo title="useScrollPosition(ref?)" source="omit ref for window scroll">
        <Box ref={ref} border radius="md" style={{ height: 160, overflow: 'auto' }}>
          <Box style={{ height: 600, padding: 16 }}>
            <Text>Scroll inside this box ↓</Text>
            <Text tone="muted" size="sm">{Array(20).fill('Lorem ipsum').join(' · ')}</Text>
          </Box>
        </Box>
        <Code>{`x: ${pos.x}, y: ${pos.y}`}</Code>
      </Demo>
    );
  },
};

export const UseScrollIntoView: Story = {
  name: 'useScrollIntoView',
  render: () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollTo = useScrollIntoView(targetRef);
    return (
      <Demo title="useScrollIntoView(ref, options?)" source="returns a function — call it to scroll the ref into view">
        <Button size="sm" onClick={() => scrollTo()}>scroll target into view</Button>
        <Box border radius="md" style={{ height: 160, overflow: 'auto', padding: 16 }}>
          <Box style={{ height: 300 }} />
          <Box ref={targetRef} bg="surfaceAlt" radius="md" p="md">🎯 Target</Box>
          <Box style={{ height: 300 }} />
        </Box>
      </Demo>
    );
  },
};

export const UseScrollLock: Story = {
  name: 'useScrollLock',
  render: () => {
    const [locked, setLocked] = useState(false);
    useScrollLock(locked);
    return (
      <Demo title="useScrollLock(locked)" source="locks <body> scroll while open — used by Modal/Drawer internally">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={() => setLocked((v) => !v)}>{locked ? 'unlock' : 'lock'}</Button>
          <Badge colorScheme={locked ? 'warning' : 'neutral'}>{locked ? 'locked' : 'free'}</Badge>
        </HStack>
        <Text tone="muted" size="sm">Try scrolling the parent page after locking.</Text>
      </Demo>
    );
  },
};

export const UseDocumentTitle: Story = {
  name: 'useDocumentTitle',
  render: () => {
    const [title, setTitle] = useState('Mercan UI Storybook');
    useDocumentTitle(title);
    return (
      <Demo title="useDocumentTitle(title, restoreOnUnmount?)" source="check the iframe / page title above ↑">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="document.title" />
      </Demo>
    );
  },
};
