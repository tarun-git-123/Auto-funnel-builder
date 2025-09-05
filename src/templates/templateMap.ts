import { ComponentType } from 'react';
import template1 from '@/templates/template1/app';
import template2 from '@/templates/template2/app';
import template3 from '@/templates/template3';

const templates: Record<string, ComponentType> = {
    template1,
    template2,
    template3
};

export default templates;