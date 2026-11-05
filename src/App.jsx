import { BillProvider } from './context/BillContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { useMediaQuery } from './hooks/useMediaQuery.js'
import MobileLayout from './components/layout/MobileLayout.jsx'
import DesktopLayout from './components/layout/DesktopLayout.jsx'

function BillApp() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return isDesktop ? <DesktopLayout /> : <MobileLayout />
}

export default function App() {
  return (
    <ThemeProvider>
      <BillProvider>
        <BillApp />
      </BillProvider>
    </ThemeProvider>
  )
}
