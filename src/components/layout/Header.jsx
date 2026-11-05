import { useState } from 'react'
import { RotateCcw, Moon, Sun, ReceiptText } from 'lucide-react'
import IconButton from '../ui/IconButton.jsx'
import Button from '../ui/Button.jsx'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'
import { useBillDispatch } from '../../context/BillContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Header({ isDesktop = false, onCopy = null, hasData = false }) {
  const dispatch = useBillDispatch()
  const { theme, toggleTheme } = useTheme()
  const [showConfirm, setShowConfirm] = useState(false)

  function handleReset() {
    dispatch({ type: 'RESET' })
    setShowConfirm(false)
  }

  if (isDesktop) {
    return (
      <>
        <header className="h-16 border-b-2 border-border bg-card px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary border-2 border-border flex items-center justify-center font-black shadow-[2px_2px_0_0_var(--border)]">
              <ReceiptText size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-foreground leading-none">
                Split Bill
              </h1>
              <span className="text-xs font-semibold text-muted-foreground">
                Bagi rata & adil
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasData && onCopy && (
              <Button
                variant="default"
                size="sm"
                pill
                onClick={onCopy}
                aria-label="Salin ringkasan"
              >
                Salin ringkasan
              </Button>
            )}

            <IconButton
              onClick={toggleTheme}
              aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(true)}
              aria-label="Reset semua data"
            >
              <RotateCcw size={16} className="mr-1.5" />
              Reset
            </Button>
          </div>
        </header>

        <ConfirmDialog
          open={showConfirm}
          title="Reset semua?"
          message="Semua data peserta, pesanan, dan biaya akan dihapus bersih. Tindakan ini tidak bisa dibatalkan."
          confirmLabel="Ya, Reset"
          onConfirm={handleReset}
          onCancel={() => setShowConfirm(false)}
        />
      </>
    )
  }

  return (
    <>
      <header className="flex items-center justify-between py-3 mb-2">
        <IconButton
          variant="default"
          onClick={() => setShowConfirm(true)}
          aria-label="Reset semua"
        >
          <RotateCcw size={18} />
        </IconButton>

        <div className="text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">
            Split Bill
          </h1>
        </div>

        <IconButton
          variant="default"
          onClick={toggleTheme}
          aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
      </header>

      <ConfirmDialog
        open={showConfirm}
        title="Reset semua?"
        message="Semua data peserta, pesanan, dan biaya akan dihapus bersih."
        confirmLabel="Ya, Reset"
        onConfirm={handleReset}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
