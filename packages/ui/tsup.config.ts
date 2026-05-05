import { defineConfig } from 'tsup';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    icons: 'src/icons/index.ts',
    components: 'src/components/index.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.build.json',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    const distDir = join(process.cwd(), 'dist');
    if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
    copyFileSync(join(process.cwd(), 'src', 'styles.css'), join(distDir, 'styles.css'));
  },
});
