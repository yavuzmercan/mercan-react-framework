import type { FormErrors, Resolver } from './useForm';

/**
 * Minimal subset of zod's API we depend on. Declared structurally so this
 * adapter does not need `zod` as a runtime dependency — consumers who use
 * zod will pass a real schema and the shapes match.
 */
interface ZodIssueLike {
  path: Array<string | number>;
  message: string;
}

interface ZodSafeParseResult<T> {
  success: boolean;
  data?: T;
  error?: { issues: ZodIssueLike[] };
}

interface ZodSchemaLike<T> {
  safeParse: (input: unknown) => ZodSafeParseResult<T>;
  safeParseAsync?: (input: unknown) => Promise<ZodSafeParseResult<T>>;
}

/**
 * Adapt a zod schema into a form Resolver.
 *
 * @example
 * import { z } from 'zod';
 * const schema = z.object({ name: z.string().min(2), email: z.string().email() });
 * const form = useForm({ defaultValues: { name: '', email: '' }, resolver: zodResolver(schema) });
 */
export const zodResolver = <T extends Record<string, any>>(
  schema: ZodSchemaLike<T>,
): Resolver<T> => {
  return async (values) => {
    const result = schema.safeParseAsync
      ? await schema.safeParseAsync(values)
      : schema.safeParse(values);
    if (result.success) return {};
    const errors: FormErrors<T> = {};
    const issues = result.error?.issues ?? [];
    for (const issue of issues) {
      const key = issue.path[0] as keyof T | undefined;
      if (key !== undefined && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return errors;
  };
};
