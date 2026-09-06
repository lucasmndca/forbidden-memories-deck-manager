import { useTranslations } from "next-intl"

export function Header() {
    const t = useTranslations('Header');
    return (
        <header className="mb-8 md:mb-12 border-b border-neutral-900 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <p className="text-xs font-mono tracking-widest text-amber-500 font-bold uppercase">PS1 Retro Utility</p>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                    {t('title')}
                </h1>
            </div>
            <p className="text-xs text-neutral-500 md:text-right font-mono max-w-xs">
                {t('subtitle')}
            </p>
        </header>
    )
}