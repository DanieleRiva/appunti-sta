import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova';

export default defineConfig({
	site: 'https://danieleriva.github.io',
	base: '/appunti-sta',

	integrations: [
		starlight({
			title: 'STA',
			logo: {
				src: './public/favicon.svg',
			},
			favicon: './public/favicon.svg',
			customCss: [
				'./src/custom.css',
			],
			description: 'Appunti e materiale per la classe seconda',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/DanieleRiva' }
			],

			plugins: [
				starlightThemeNova(),
			],

			head: [
				{
					tag: 'script',
					content: `
                        function initProgressBar() {
                            let bar = document.getElementById('scroll-progress');
                            if (!bar) {
                                bar = document.createElement('div');
                                bar.id = 'scroll-progress';
                                bar.style.position = 'fixed';
                                bar.style.top = '0';
                                bar.style.left = '0';
                                bar.style.height = '4px';
                                bar.style.backgroundColor = 'var(--sl-color-accent)'; 
                                bar.style.zIndex = '9999';
                                bar.style.width = '0%';
                                bar.style.transition = 'width 0.1s ease-out';
                                document.body.appendChild(bar);
                            }
                            
                            window.addEventListener('scroll', () => {
                                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                                if (height > 0) {
                                    const scrolled = (winScroll / height) * 100;
                                    bar.style.width = scrolled + '%';
                                } else {
                                    bar.style.width = '0%';
                                }
                            });
                        }
                        
                        document.addEventListener('DOMContentLoaded', initProgressBar);
                    `
				}
			],

			sidebar: [
				{
					label: '📚 Corso di STA',
					items: [
						{
							label: 'Introduzione al Corso',
							link: '/lezioni/',
						},
						{
							label: '⚡ Elettricità & Circuiti',
							autogenerate: { directory: 'lezioni/01-elettricita-e-circuiti' },
							collapsed: true,
						},
						{
							label: '🔌 Circuiti Fisici',
							autogenerate: { directory: 'lezioni/02-circuiti-fisici' },
							collapsed: true,
						},
						{
							label: '♾️ Arduino',
							autogenerate: { directory: 'lezioni/03-arduino' },
							collapsed: true,
						},
						{
							label: '💻 Programmazione',
							autogenerate: { directory: 'lezioni/04-programmazione-cpp' },
							collapsed: true,
						}
					]
				},
				{
					label: '📝 Esercizi',
					autogenerate: { directory: 'esercizi' },
					collapsed: false,
				},
				{
					label: '🛠️ Progetti',
					autogenerate: { directory: 'progetti' },
					collapsed: false,
				}
			],
		}),
	],
});