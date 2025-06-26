interface IAccessHeaderProps {
  title: string;
  subtitle: string;
}

export function AccessHeader({ title, subtitle }: IAccessHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-balance">{subtitle}</p>
    </div>
  );
}
