import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@/': path.resolve(__dirname, './src'),
			'@/app': path.resolve(__dirname, './src/app'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/types': path.resolve(__dirname, './src/types'),
			'@/services': path.resolve(__dirname, './src/services'),
			'@/queries': path.resolve(__dirname, './src/queries'),
			'@/pages': path.resolve(__dirname, './src/pages'),
			'@/shared': path.resolve(__dirname, './src/shared')
		}
	}
})
