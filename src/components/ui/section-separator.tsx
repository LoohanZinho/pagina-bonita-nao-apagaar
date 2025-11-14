import { cn } from '@/lib/utils';

export function SectionSeparator({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white py-10 px-4', className)}>
      <div className="w-full max-w-4xl mx-auto h-px bg-neutral-200" />
    </div>
  );
}
