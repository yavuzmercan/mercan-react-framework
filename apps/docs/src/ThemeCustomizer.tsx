import { Switch } from '@yavuzmercan/ui';
import { useColorMode } from '@yavuzmercan/ui';
import type { PresetName } from '@yavuzmercan/ui';

export interface CustomizerState {
  primary: string;
  secondary: string;
  /** Dark-mode override; if empty string, falls back to `primary`. */
  darkPrimary: string;
  /** Dark-mode override; if empty string, falls back to `secondary`. */
  darkSecondary: string;
  /** Active built-in preset, or 'system' for the framework defaults. */
  preset: 'system' | PresetName;
  radius: number;
  font: string;
}

export const DEFAULT_CUSTOMIZER: CustomizerState = {
  primary: '#3b6cff',
  secondary: '#6b7280',
  darkPrimary: '',
  darkSecondary: '',
  preset: 'system',
  radius: 8,
  font: 'Inter',
};

interface Props {
  state: CustomizerState;
  onChange: (state: CustomizerState) => void;
}

export const FONT_OPTIONS = [
  'System',
  'Inter',
  'Roboto',
  'Open Sans',
  'Plus Jakarta Sans',
  'Sora',
  'Manrope',
  'Space Grotesk',
  'DM Sans',
  'Poppins',
  'Lora',
  'Source Serif 4',
];

export const ThemeCustomizer = ({ state, onChange }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="theme-customizer">
      <label>
        Primary
        <input
          type="color"
          className="color-input"
          value={state.primary}
          onChange={(e) => onChange({ ...state, primary: e.target.value })}
        />
      </label>
      <label>
        Secondary
        <input
          type="color"
          className="color-input"
          value={state.secondary}
          onChange={(e) => onChange({ ...state, secondary: e.target.value })}
        />
      </label>
      <label>
        Radius {state.radius}px
        <input
          type="range"
          min={0}
          max={20}
          value={state.radius}
          onChange={(e) => onChange({ ...state, radius: Number(e.target.value) })}
          style={{ width: 120 }}
        />
      </label>
      <label>
        Font
        <select
          value={state.font}
          onChange={(e) => onChange({ ...state, font: e.target.value })}
          style={{
            background: 'var(--mf-color-surface)',
            color: 'var(--mf-color-text)',
            border: '1px solid var(--mf-color-border)',
            borderRadius: 'var(--mf-radius-sm)',
            padding: '4px 8px',
            fontFamily: 'inherit',
            fontSize: 'var(--mf-fs-sm)',
          }}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>
      <Switch
        checked={colorMode === 'dark'}
        onChange={toggleColorMode}
        label={colorMode === 'dark' ? 'Dark' : 'Light'}
      />
    </div>
  );
};
