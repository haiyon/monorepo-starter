import React from 'react';

import { Shell } from '@/components/shell/shell';

export const Page = ({ children }: { children: React.ReactNode }) => {
  return <Shell>{children}</Shell>;
};
