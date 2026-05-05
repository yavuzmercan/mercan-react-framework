import { Heading, Text, VStack, Grid, Card, CardBody, Box, iconList, Search, Check, Heart } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const USAGE = `import { Search, Check, Heart } from '@yavuzmercan/ui';

<Search size={20} />
<Check color="var(--mf-color-success)" />
<Heart size={24} strokeWidth={1.5} />`;

const CUSTOM = `import { createIcon } from '@yavuzmercan/ui';

export const Logo = createIcon({
  displayName: 'Logo',
  paths: <path d="M4 12 L20 12 M12 4 L12 20" />,
});`;

export const IconsPage = () => {
  const renderable = Object.entries(iconList) as [string, React.ComponentType<{ size?: number }>][];
  return (
    <VStack gap="lg">
      <Heading level={1}>Icons</Heading>
      <Text>
        <code>@yavuzmercan/ui</code> ships ~30 commonly-needed SVG icons, all using <code>currentColor</code>
        so they inherit the surrounding text color.
      </Text>
      <Story title="Usage" code={USAGE}>
        <Box>
          <Search size={20} /> <Check size={20} /> <Heart size={20} />
        </Box>
      </Story>

      <Heading level={3}>All icons</Heading>
      <Grid columns={6} gap="md">
        {renderable.map(([name, Icon]) => (
          <Card key={name}>
            <CardBody>
              <VStack gap="xs" align="center">
                <Box style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
                  <Icon size={24} />
                </Box>
                <Text size="xs" tone="muted" align="center" truncate>{name}</Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Heading level={3}>Building custom icons</Heading>
      <Story title="createIcon" code={CUSTOM}>
        <Text tone="muted" size="sm">
          Pass any JSX (paths, polylines, circles…) and you get a typed icon component
          with the same <code>size</code> / <code>color</code> / <code>strokeWidth</code> API.
        </Text>
      </Story>

      <Heading level={3}>Icon props</Heading>
      <PropsTable
        rows={[
          { prop: 'size', type: 'number | string', defaultValue: '20', description: 'Width and height in pixels (or any CSS length).' },
          { prop: 'color', type: 'string', defaultValue: "'currentColor'", description: 'Stroke or fill color.' },
          { prop: 'strokeWidth', type: 'number', defaultValue: '2', description: 'SVG stroke width.' },
          { prop: 'title', type: 'string', description: 'If set, the SVG becomes role="img" with an accessible title.' },
        ]}
      />
    </VStack>
  );
};
