import { useRef, useState } from 'react';
import {
  Heading, Text, VStack, HStack, Card, CardBody, Button, Input, Switch, Badge,
  Code as InlineCode, Kbd, SimpleGrid, Box, Tag,
  useToggle, useBoolean, useCounter, useArray, useStateHistory, useStep, usePrevious,
  useLocalStorage, useSessionStorage,
  useDebounce, useDebouncedCallback, useThrottle, useCountdown, useNow, useInterval,
  useWindowSize, useElementSize, useScrollPosition, useHover, useFocusWithin, useHotkey,
  useOnline, usePageVisibility, useIdle, useClipboard, usePrefersReducedMotion, usePrefersDark,
} from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap="md">
    <Heading level={3}>{title}</Heading>
    {children}
  </VStack>
);

const HookRow = ({ name, signature, description }: { name: string; signature: string; description: string }) => (
  <tr>
    <td><InlineCode>{name}</InlineCode></td>
    <td><InlineCode>{signature}</InlineCode></td>
    <td>{description}</td>
  </tr>
);

const HookTable = ({ rows }: { rows: { name: string; signature: string; description: string }[] }) => (
  <table className="props-table">
    <thead>
      <tr>
        <th>Hook</th>
        <th>Signature</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r) => <HookRow key={r.name} {...r} />)}
    </tbody>
  </table>
);

/* ===== Live demos ===== */

const ToggleDemo = () => {
  const [on, toggle] = useToggle(false);
  return (
    <HStack gap="md" align="center">
      <Switch checked={on} onChange={() => toggle()} label={on ? 'On' : 'Off'} />
      <Button size="sm" variant="outline" onClick={() => toggle()}>toggle()</Button>
      <Button size="sm" variant="outline" onClick={() => toggle(true)}>toggle(true)</Button>
    </HStack>
  );
};

const CounterDemo = () => {
  const { count, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 });
  return (
    <HStack gap="sm" align="center">
      <Button size="sm" onClick={() => decrement()}>−</Button>
      <Box style={{ minWidth: 40, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
        <Text size="lg" weight="bold">{count}</Text>
      </Box>
      <Button size="sm" onClick={() => increment()}>+</Button>
      <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
      <Text size="sm" tone="muted">min 0, max 10</Text>
    </HStack>
  );
};

const PreviousDemo = () => {
  const { value, set } = useStateHistory(0);
  const prev = usePrevious(value);
  return (
    <HStack gap="md" align="center">
      <Input type="number" value={value} onChange={(e) => set(Number(e.target.value))} style={{ width: 100 }} />
      <Text>Current: <strong>{value}</strong></Text>
      <Text tone="muted">Previous: {prev ?? '—'}</Text>
    </HStack>
  );
};

const DebounceDemo = () => {
  const [text, setText] = useState('');
  const debounced = useDebounce(text, 400);
  return (
    <VStack gap="sm">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
      <Text size="sm" tone="muted">Live: {text || '—'} • Debounced (400ms): {debounced || '—'}</Text>
    </VStack>
  );
};

const DebouncedCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [committed, setCommitted] = useState(0);
  const debouncedCommit = useDebouncedCallback((v: number) => setCommitted(v), 300);
  return (
    <VStack gap="sm">
      <HStack gap="sm">
        <Button size="sm" onClick={() => { const next = count + 1; setCount(next); debouncedCommit(next); }}>
          Click rapidly
        </Button>
        <Button size="sm" variant="ghost" onClick={() => debouncedCommit.cancel()}>Cancel</Button>
      </HStack>
      <Text size="sm" tone="muted">Clicks: {count} • Committed (300ms after last): {committed}</Text>
    </VStack>
  );
};

const CountdownDemo = () => {
  const { seconds, isRunning, start, pause, reset } = useCountdown(10);
  return (
    <HStack gap="sm" align="center">
      <Box style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', minWidth: 40 }}>
        {seconds}
      </Box>
      {isRunning ? (
        <Button size="sm" onClick={pause}>Pause</Button>
      ) : (
        <Button size="sm" onClick={start}>Start</Button>
      )}
      <Button size="sm" variant="ghost" onClick={() => reset()}>Reset</Button>
    </HStack>
  );
};

const NowDemo = () => {
  const now = useNow(1000);
  return <Text>{now.toLocaleTimeString()}</Text>;
};

const WindowSizeDemo = () => {
  const { width, height } = useWindowSize();
  return <Text>Window: {width} × {height} px</Text>;
};

const ElementSizeDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);
  return (
    <VStack gap="sm">
      <Text size="sm" tone="muted">Resize this resizable box (CSS resize):</Text>
      <Box
        ref={ref}
        style={{
          padding: 16, background: 'var(--mf-color-surfaceAlt)',
          border: '1px solid var(--mf-color-border)', borderRadius: 8,
          resize: 'both', overflow: 'auto', width: 240, height: 80, minWidth: 120, minHeight: 60,
        }}
      >
        <Text>Drag corner →</Text>
      </Box>
      <Text size="sm" tone="muted">Tracked: {Math.round(width)} × {Math.round(height)}</Text>
    </VStack>
  );
};

const ScrollDemo = () => {
  const { y } = useScrollPosition();
  return <Text>Window scrollY: {Math.round(y)}px</Text>;
};

const HoverDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const hovered = useHover(ref);
  return (
    <Box
      ref={ref}
      style={{
        padding: 'var(--mf-spacing-lg)',
        background: hovered ? 'var(--mf-color-primary)' : 'var(--mf-color-surfaceAlt)',
        color: hovered ? 'var(--mf-color-primaryContrast)' : 'var(--mf-color-text)',
        borderRadius: 8,
        transition: 'background 200ms ease, color 200ms ease',
        textAlign: 'center',
      }}
    >
      {hovered ? 'Hovering!' : 'Hover me'}
    </Box>
  );
};

const FocusWithinDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const focused = useFocusWithin(ref);
  return (
    <Box
      ref={ref}
      style={{
        padding: 'var(--mf-spacing-md)',
        border: `2px solid ${focused ? 'var(--mf-color-primary)' : 'var(--mf-color-border)'}`,
        borderRadius: 8,
        transition: 'border-color 200ms',
      }}
    >
      <HStack gap="sm">
        <Input placeholder="First" />
        <Input placeholder="Second" />
      </HStack>
      <Text size="sm" tone="muted" style={{ marginTop: 8 }}>
        Focused inside: {focused ? 'yes' : 'no'}
      </Text>
    </Box>
  );
};

const HotkeyDemo = () => {
  const [count, setCount] = useState(0);
  useHotkey('mod+k', () => setCount((c) => c + 1));
  return (
    <Text>
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> (or <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>) — fired {count} times
    </Text>
  );
};

const OnlineDemo = () => {
  const online = useOnline();
  return (
    <HStack gap="sm" align="center">
      <Badge colorScheme={online ? 'success' : 'danger'}>
        {online ? 'Online' : 'Offline'}
      </Badge>
      <Text size="sm" tone="muted">Disable network to test</Text>
    </HStack>
  );
};

const VisibilityDemo = () => {
  const visible = usePageVisibility();
  return (
    <HStack gap="sm" align="center">
      <Badge colorScheme={visible ? 'success' : 'warning'}>{visible ? 'Visible' : 'Hidden'}</Badge>
      <Text size="sm" tone="muted">Switch to another tab to flip</Text>
    </HStack>
  );
};

const IdleDemo = () => {
  const idle = useIdle(3000);
  return (
    <HStack gap="sm" align="center">
      <Badge colorScheme={idle ? 'warning' : 'success'}>{idle ? 'Idle (3s)' : 'Active'}</Badge>
      <Text size="sm" tone="muted">Stop moving the mouse for 3 seconds</Text>
    </HStack>
  );
};

const ClipboardDemo = () => {
  const { copy, copied } = useClipboard();
  return (
    <HStack gap="sm" align="center">
      <Button size="sm" onClick={() => copy('https://yavuzmercan.dev')}>
        {copied ? 'Copied!' : 'Copy URL'}
      </Button>
      <Text size="sm" tone="muted">Then paste anywhere</Text>
    </HStack>
  );
};

const PrefersDarkDemo = () => {
  const dark = usePrefersDark();
  const reduced = usePrefersReducedMotion();
  return (
    <VStack gap="xs">
      <Text size="sm">prefers-color-scheme: <strong>{dark ? 'dark' : 'light'}</strong></Text>
      <Text size="sm">prefers-reduced-motion: <strong>{reduced ? 'reduce' : 'no-preference'}</strong></Text>
    </VStack>
  );
};

const ArrayDemo = () => {
  const { array, push, removeAt, clear } = useArray<string>(['react', 'typescript']);
  const [input, setInput] = useState('');
  return (
    <VStack gap="sm">
      <HStack gap="sm">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tag name" />
        <Button size="sm" onClick={() => { if (input) { push(input); setInput(''); } }}>Add</Button>
        <Button size="sm" variant="ghost" onClick={clear}>Clear</Button>
      </HStack>
      <HStack gap="xs" wrap>
        {array.map((t, i) => (
          <Tag key={i} onClose={() => removeAt(i)}>{t}</Tag>
        ))}
      </HStack>
    </VStack>
  );
};

const StepDemo = () => {
  const { step, next, prev, isFirst, isLast } = useStep(4);
  return (
    <HStack gap="sm" align="center">
      <Button size="sm" onClick={prev} disabled={isFirst}>Prev</Button>
      <Box style={{ minWidth: 80, textAlign: 'center' }}>
        <Text>Step {step + 1} / 4</Text>
      </Box>
      <Button size="sm" onClick={next} disabled={isLast}>Next</Button>
    </HStack>
  );
};

const StorageDemo = () => {
  const [name, setName] = useLocalStorage('docs-demo-name', '');
  return (
    <VStack gap="sm">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name" />
      <Text size="sm" tone="muted">Refresh the page — your input persists in localStorage.</Text>
    </VStack>
  );
};

/* ===== Page ===== */

export const HooksPage = () => {
  return (
    <VStack gap="lg">
      <div>
        <Heading level={1}>Hooks</Heading>
        <Text size="lg" tone="muted">
          ~55 production-ready React hooks across 6 categories. All zero-dependency, SSR-safe, fully typed.
        </Text>
      </div>

      <Card><CardBody>
        <Text>
          Import from the package root or the <InlineCode>/core</InlineCode>-style group:
        </Text>
        <pre className="story-code" style={{ marginTop: 8 }}>
          <code>{`import { useDebounce, useLocalStorage, useToggle } from '@yavuzmercan/ui';`}</code>
        </pre>
      </CardBody></Card>

      {/* ============ STATE ============ */}
      <Section title="State">
        <Story title="useToggle" code={`const [on, toggle] = useToggle();\ntoggle();\ntoggle(true);  // force value`}>
          <ToggleDemo />
        </Story>
        <Story title="useCounter — bounded" code={`const { count, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 });`}>
          <CounterDemo />
        </Story>
        <Story title="useArray" code={`const { array, push, removeAt, replaceAt, clear } = useArray<string>([]);`}>
          <ArrayDemo />
        </Story>
        <Story title="useStateHistory + usePrevious" code={`const { value, set, undo, redo } = useStateHistory(0);\nconst prev = usePrevious(value);`}>
          <PreviousDemo />
        </Story>
        <Story title="useStep" code={`const { step, next, prev, isFirst, isLast } = useStep(totalSteps);`}>
          <StepDemo />
        </Story>
        <HookTable rows={[
          { name: 'useDisclosure', signature: '() => { isOpen, open, close, toggle }', description: 'Modal / drawer / popover open/close state.' },
          { name: 'useToggle', signature: '(initial?) => [bool, (v?) => void]', description: 'Boolean toggle with optional explicit value.' },
          { name: 'useBoolean', signature: '(initial?) => { value, setTrue, setFalse, toggle, set }', description: 'Same as useToggle but with named methods.' },
          { name: 'useCounter', signature: '(initial?, { min, max }?)', description: 'Numeric counter with bounds and reset.' },
          { name: 'useArray', signature: '<T>(initial?) => array helpers', description: 'Immutable array state with push/pop/insertAt/removeAt etc.' },
          { name: 'useMap', signature: '<K, V>() => map helpers', description: 'Map state with stable mutators.' },
          { name: 'useSet', signature: '<T>() => set helpers', description: 'Set state with add/remove/toggle.' },
          { name: 'useStateHistory', signature: '<T>(initial, capacity?)', description: 'Undo/redo state history.' },
          { name: 'useStep', signature: '(max, initial?)', description: 'Wizard step navigation.' },
          { name: 'useControlled', signature: '({ controlled, defaultValue, onChange })', description: 'Bridge controlled/uncontrolled prop pattern.' },
          { name: 'usePrevious', signature: '<T>(value) => T | undefined', description: 'Value from previous render.' },
        ]} />
      </Section>

      {/* ============ STORAGE ============ */}
      <Section title="Storage">
        <Story title="useLocalStorage" code={`const [name, setName, remove] = useLocalStorage('name', '');`}>
          <StorageDemo />
        </Story>
        <HookTable rows={[
          { name: 'useLocalStorage', signature: "<T>(key, initial, options?) => [v, set, remove]", description: 'Persist state in localStorage. Cross-tab sync.' },
          { name: 'useSessionStorage', signature: "<T>(key, initial, options?)", description: 'Same as above but sessionStorage (cleared on tab close).' },
          { name: 'useCookie', signature: '(name, default?, options?)', description: 'Read/write cookies as React state.' },
        ]} />
      </Section>

      {/* ============ LIFECYCLE ============ */}
      <Section title="Lifecycle">
        <HookTable rows={[
          { name: 'useUpdateEffect', signature: '(effect, deps?)', description: 'useEffect that skips the first render.' },
          { name: 'useMount', signature: '(fn) => void', description: 'Runs once on mount. Cleanup return supported.' },
          { name: 'useUnmount', signature: '(fn) => void', description: 'Runs once on unmount.' },
          { name: 'useIsMounted', signature: '() => () => boolean', description: 'Returns a function — true while mounted.' },
          { name: 'useLatest', signature: '<T>(value) => Ref<T>', description: 'Ref always holding the latest value (stale-closure escape).' },
          { name: 'useUpdate', signature: '() => () => void', description: 'Returns a force-rerender function.' },
        ]} />
      </Section>

      {/* ============ ASYNC / TIME ============ */}
      <Section title="Async & time">
        <Story title="useDebounce — value" code={`const debounced = useDebounce(text, 400);`}>
          <DebounceDemo />
        </Story>
        <Story title="useDebouncedCallback — function" code={`const cb = useDebouncedCallback((v) => save(v), 300);\ncb.cancel();\ncb.flush();`}>
          <DebouncedCallbackDemo />
        </Story>
        <Story title="useCountdown" code={`const { seconds, start, pause, reset } = useCountdown(10);`}>
          <CountdownDemo />
        </Story>
        <Story title="useNow" code={`const now = useNow(1000);  // re-renders every second`}>
          <NowDemo />
        </Story>
        <HookTable rows={[
          { name: 'useDebounce', signature: '<T>(value, delay?) => T', description: 'Debounced value.' },
          { name: 'useDebouncedCallback', signature: '(fn, delay?) => DebouncedFn', description: 'Debounced function with .cancel() / .flush().' },
          { name: 'useThrottle', signature: '<T>(value, interval?) => T', description: 'Rate-limited value.' },
          { name: 'useThrottledCallback', signature: '(fn, interval?)', description: 'Throttled function.' },
          { name: 'useTimeout', signature: '(callback, delay | null)', description: 'Declarative setTimeout.' },
          { name: 'useInterval', signature: '(callback, interval | null)', description: 'Declarative setInterval.' },
          { name: 'useAsync', signature: '(asyncFn, { immediate? })', description: 'Async function with loading/error/data and run().' },
          { name: 'useFetch', signature: '<T>(url, options?)', description: 'Lightweight fetch wrapper with abort + refetch.' },
          { name: 'useCountdown', signature: '(seconds, { onComplete? })', description: 'Seconds countdown with start/pause/reset.' },
          { name: 'useNow', signature: '(interval?) => Date', description: 'Current time, refreshes periodically.' },
        ]} />
      </Section>

      {/* ============ DOM ============ */}
      <Section title="DOM">
        <SimpleGrid columns={2} gap="md">
          <Story title="useWindowSize" code={`const { width, height } = useWindowSize();`}>
            <WindowSizeDemo />
          </Story>
          <Story title="useScrollPosition" code={`const { x, y } = useScrollPosition();`}>
            <ScrollDemo />
          </Story>
        </SimpleGrid>
        <Story title="useElementSize — ResizeObserver" code={`const { width, height } = useElementSize(ref);`}>
          <ElementSizeDemo />
        </Story>
        <SimpleGrid columns={2} gap="md">
          <Story title="useHover" code={`const hovered = useHover(ref);`}>
            <HoverDemo />
          </Story>
          <Story title="useFocusWithin" code={`const focused = useFocusWithin(ref);`}>
            <FocusWithinDemo />
          </Story>
        </SimpleGrid>
        <Story title="useHotkey — combos" code={`useHotkey('mod+k', () => openSearch());\nuseHotkey(['mod+s', 'ctrl+s'], save);`}>
          <HotkeyDemo />
        </Story>
        <HookTable rows={[
          { name: 'useEventListener', signature: '(type, listener, target?)', description: 'Typed addEventListener wrapper.' },
          { name: 'useWindowSize', signature: '() => { width, height }', description: 'Track window dimensions.' },
          { name: 'useElementSize', signature: '(ref) => { width, height }', description: 'ResizeObserver-based element size.' },
          { name: 'useIntersectionObserver', signature: '(ref, options?)', description: 'Track viewport intersection.' },
          { name: 'useScrollPosition', signature: '(ref?) => { x, y }', description: 'Track window or element scroll.' },
          { name: 'useScrollLock', signature: '(locked?)', description: 'Lock body scroll while active.' },
          { name: 'useDocumentTitle', signature: '(title, restoreOnUnmount?)', description: 'Set document.title.' },
          { name: 'useHover', signature: '(ref) => boolean', description: 'Track mouseenter/leave on an element.' },
          { name: 'useFocusWithin', signature: '(ref) => boolean', description: 'True when focus is inside the element.' },
          { name: 'useHotkey', signature: '(combo, fn, options?)', description: 'Keyboard shortcuts. mod = ⌘ (Mac) / Ctrl (other).' },
          { name: 'useScrollIntoView', signature: '(ref, options?) => () => void', description: 'Returns a scrollIntoView() callback.' },
          { name: 'useClickOutside', signature: '(ref, handler, enabled?)', description: 'Fires when user clicks outside the element.' },
          { name: 'useEscape', signature: '(handler, enabled?)', description: 'Fires when Escape key is pressed.' },
          { name: 'useFocusTrap', signature: '(ref, enabled?)', description: 'Trap Tab key inside an element (modals).' },
        ]} />
      </Section>

      {/* ============ BROWSER ============ */}
      <Section title="Browser APIs">
        <SimpleGrid columns={2} gap="md">
          <Story title="useOnline" code={`const online = useOnline();`}><OnlineDemo /></Story>
          <Story title="usePageVisibility" code={`const visible = usePageVisibility();`}><VisibilityDemo /></Story>
          <Story title="useIdle" code={`const idle = useIdle(3000);`}><IdleDemo /></Story>
          <Story title="useClipboard" code={`const { copy, copied } = useClipboard();`}><ClipboardDemo /></Story>
        </SimpleGrid>
        <Story title="usePrefersDark + usePrefersReducedMotion" code={`const dark = usePrefersDark();\nconst reduced = usePrefersReducedMotion();`}>
          <PrefersDarkDemo />
        </Story>
        <HookTable rows={[
          { name: 'useMediaQuery', signature: '(query) => boolean', description: 'Match a CSS media query.' },
          { name: 'usePrefersDark', signature: '() => boolean', description: 'prefers-color-scheme: dark.' },
          { name: 'usePrefersReducedMotion', signature: '() => boolean', description: 'prefers-reduced-motion: reduce.' },
          { name: 'useOnline', signature: '() => boolean', description: 'Browser online/offline state.' },
          { name: 'useGeolocation', signature: '(options?, watch?)', description: 'Geolocation API watcher.' },
          { name: 'usePermission', signature: '(name) => PermissionState', description: 'Permissions API state.' },
          { name: 'usePageVisibility', signature: '() => boolean', description: 'Page Visibility API — true when tab is visible.' },
          { name: 'useIdle', signature: '(timeout?, events?)', description: 'True when user is inactive.' },
          { name: 'useFullscreen', signature: '(ref?) => { isFullscreen, enter, exit, toggle, isSupported }', description: 'Fullscreen API wrapper.' },
          { name: 'useShare', signature: '() => { share, isSupported }', description: 'Web Share API.' },
          { name: 'useClipboard', signature: '(timeout?) => { copy, copied, isSupported }', description: 'Clipboard with auto-resetting copied flag.' },
          { name: 'useScript', signature: '(src) => ScriptStatus', description: 'Dynamically load external <script>.' },
        ]} />
      </Section>
    </VStack>
  );
};
