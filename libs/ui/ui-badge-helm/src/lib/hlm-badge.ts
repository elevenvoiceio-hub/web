import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

const badgeVariants = cva(
	'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&_ng-icon]:pointer-events-none [&_ng-icon]:size-3',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
				secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
				destructive:
					'bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent text-white',
				outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success:
          'bg-[#f0fdf4]/95 text-[#16a34a] border-[#bbf7d0] dark:bg-[#22c55e]/16 dark:text-[#22c55e] dark:border-[#15803d]/36',
        error:
          'bg-[#fef2f2]/95 text-[#dc2626] border-[#fecaca] dark:bg-[#ef4444]/16 dark:text-[#ef4444] dark:border-[#b91c1c]/36',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
	selector: '[hlmBadge]',
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmBadge {
	protected readonly _computedClass = computed(() => hlm(badgeVariants({ variant: this.variant() }), this.userClass()));

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly variant = input<BadgeVariants['variant']>('default');
}
