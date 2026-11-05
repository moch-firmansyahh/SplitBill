import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import Toast from '../ui/Toast.jsx'
import { formatRupiah } from '../../utils/format.js'

export default function TotalCard({
  grandTotal = 0,
  copyText = '',
  className = '',
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!copyText) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback if clipboard API not permitted
    }
  }

  return (
    <>
      <Card
        variant="ink"
        className={`p-6 rounded-2xl flex flex-col justify-between shadow-[4px_4px_0_0_var(--border)] ${className}`}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-wider opacity-75">
            Total Seluruh Tagihan
          </span>
          <p className="text-4xl lg:text-5xl font-extrabold tabular-nums tracking-tight mt-1 mb-4">
            {formatRupiah(grandTotal)}
          </p>
        </div>

        {grandTotal > 0 && (
          <Button
            variant="default"
            size="lg"
            pill
            onClick={handleCopy}
            className="w-full text-foreground"
            aria-label="Salin ringkasan"
          >
            {copied ? (
              <>
                <Check size={20} className="mr-2" />
                Tersalin!
              </>
            ) : (
              <>
                <Copy size={20} className="mr-2" />
                Salin untuk WhatsApp
              </>
            )}
          </Button>
        )}
      </Card>

      <Toast show={copied} message="Ringkasan siap dikirim ke WhatsApp!" />
    </>
  )
}
