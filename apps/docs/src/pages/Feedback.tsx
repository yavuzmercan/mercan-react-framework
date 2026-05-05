import { useState } from 'react';
import {
  Alert, Modal, Tooltip, Popover, Button, Heading, Text, VStack, HStack,
  useToast,
} from '@yavuzmercan/ui';
import { Story } from '../Story';

export const AlertPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Alert</Heading>
    <Story title="Statuses" code={`<Alert status="success" title="Done">Saved.</Alert>`}>
      <VStack gap="md">
        <Alert status="info" title="Heads up">An informational message.</Alert>
        <Alert status="success" title="Saved">Your changes have been stored.</Alert>
        <Alert status="warning" title="Quota">You're using 80% of your quota.</Alert>
        <Alert status="danger" title="Error">Something went wrong.</Alert>
      </VStack>
    </Story>
  </VStack>
);

export const ToastPage = () => {
  const toast = useToast();
  return (
    <VStack gap="lg">
      <Heading level={1}>Toast</Heading>
      <Text>Toasts are managed by <code>ToastProvider</code> (already wired by <code>MercanProvider</code>). Call <code>useToast()</code> from anywhere.</Text>
      <Story title="Show toasts" code={`const toast = useToast();\ntoast.show({ title: 'Saved', status: 'success' });`}>
        <HStack gap="sm" wrap>
          <Button onClick={() => toast.show({ title: 'Saved', status: 'success' })}>Success</Button>
          <Button colorScheme="warning" onClick={() => toast.show({ title: 'Heads up', message: 'Quota at 80%', status: 'warning' })}>Warning</Button>
          <Button colorScheme="danger" onClick={() => toast.show({ title: 'Error', message: 'Try again', status: 'danger' })}>Error</Button>
        </HStack>
      </Story>
    </VStack>
  );
};

export const ModalPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="lg">
      <Heading level={1}>Modal</Heading>
      <Story title="Open / close" code={`<Modal isOpen={open} onClose={() => setOpen(false)} title="…" />`}>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Modal title"
          footer={<>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>}
        >
          <Text>Press Esc, click outside, or use the close button to dismiss.</Text>
        </Modal>
      </Story>
    </VStack>
  );
};

export const TooltipPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Tooltip</Heading>
    <Story title="Placements" code={`<Tooltip label="Save" placement="top"><Button>Hover</Button></Tooltip>`}>
      <HStack gap="md">
        <Tooltip label="Top" placement="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip label="Right" placement="right"><Button variant="outline">Right</Button></Tooltip>
        <Tooltip label="Bottom" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip label="Left" placement="left"><Button variant="outline">Left</Button></Tooltip>
      </HStack>
    </Story>
  </VStack>
);

export const PopoverPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Popover</Heading>
    <Story title="With trigger" code={`<Popover trigger={<Button>Open</Button>}>…</Popover>`}>
      <Popover trigger={<Button variant="outline">Open popover</Button>}>
        <VStack gap="sm">
          <Heading level={5}>Settings</Heading>
          <Text tone="muted" size="sm">Any content can live here.</Text>
        </VStack>
      </Popover>
    </Story>
  </VStack>
);
