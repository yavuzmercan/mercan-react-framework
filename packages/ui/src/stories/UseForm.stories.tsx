import type { Meta, StoryObj } from '@storybook/react';
import { useForm, type Resolver } from '../core';
import { Input } from '../components/forms/Input';
import { Combobox } from '../components/forms/Combobox';
import { MultiSelect } from '../components/forms/MultiSelect';
import { DatePicker } from '../components/forms/DatePicker';
import { Checkbox } from '../components/forms/Checkbox';
import { FormField } from '../components/forms/FormField';
import { Button } from '../components/forms/Button';
import { Card, CardBody } from '../components/display/Card';
import { Grid, GridItem } from '../components/layout/Grid';
import { HStack, VStack } from '../components/layout/Stack';
import { Spacer } from '../components/layout/Spacer';
import { Text } from '../components/typography/Text';
import { Check } from '../icons';

const meta: Meta = {
  title: 'Hooks/useForm',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight form hook with values, errors, touched, dirty, submit lifecycle, and a pluggable resolver. Drop the result of `form.register(name)` onto an Input — it understands both DOM events and raw values from custom inputs (Combobox, DatePicker, MultiSelect).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface SignupValues {
  fullName: string;
  email: string;
  country: string;
  interests: string[];
  birthDate: Date | null;
  agree: boolean;
}

const COUNTRIES = [
  { value: 'tr', label: 'Türkiye' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const INTERESTS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'design', label: 'Design systems' },
  { value: 'a11y', label: 'Accessibility' },
];

const signupResolver: Resolver<SignupValues> = (v) => {
  const errors: Partial<Record<keyof SignupValues, string>> = {};
  if (v.fullName.trim().length < 2) errors.fullName = 'At least 2 characters';
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = 'Invalid email';
  if (!v.country) errors.country = 'Please pick a country';
  if (v.interests.length === 0) errors.interests = 'Pick at least one';
  if (!v.birthDate) errors.birthDate = 'Required';
  else if (v.birthDate > new Date()) errors.birthDate = 'Cannot be in the future';
  if (!v.agree) errors.agree = 'You must accept the terms';
  return errors;
};

const SignupForm = () => {
  const form = useForm<SignupValues>({
    defaultValues: {
      fullName: '',
      email: '',
      country: '',
      interests: [],
      birthDate: null,
      agree: false,
    },
    resolver: signupResolver,
    reValidateMode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 400));
    alert(`Submitted!\n\n${JSON.stringify(values, null, 2)}`);
    form.reset();
  });

  const fs = form.getFieldState;

  return (
    <Card>
      <CardBody>
        <form onSubmit={onSubmit} noValidate>
          <Grid columns={{ base: 1, md: 2 }} gap="md">
            <FormField label="Full name" required errorText={fs('fullName').touched ? fs('fullName').error : undefined}>
              <Input placeholder="Ada Lovelace" {...form.register('fullName')} />
            </FormField>
            <FormField label="Email" required errorText={fs('email').touched ? fs('email').error : undefined}>
              <Input type="email" placeholder="ada@example.com" {...form.register('email')} />
            </FormField>
            <FormField label="Country" required errorText={fs('country').touched ? fs('country').error : undefined}>
              <Combobox
                options={COUNTRIES}
                value={form.values.country}
                onChange={(v) => form.setValue('country', v)}
                placeholder="Search countries…"
                invalid={fs('country').touched && !!fs('country').error}
              />
            </FormField>
            <FormField label="Birth date" required errorText={fs('birthDate').touched ? fs('birthDate').error : undefined}>
              <DatePicker
                value={form.values.birthDate}
                onChange={(d) => form.setValue('birthDate', d)}
                maxDate={new Date()}
                invalid={fs('birthDate').touched && !!fs('birthDate').error}
              />
            </FormField>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormField label="Interests" required errorText={fs('interests').touched ? fs('interests').error : undefined}>
                <MultiSelect
                  options={INTERESTS}
                  value={form.values.interests}
                  onChange={(v) => form.setValue('interests', v)}
                  placeholder="Pick a few…"
                />
              </FormField>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Checkbox
                checked={form.values.agree}
                onChange={(e) => form.setValue('agree', e.target.checked)}
                label="I accept the terms and conditions"
              />
              {fs('agree').touched && fs('agree').error && (
                <Text tone="danger" size="sm">{fs('agree').error}</Text>
              )}
            </GridItem>
          </Grid>
          <HStack gap="sm" align="center" style={{ marginTop: 'var(--mf-spacing-lg)' }}>
            <Text tone="muted" size="sm">
              isDirty: <code>{String(form.isDirty)}</code> · isValid: <code>{String(form.isValid)}</code>
              {' '}· submitCount: <code>{form.submitCount}</code>
            </Text>
            <Spacer />
            <Button variant="ghost" type="button" onClick={() => form.reset()} disabled={!form.isDirty}>
              Reset
            </Button>
            <Button type="submit" loading={form.isSubmitting} leftIcon={<Check size={16} />}>
              Submit
            </Button>
          </HStack>
        </form>
      </CardBody>
    </Card>
  );
};

export const Signup: Story = {
  render: () => (
    <VStack gap="md" style={{ maxWidth: 720 }}>
      <Text tone="muted">
        Errors surface on submit, then the form switches to <code>onChange</code> mode so they clear as
        you correct each field. Try clicking <strong>Submit</strong> on an empty form.
      </Text>
      <SignupForm />
    </VStack>
  ),
};
