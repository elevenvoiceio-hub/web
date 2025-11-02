import { Directive, computed, input } from '@angular/core';
import { BrnTabsTrigger } from '@spartan-ng/brain/tabs';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmTabsTrigger]',
	hostDirectives: [{ directive: BrnTabsTrigger, inputs: ['brnTabsTrigger: hlmTabsTrigger', 'disabled'] }],
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmTabsTrigger {
	public readonly triggerFor = input.required<string>({ alias: 'hlmTabsTrigger' });
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm(
			'inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-2.25 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow-sm',
      this.userClass(),
		),
	);
}
