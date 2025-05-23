import * as React from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// import { persistor, store } from "../store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
});

export default function ProviderClient(props: React.PropsWithChildren) {
  const {children} = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
