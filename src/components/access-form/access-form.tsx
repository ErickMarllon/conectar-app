import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orContinue } from '@/views/Auth/constants/common';
import { cn } from '@/lib/utils';
import { AccessHeader } from './components/AccessHeader';
import { AccessSocialButtons } from './components/AccessSocialButtons';
import { AccessFooter } from './components/AccessFooter';
import { AccessTerms } from './components/AccessTerms';
import type { IAccessData } from '@/views/Auth/interfaces/common';
import { AccessFieldsRenderer } from '../access-field-renderer';

interface AccessFormProps {
  schema: any;
  mock: IAccessData;
  onSubmit: (data: any) => void;
  className?: string;
}

export function AccessForm({ schema, mock, onSubmit, className }: AccessFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  });

  return (
    <FormProvider {...form}>
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6', className)}>
          <Card>
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-6 md:p-8"
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
              >
                <div className="flex flex-col gap-6">
                  <AccessHeader title={mock.title} subtitle={mock.subtitle} />

                  <AccessFieldsRenderer fields={mock.fields} />
                  <Button type="submit" className="w-full">
                    {mock.AccessButtonText}
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                      {orContinue}
                    </span>
                  </div>
                  <AccessSocialButtons />
                  <AccessFooter footer={mock.footer} />
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="https://placehold.co/380x578/png"
                  alt="Imagem"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <AccessTerms />
        </div>
      </div>
    </FormProvider>
  );
}
