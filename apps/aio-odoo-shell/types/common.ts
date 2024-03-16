import type { ComponentType } from 'react';

interface FacetedFilter {
  column: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
}

interface TableFilterProps {
  searchColum: string;
  placeholder: string;
}

export type { FacetedFilter, TableFilterProps };
