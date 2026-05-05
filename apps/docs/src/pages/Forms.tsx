import { useState } from 'react';
import {
  Button, IconButton, Input, TextArea, Checkbox, Radio, RadioGroup, Switch, Select, Slider,
  FormField, FormGroup, Heading, Text, VStack, HStack,
} from '@yavuzmercan/ui';
import { Heart, Settings, Search } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

export const ButtonPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Button</Heading>
    <Story title="Variants" code={`<Button variant="solid" />\n<Button variant="outline" />\n<Button variant="ghost" />\n<Button variant="link" />`}>
      <HStack gap="sm" wrap>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </HStack>
    </Story>
    <Story title="Color schemes" code={`<Button colorScheme="primary" />\n<Button colorScheme="danger" />`}>
      <HStack gap="sm" wrap>
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="secondary">Secondary</Button>
        <Button colorScheme="success">Success</Button>
        <Button colorScheme="warning">Warning</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button colorScheme="info">Info</Button>
      </HStack>
    </Story>
    <Story title="Sizes" code={`<Button size="sm" /> <Button size="lg" />`}>
      <HStack gap="sm" align="center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </HStack>
    </Story>
    <Story title="Loading & with icons" code={`<Button leftIcon={<Heart />} loading>Saving</Button>`}>
      <HStack gap="sm">
        <Button leftIcon={<Heart size={16} />}>With icon</Button>
        <Button loading>Saving</Button>
        <Button disabled>Disabled</Button>
        <IconButton aria-label="settings" icon={<Settings size={18} />} />
      </HStack>
    </Story>
    <PropsTable rows={[
      { prop: 'variant', type: "'solid' | 'outline' | 'ghost' | 'link'", defaultValue: "'solid'", description: 'Visual style.' },
      { prop: 'colorScheme', type: 'ColorScheme', defaultValue: "'primary'", description: 'Color from theme.' },
      { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Padding & font-size.' },
      { prop: 'loading', type: 'boolean', description: 'Shows a spinner and disables the button.' },
      { prop: 'leftIcon / rightIcon', type: 'ReactNode', description: 'Icon nodes shown beside the label.' },
      { prop: 'fullWidth', type: 'boolean', description: 'Stretches to fill the container width.' },
    ]} />
  </VStack>
);

export const InputPage = () => {
  const [v, setV] = useState('');
  return (
    <VStack gap="lg">
      <Heading level={1}>Input</Heading>
      <Story title="Basic" code={`<Input value={v} onChange={(e) => setV(e.target.value)} />`}>
        <Input value={v} onChange={(e) => setV(e.target.value)} placeholder="Type here…" />
      </Story>
      <Story title="Sizes" code={`<Input size="sm" />`}>
        <VStack gap="sm">
          <Input size="sm" placeholder="sm" />
          <Input size="md" placeholder="md" />
          <Input size="lg" placeholder="lg" />
        </VStack>
      </Story>
      <Story title="Invalid state" code={`<Input invalid />`}>
        <Input invalid placeholder="invalid" />
      </Story>
      <PropsTable rows={[
        { prop: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Visual size.' },
        { prop: 'invalid', type: 'boolean', description: 'Marks the input invalid; works with FormField.' },
      ]} />
    </VStack>
  );
};

export const TextAreaPage = () => (
  <VStack gap="lg">
    <Heading level={1}>TextArea</Heading>
    <Story title="Basic" code={`<TextArea placeholder="Bio" />`}>
      <TextArea placeholder="Tell us about yourself…" />
    </Story>
  </VStack>
);

export const CheckboxPage = () => {
  const [c, setC] = useState(false);
  return (
    <VStack gap="lg">
      <Heading level={1}>Checkbox</Heading>
      <Story title="Controlled" code={`<Checkbox checked={c} onChange={(e) => setC(e.target.checked)} label="Agree" />`}>
        <Checkbox checked={c} onChange={(e) => setC(e.target.checked)} label="I agree to the terms" />
      </Story>
    </VStack>
  );
};

export const RadioPage = () => {
  const [v, setV] = useState('a');
  return (
    <VStack gap="lg">
      <Heading level={1}>Radio</Heading>
      <Story title="RadioGroup" code={`<RadioGroup name="g" value={v} onChange={setV}>\n  <Radio value="a" label="A" />\n</RadioGroup>`}>
        <RadioGroup name="g" value={v} onChange={setV}>
          <HStack gap="md">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </HStack>
        </RadioGroup>
      </Story>
    </VStack>
  );
};

export const SwitchPage = () => {
  const [on, setOn] = useState(true);
  return (
    <VStack gap="lg">
      <Heading level={1}>Switch</Heading>
      <Story title="With label" code={`<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Notifications" />`}>
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Notifications" />
      </Story>
    </VStack>
  );
};

export const SelectPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Select</Heading>
    <Story title="Options" code={`<Select options={[{ value: 'tr', label: 'Türkçe' }]} />`}>
      <Select options={[
        { value: 'tr', label: 'Türkçe' },
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
      ]} placeholder="Pick a language" />
    </Story>
  </VStack>
);

export const SliderPage = () => {
  const [v, setV] = useState(40);
  return (
    <VStack gap="lg">
      <Heading level={1}>Slider</Heading>
      <Story title="Range input" code={`<Slider value={v} onChange={(e) => setV(+e.target.value)} />`}>
        <VStack gap="sm">
          <Text>Value: {v}</Text>
          <Slider value={v} onChange={(e) => setV(Number(e.target.value))} />
        </VStack>
      </Story>
    </VStack>
  );
};

export const FormFieldPage = () => (
  <VStack gap="lg">
    <Heading level={1}>FormField</Heading>
    <Text>Wraps any input with a label, help text and error state. Auto-wires <code>id</code> and <code>aria-describedby</code>.</Text>
    <Story title="Form fields" code={`<FormField label="Email" required helpText="Required for sign-in">\n  <Input />\n</FormField>`}>
      <FormGroup>
        <FormField label="Email" required helpText="We'll never share it.">
          <Input placeholder="you@example.com" />
        </FormField>
        <FormField label="Password" errorText="Password is too short.">
          <Input type="password" placeholder="••••••••" />
        </FormField>
        <FormField label="Search">
          <HStack gap="xs"><Search size={16} /><Input placeholder="Find anything…" /></HStack>
        </FormField>
      </FormGroup>
    </Story>
  </VStack>
);
