import type {ComponentProps, ReactNode} from "react";
import {tv, type VariantProps} from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

const iconButton = tv({
    base: 'flex items-center justify-center rounded-lg hover:bg-zinc-700',
    variants: {
        size: {
            sm: 'size-6',
            md: 'size-8',
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

interface IconButtonProps extends ComponentProps<'button'>, VariantProps<typeof iconButton> {
    icon: ReactNode,
}

export function IconButton({ icon, size, className, ...props}: IconButtonProps) {
    return (
        <button
            type="button"
            className={twMerge(iconButton({size}), className)}
            {...props}
        >
            {icon}
        </button>
    )
}