import { ArrowRight, Copy, Check } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { formatRupiah } from '../../utils/format.js'

export default function BottomBar({
  grandTotal = 0,
  activeStep = 0,
  onNext,
  onCopy,
  copied = false,
}) {
  const isLastStep = activeStep === 3

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t-2 border-border p-3.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total tagihan
          </span>
          <span className="text-xl font-extrabold tabular-nums text-foreground">
            {formatRupiah(grandTotal)}
          </span>
        </div>

        <div>
          {isLastStep ? (
            <Button
              variant="default"
              size="md"
              pill
              onClick={onCopy}
              className="px-5 text-foreground"
              aria-label="Salin ringkasan"
            >
              {copied ? (
                <>
                  <Check size={18} className="mr-1.5" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy size={18} className="mr-1.5" />
                  Salin
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="default"
              size="md"
              pill
              onClick={onNext}
              className="px-5 text-foreground"
              aria-label="Lanjut ke langkah berikutnya"
            >
              Lanjut
              <ArrowRight size={18} className="ml-1.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
