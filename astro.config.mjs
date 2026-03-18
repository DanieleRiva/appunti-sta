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
							label: '💻 Programmazione 1',
							collapsed: true,
							items: [
								{ label: 'Introduzione', slug: 'lezioni/04-programmazione-1/01-basi' },
								{ label: 'Costanti e Variabili', slug: 'lezioni/04-programmazione-1/02-costanti-variabili' },
								{ label: 'Blocchi di Codice e Funzioni', slug: 'lezioni/04-programmazione-1/03-funzioni' },
								{ label: 'setup()', slug: 'lezioni/04-programmazione-1/04-setup' },
								{ label: 'loop()', slug: 'lezioni/04-programmazione-1/05-loop' },
								{ label: 'if, else, else if', slug: 'lezioni/04-programmazione-1/06-if' },
								{ label: 'Logica Booleana', slug: 'lezioni/04-programmazione-1/07-logica-booleana' },
								{ label: 'switch', slug: 'lezioni/04-programmazione-1/08-switch' },
								{
									label: '🔄️ Cicli',
									autogenerate: { directory: 'lezioni/04-programmazione-1/09-cicli' },
									collapsed: true,
								},
								{ label: 'Array', slug: 'lezioni/04-programmazione-1/10-array' }
							]
						},
						{
							label: '🖥️ Programmazione 2',
							autogenerate: { directory: 'lezioni/05-programmazione-2' },
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