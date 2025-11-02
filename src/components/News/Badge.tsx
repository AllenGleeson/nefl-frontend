import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Badge({ children }: Props) {
    return (
        <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-[var(--md-surface-container-low)] text-[var(--md-on-surface-variant)] font-medium">
            {children}
        </span>
    )
}