import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type Resolver<T> = (
  values: T,
) => FormErrors<T> | Promise<FormErrors<T>>;

export type ValidateMode = 'onChange' | 'onBlur' | 'onSubmit';

export interface UseFormOptions<T extends Record<string, any>> {
  defaultValues: T;
  resolver?: Resolver<T>;
  /** When to validate before the first submit. Default `'onSubmit'`. */
  mode?: ValidateMode;
  /** When to validate after the first submit. Default `'onChange'`. */
  reValidateMode?: ValidateMode;
}

export interface FieldRegistration<V> {
  name: string;
  value: V;
  onChange: (eventOrValue: ChangeEvent<any> | V) => void;
  onBlur: () => void;
}

export interface FieldState {
  error: string | undefined;
  touched: boolean;
  dirty: boolean;
  invalid: boolean;
}

export interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitCount: number;

  setValue: <K extends keyof T>(name: K, value: T[K]) => void;
  setValues: (next: Partial<T> | ((prev: T) => T)) => void;
  setError: <K extends keyof T>(name: K, error: string | undefined) => void;
  setErrors: (next: FormErrors<T>) => void;
  setTouched: <K extends keyof T>(name: K, touched?: boolean) => void;
  reset: (next?: Partial<T>) => void;
  validate: (name?: keyof T) => Promise<boolean>;

  register: <K extends keyof T>(name: K) => FieldRegistration<T[K]>;
  getFieldState: <K extends keyof T>(name: K) => FieldState;

  handleSubmit: (
    onValid: (values: T) => void | Promise<void>,
    onInvalid?: (errors: FormErrors<T>) => void,
  ) => (e?: FormEvent) => Promise<void>;
}

const isEvent = (x: unknown): x is ChangeEvent<any> =>
  !!x && typeof x === 'object' && 'target' in (x as object) && 'preventDefault' in (x as object);

const extractValue = (eventOrValue: any): any => {
  if (!isEvent(eventOrValue)) return eventOrValue;
  const t = eventOrValue.target as HTMLInputElement;
  if (t.type === 'checkbox') return t.checked;
  if (t.type === 'number' || t.type === 'range') {
    return t.value === '' ? '' : t.valueAsNumber;
  }
  return t.value;
};

const shallowEqual = <T extends Record<string, any>>(a: T, b: T) => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if (a[k] !== b[k]) return false;
  return true;
};

export const useForm = <T extends Record<string, any>>(
  options: UseFormOptions<T>,
): UseFormReturn<T> => {
  const {
    defaultValues,
    resolver,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
  } = options;

  const defaultsRef = useRef(defaultValues);
  const [values, setValuesState] = useState<T>(defaultValues);
  const [errors, setErrorsState] = useState<FormErrors<T>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Track latest values via ref so async validators / handleSubmit see fresh state.
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const runResolver = useCallback(
    async (vals: T): Promise<FormErrors<T>> => {
      if (!resolver) return {};
      const result = await resolver(vals);
      return result ?? {};
    },
    [resolver],
  );

  const validate = useCallback(
    async (name?: keyof T): Promise<boolean> => {
      const all = await runResolver(valuesRef.current);
      if (name === undefined) {
        setErrorsState(all);
        return Object.keys(all).length === 0;
      }
      // Field-scoped: keep other field errors intact, replace just this field's.
      setErrorsState((prev) => ({ ...prev, [name]: all[name] }));
      return !all[name];
    },
    [runResolver],
  );

  const activeMode = isSubmitted ? reValidateMode : mode;

  const setValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      const next = { ...valuesRef.current, [name]: value };
      valuesRef.current = next;
      setValuesState(next);
      if (activeMode === 'onChange') {
        void validate(name);
      }
    },
    [activeMode, validate],
  );

  const setValues = useCallback(
    (next: Partial<T> | ((prev: T) => T)) => {
      const merged =
        typeof next === 'function'
          ? next(valuesRef.current)
          : { ...valuesRef.current, ...next };
      valuesRef.current = merged;
      setValuesState(merged);
    },
    [],
  );

  const setError = useCallback(
    <K extends keyof T>(name: K, error: string | undefined) => {
      setErrorsState((prev) => ({ ...prev, [name]: error }));
    },
    [],
  );

  const setErrors = useCallback((next: FormErrors<T>) => setErrorsState(next), []);

  const setTouched = useCallback(<K extends keyof T>(name: K, t: boolean = true) => {
    setTouchedState((prev) => ({ ...prev, [name]: t }));
  }, []);

  const reset = useCallback((next?: Partial<T>) => {
    const merged = next ? { ...defaultsRef.current, ...next } : defaultsRef.current;
    setValuesState(merged);
    valuesRef.current = merged;
    setErrorsState({});
    setTouchedState({});
    setIsSubmitted(false);
    setSubmitCount(0);
  }, []);

  const onBlurField = useCallback(
    (name: keyof T) => {
      setTouchedState((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
      if (activeMode === 'onBlur') {
        void validate(name);
      }
    },
    [activeMode, validate],
  );

  const register = useCallback(
    <K extends keyof T>(name: K): FieldRegistration<T[K]> => ({
      name: String(name),
      value: valuesRef.current[name],
      onChange: (eventOrValue) => setValue(name, extractValue(eventOrValue) as T[K]),
      onBlur: () => onBlurField(name),
    }),
    [setValue, onBlurField],
  );

  const dirty = useMemo<Partial<Record<keyof T, boolean>>>(() => {
    const out: Partial<Record<keyof T, boolean>> = {};
    const def = defaultsRef.current;
    for (const k of Object.keys(values) as Array<keyof T>) {
      if (values[k] !== def[k]) out[k] = true;
    }
    return out;
  }, [values]);

  const isDirty = useMemo(
    () => !shallowEqual(values, defaultsRef.current),
    [values],
  );

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors],
  );

  const getFieldState = useCallback(
    <K extends keyof T>(name: K): FieldState => ({
      error: errors[name],
      touched: !!touched[name],
      dirty: !!dirty[name],
      invalid: !!errors[name],
    }),
    [errors, touched, dirty],
  );

  const handleSubmit = useCallback(
    (
      onValid: (values: T) => void | Promise<void>,
      onInvalid?: (errors: FormErrors<T>) => void,
    ) =>
      async (e?: FormEvent) => {
        e?.preventDefault?.();
        setSubmitCount((c) => c + 1);
        setIsSubmitting(true);
        try {
          const fresh = valuesRef.current;
          const allErrors = await runResolver(fresh);
          setErrorsState(allErrors);
          // Mark all fields touched on submit so error UIs show.
          const allTouched: Partial<Record<keyof T, boolean>> = {};
          for (const k of Object.keys(fresh)) allTouched[k as keyof T] = true;
          setTouchedState(allTouched);
          setIsSubmitted(true);
          if (Object.keys(allErrors).filter((k) => allErrors[k as keyof T]).length > 0) {
            onInvalid?.(allErrors);
            return;
          }
          await onValid(fresh);
        } finally {
          setIsSubmitting(false);
        }
      },
    [runResolver],
  );

  return {
    values,
    errors,
    touched,
    dirty,
    isValid,
    isDirty,
    isSubmitting,
    isSubmitted,
    submitCount,
    setValue,
    setValues,
    setError,
    setErrors,
    setTouched,
    reset,
    validate,
    register,
    getFieldState,
    handleSubmit,
  };
};
