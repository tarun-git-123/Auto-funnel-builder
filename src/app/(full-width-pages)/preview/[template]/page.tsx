// app/preview/[template]/page.tsx

import templateMap from '@/templates/templateMap';
import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

interface Props {
  params: {
    template: string;
  };
}

export default async function PreviewTemplatePage({ params }: Props) {
  const { template } = (await params);

  const TemplateComponent: ComponentType | undefined = templateMap[template];
  if (!TemplateComponent) return notFound(); // Or custom fallback

  return <TemplateComponent />;
}
