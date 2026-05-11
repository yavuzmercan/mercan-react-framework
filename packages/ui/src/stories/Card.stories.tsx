import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '../components/display/Card';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { Button } from '../components/forms/Button';
import { HStack, VStack } from '../components/layout/Stack';
import { Spacer } from '../components/layout/Spacer';
import { Image } from '../components/display/Image';

const meta: Meta<typeof Card> = {
  title: 'Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: { shadow: false },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardHeader>
        <Heading level={5}>Card title</Heading>
      </CardHeader>
      <CardBody>
        <Text tone="muted">A bordered card with header, body, and footer.</Text>
      </CardBody>
      <CardFooter>
        <HStack gap="sm">
          <Spacer />
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </HStack>
      </CardFooter>
    </Card>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <Card shadow style={{ maxWidth: 360 }}>
      <CardBody>
        <VStack gap="sm">
          <Heading level={5}>Elevated card</Heading>
          <Text tone="muted">Cards lift off the page when `shadow` is set.</Text>
          <Image
            rounded
            src="https://picsum.photos/400/200"
            alt="random"
            style={{ aspectRatio: '2/1', objectFit: 'cover' }}
          />
        </VStack>
      </CardBody>
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardBody>
        <Text>Header and footer are optional.</Text>
      </CardBody>
    </Card>
  ),
};
