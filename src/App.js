import { QueryClientProvider, QueryClient } from 'react-query'

import Dashboard from './components/Dashboard'

import './style.scss'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false }},
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
