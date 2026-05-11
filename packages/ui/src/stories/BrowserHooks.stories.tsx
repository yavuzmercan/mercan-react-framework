import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useBreakpoint, useBreakpointDown, useBreakpointUp,
  useClipboard, useFullscreen, useGeolocation, useIdle,
  useMediaQuery, usePrefersDark, useOnline, usePageVisibility,
  usePermission, usePrefersReducedMotion, useResponsiveValue,
  useScript, useShare,
} from '../core';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Text } from '../components/typography/Text';
import { Code } from '../components/display/Code';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';
import { Box } from '../components/layout/Box';

const meta: Meta = {
  title: 'Hooks/Browser',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hooks that wrap browser APIs (clipboard, geolocation, share, fullscreen, breakpoints, media queries, online/visibility…). All SSR-safe — they no-op on the server and update once mounted.',
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

export const UseBreakpoint: Story = {
  name: 'useBreakpoint',
  render: () => {
    const bp = useBreakpoint();
    const isDesktop = useBreakpointUp('lg');
    const isMobile = useBreakpointDown('md');
    return (
      <Demo title="useBreakpoint() / Up / Down" source="reactive viewport breakpoint">
        <HStack gap="md">
          <Badge>active: {bp}</Badge>
          <Badge colorScheme={isDesktop ? 'success' : 'neutral'}>up('lg'): {String(isDesktop)}</Badge>
          <Badge colorScheme={isMobile ? 'warning' : 'neutral'}>down('md'): {String(isMobile)}</Badge>
        </HStack>
        <Text tone="muted" size="sm">Resize the iframe to see them change.</Text>
      </Demo>
    );
  },
};

export const UseResponsiveValue: Story = {
  name: 'useResponsiveValue',
  render: () => {
    const padding = useResponsiveValue<'sm' | 'lg' | 'xl'>({ base: 'sm', md: 'lg', lg: 'xl' });
    const label = useResponsiveValue<'mobile' | 'tablet' | 'desktop'>({ base: 'mobile', md: 'tablet', lg: 'desktop' });
    return (
      <Demo title="useResponsiveValue<T>(value)" source="resolves an object {base, sm, md, lg, xl, 2xl} to the active breakpoint">
        <Box bg="surfaceAlt" p={padding ?? 'md'} radius="md">
          <Text>You are on a <Code>{label}</Code> · padding token: <Code>{padding}</Code></Text>
        </Box>
      </Demo>
    );
  },
};

export const UseMediaQuery: Story = {
  name: 'useMediaQuery / usePrefersDark',
  render: () => {
    const isPortrait = useMediaQuery('(orientation: portrait)');
    const isWide = useMediaQuery('(min-width: 1200px)');
    const prefersDark = usePrefersDark();
    return (
      <Demo title="useMediaQuery(query)" source="reactive matchMedia">
        <VStack gap="xs" align="start">
          <Text>(orientation: portrait): <Code>{String(isPortrait)}</Code></Text>
          <Text>(min-width: 1200px): <Code>{String(isWide)}</Code></Text>
          <Text>usePrefersDark(): <Code>{String(prefersDark)}</Code></Text>
        </VStack>
      </Demo>
    );
  },
};

export const UseOnline: Story = {
  name: 'useOnline',
  render: () => {
    const online = useOnline();
    return (
      <Demo title="useOnline()" source="navigator.onLine + online/offline events">
        <Badge colorScheme={online ? 'success' : 'danger'}>{online ? 'online' : 'offline'}</Badge>
      </Demo>
    );
  },
};

export const UsePageVisibility: Story = {
  name: 'usePageVisibility',
  render: () => {
    const visible = usePageVisibility();
    return (
      <Demo title="usePageVisibility()" source="document.visibilityState — switch tabs to see it flip">
        <Badge colorScheme={visible ? 'success' : 'neutral'}>{visible ? 'visible' : 'hidden'}</Badge>
      </Demo>
    );
  },
};

export const UseIdle: Story = {
  name: 'useIdle',
  render: () => {
    const idle = useIdle(3000);
    return (
      <Demo title="useIdle(timeout=60000)" source="true after no input/scroll for `timeout` ms (3s here)">
        <Badge colorScheme={idle ? 'warning' : 'success'}>{idle ? 'idle' : 'active'}</Badge>
        <Text tone="muted" size="sm">Stop moving / typing for 3s →</Text>
      </Demo>
    );
  },
};

export const UseClipboard: Story = {
  name: 'useClipboard',
  render: () => {
    const clip = useClipboard(1500);
    return (
      <Demo title="useClipboard(timeout=1500)" source="navigator.clipboard wrapper, auto-resets `copied`">
        <HStack gap="sm" align="center">
          <Button size="sm" onClick={() => clip.copy('Hello from useClipboard()!')}>copy text</Button>
          {clip.copied && <Badge colorScheme="success">copied!</Badge>}
          {!clip.isSupported && <Badge colorScheme="danger">not supported</Badge>}
        </HStack>
      </Demo>
    );
  },
};

export const UseShare: Story = {
  name: 'useShare',
  render: () => {
    const { share, isSupported } = useShare();
    return (
      <Demo title="useShare()" source="Web Share API — opens the device share sheet">
        <HStack gap="sm" align="center">
          <Button
            size="sm"
            disabled={!isSupported}
            onClick={() => share({ title: 'Mercan UI', text: 'Check this out', url: 'https://example.com' })}
          >
            share
          </Button>
          {!isSupported && <Badge colorScheme="warning">unsupported (desktop browsers)</Badge>}
        </HStack>
      </Demo>
    );
  },
};

export const UseFullscreen: Story = {
  name: 'useFullscreen',
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const fs = useFullscreen(ref);
    return (
      <Demo title="useFullscreen(ref?)" source="omit the ref to fullscreen <html>; pass a ref to fullscreen one element">
        <Box ref={ref} bg="surfaceAlt" p="lg" radius="md">
          <VStack gap="sm">
            <Text>This box can go fullscreen.</Text>
            <HStack gap="sm">
              <Button size="sm" onClick={fs.toggle} disabled={!fs.isSupported}>
                {fs.isFullscreen ? 'exit' : 'enter'} fullscreen
              </Button>
              {!fs.isSupported && <Badge colorScheme="warning">unsupported</Badge>}
            </HStack>
          </VStack>
        </Box>
      </Demo>
    );
  },
};

export const UseGeolocation: Story = {
  name: 'useGeolocation',
  render: () => {
    const g = useGeolocation();
    return (
      <Demo title="useGeolocation(opts, watch=true)" source="grants the location permission on first call">
        {g.loading && <Text tone="muted">Waiting for permission…</Text>}
        {g.error && <Text tone="danger">{g.error.message}</Text>}
        {g.latitude !== null && (
          <Code>{`lat: ${g.latitude.toFixed(4)}, lon: ${g.longitude!.toFixed(4)}, ±${g.accuracy ?? '?'}m`}</Code>
        )}
      </Demo>
    );
  },
};

export const UsePermission: Story = {
  name: 'usePermission',
  render: () => {
    const cam = usePermission('camera');
    const mic = usePermission('microphone');
    const geo = usePermission('geolocation');
    return (
      <Demo title="usePermission(name)" source="Permissions API state for camera/microphone/geolocation/etc.">
        <VStack gap="xs" align="start">
          <Text>camera: <Code>{cam}</Code></Text>
          <Text>microphone: <Code>{mic}</Code></Text>
          <Text>geolocation: <Code>{geo}</Code></Text>
        </VStack>
      </Demo>
    );
  },
};

export const UsePrefersReducedMotion: Story = {
  name: 'usePrefersReducedMotion',
  render: () => {
    const reduce = usePrefersReducedMotion();
    return (
      <Demo title="usePrefersReducedMotion()" source="prefers-reduced-motion media query — gate animations on this">
        <Badge colorScheme={reduce ? 'warning' : 'neutral'}>{reduce ? 'reduce motion' : 'full motion'}</Badge>
      </Demo>
    );
  },
};

export const UseScript: Story = {
  name: 'useScript',
  render: () => {
    const [enabled, setEnabled] = useState(false);
    const status = useScript(enabled ? 'https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js' : null);
    return (
      <Demo title="useScript(src | null)" source="dynamically inject an external <script>; status is idle/loading/ready/error">
        <HStack gap="sm">
          <Button size="sm" onClick={() => setEnabled(true)}>load lodash</Button>
          <Badge colorScheme={status === 'ready' ? 'success' : status === 'error' ? 'danger' : 'neutral'}>
            {status}
          </Badge>
        </HStack>
        {status === 'ready' && (
          <Text size="sm">
            <Code>(window as any)._.VERSION</Code> ={' '}
            <Code>{((window as any)._?.VERSION as string) ?? '?'}</Code>
          </Text>
        )}
      </Demo>
    );
  },
};
