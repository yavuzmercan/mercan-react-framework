import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../components/display/Tag';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'tag' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['react', 'typescript', 'design', 'a11y']);
    return (
      <HStack gap="sm" wrap>
        {tags.map((t) => (
          <Tag key={t} onClose={() => setTags((arr) => arr.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        {tags.length === 0 && <span style={{ color: 'var(--mf-color-textMuted)' }}>All tags removed.</span>}
      </HStack>
    );
  },
};
