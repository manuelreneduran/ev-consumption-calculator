import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-primary-light",
  {
    variants: {
      variant: {
        default:
          "bg-primary-default text-white shadow hover:bg-primary-light dark:bg-primary-50 dark:text-primary dark:hover:bg-primary-light",
        destructive:
          "bg-red-500 text-primary-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-primary-50 dark:hover:bg-red-900/90",
        outline:
          "border border-primary-200 bg-white shadow-sm hover:bg-primary-100 hover:text-primary-dark dark:border-primary-dark dark:bg-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-50",
        secondary:
          "bg-primary-light text-primary-dark shadow-sm hover:bg-primary-light dark:bg-primary-dark dark:text-primary-light dark:hover:bg-primary-dark/80",
        ghost:
          "hover:bg-primary-light hover:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-light",
        link: "text-primary-dark underline-offset-4 hover:underline dark:text-primary-light",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
