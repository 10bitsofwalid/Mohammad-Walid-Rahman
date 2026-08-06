import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';

export type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
};

export type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string;
	description?: string;
	contactInfo?: ContactInfoProps[];
	formSectionClassName?: string;
};

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}: ContactCardProps) {
	return (
		<div
			className={cn(
				'bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 backdrop-blur-md relative grid h-full w-full shadow-md md:grid-cols-2 lg:grid-cols-3 rounded-2xl',
				className,
			)}
			{...props}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-gray-400 dark:text-gray-500 z-10 pointer-events-none" />
			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-4 px-4 py-8 md:p-8">
					<h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-[#0F172A] dark:text-white">
						{title}
					</h1>
					<p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300">
						{description}
					</p>
					<div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 pt-4">
						{contactInfo?.map((info, index) => (
							<ContactInfo key={index} {...info} />
						))}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-gray-50/50 dark:bg-gray-800/40 flex h-full w-full items-center border-t border-gray-200 dark:border-gray-800 p-5 md:col-span-1 md:border-t-0 md:border-l rounded-r-2xl',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	className,
	...props
}: ContactInfoProps) {
	return (
		<div className={cn('flex items-center gap-3 py-3', className)} {...props}>
			<div className="bg-indigo-50 dark:bg-indigo-950/60 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800/60">
				<Icon className="h-5 w-5 text-[#4F46E5] dark:text-indigo-400" />
			</div>
			<div>
				<p className="font-medium text-[#0F172A] dark:text-white text-sm">{label}</p>
				<p className="text-muted-foreground text-xs text-gray-500 dark:text-gray-400">{value}</p>
			</div>
		</div>
	);
}
