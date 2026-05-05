import {
  Avatar, Badge, Tag, Card, CardHeader, CardBody, CardFooter, Progress, Spinner, Skeleton,
  List, ListItem, Heading, Text, VStack, HStack, Button,
} from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

export const AvatarPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Avatar</Heading>
    <Story title="Sizes" code={`<Avatar name="Ada Lovelace" size="md" />`}>
      <HStack gap="md" align="center">
        <Avatar name="A" size="sm" />
        <Avatar name="Ada Lovelace" size="md" />
        <Avatar name="Linus Torvalds" size="lg" />
        <Avatar size="xl" src="https://i.pravatar.cc/120?img=12" alt="random" />
      </HStack>
    </Story>
    <PropsTable rows={[
      { prop: 'src', type: 'string', description: 'Image URL. Falls back to initials on error or when omitted.' },
      { prop: 'name', type: 'string', description: 'Used to derive initials.' },
      { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: '' },
    ]} />
  </VStack>
);

export const BadgePage = () => (
  <VStack gap="lg">
    <Heading level={1}>Badge</Heading>
    <Story title="Color schemes" code={`<Badge colorScheme="success">Active</Badge>`}>
      <HStack gap="sm" wrap>
        <Badge colorScheme="primary">Primary</Badge>
        <Badge colorScheme="success">Success</Badge>
        <Badge colorScheme="warning">Warning</Badge>
        <Badge colorScheme="danger">Danger</Badge>
        <Badge colorScheme="info">Info</Badge>
        <Badge colorScheme="neutral">Neutral</Badge>
      </HStack>
    </Story>
  </VStack>
);

export const TagPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Tag</Heading>
    <Story title="Closable" code={`<Tag onClose={() => …}>react</Tag>`}>
      <HStack gap="sm" wrap>
        <Tag>react</Tag>
        <Tag>typescript</Tag>
        <Tag onClose={() => {}}>closable</Tag>
      </HStack>
    </Story>
  </VStack>
);

export const CardPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Card</Heading>
    <Story title="Header / Body / Footer" code={`<Card>\n  <CardHeader>…</CardHeader>\n  <CardBody>…</CardBody>\n  <CardFooter>…</CardFooter>\n</Card>`}>
      <Card>
        <CardHeader><Heading level={5}>Project Falcon</Heading></CardHeader>
        <CardBody><Text tone="muted">A short description of what's inside.</Text></CardBody>
        <CardFooter>
          <HStack gap="sm" justify="end" style={{ width: '100%' }}>
            <Button variant="ghost">Cancel</Button>
            <Button>Save</Button>
          </HStack>
        </CardFooter>
      </Card>
    </Story>
    <Story title="With shadow" code={`<Card shadow>…</Card>`}>
      <Card shadow><CardBody><Text>Lifted off the page.</Text></CardBody></Card>
    </Story>
  </VStack>
);

export const ProgressPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Progress</Heading>
    <Story title="Determinate" code={`<Progress value={62} />`}><Progress value={62} /></Story>
    <Story title="Indeterminate" code={`<Progress indeterminate />`}><Progress indeterminate /></Story>
  </VStack>
);

export const SpinnerPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Spinner</Heading>
    <Story title="Sizes" code={`<Spinner size="lg" />`}>
      <HStack gap="md" align="center">
        <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
      </HStack>
    </Story>
  </VStack>
);

export const SkeletonPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Skeleton</Heading>
    <Story title="Loading placeholder" code={`<Skeleton width="60%" /> <Skeleton circle width={48} />`}>
      <VStack gap="sm">
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <Skeleton circle width={48} />
      </VStack>
    </Story>
  </VStack>
);

export const ListPage = () => (
  <VStack gap="lg">
    <Heading level={1}>List</Heading>
    <Story title="Interactive list" code={`<List interactive><ListItem>…</ListItem></List>`}>
      <Card>
        <List interactive>
          <ListItem>
            <HStack gap="md" align="center">
              <Avatar name="Item one" size="sm" />
              <Text weight="medium">First item</Text>
              <Badge colorScheme="primary">5</Badge>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack gap="md" align="center">
              <Avatar name="Item two" size="sm" />
              <Text weight="medium">Second item</Text>
              <Badge colorScheme="success">OK</Badge>
            </HStack>
          </ListItem>
        </List>
      </Card>
    </Story>
  </VStack>
);
