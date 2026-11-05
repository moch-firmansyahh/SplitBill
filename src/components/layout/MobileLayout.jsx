import { useState, useMemo } from 'react'
import Header from './Header.jsx'
import Stepper from './Stepper.jsx'
import BottomBar from './BottomBar.jsx'
import PeopleSection from '../people/PeopleSection.jsx'
import ItemList from '../items/ItemList.jsx'
import ChargesForm from '../charges/ChargesForm.jsx'
import SummaryCard from '../summary/SummaryCard.jsx'
import Card from '../ui/Card.jsx'
import Avatar, { AvatarStack } from '../ui/Avatar.jsx'
import Button from '../ui/Button.jsx'
import Toast from '../ui/Toast.jsx'
import { useBill } from '../../context/BillContext.jsx'
import { calculateSummary } from '../../utils/calculate.js'
import { formatRupiah, buildCompleteReceiptText } from '../../utils/format.js'
import { Copy, Check } from 'lucide-react'

export default function MobileLayout() {
  const state = useBill()
  const { people } = state
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPersonId, setSelectedPersonId] = useState(null)
  const [copied, setCopied] = useState(false)

  const summary = useMemo(() => calculateSummary(state), [state])

  // Default selected person on results step
  const currentSelectedId = selectedPersonId || (people[0]?.id ?? null)
  const selectedPerson = people.find((p) => p.id === currentSelectedId)
  const selectedPersonIndex = people.findIndex((p) => p.id === currentSelectedId)
  const selectedSummary = summary.perPerson.find(
    (p) => p.personId === currentSelectedId
  )

  const copyText = useMemo(() => {
    return buildCompleteReceiptText(state, summary)
  }, [state, summary])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // ignore
    }
  }

  const heroes = [
    {
      title: (
        <>
          Siapa saja yang ikut <span className="underline decoration-primary decoration-4">makan</span>?
        </>
      ),
      help: 'Daftarkan nama semua orang yang ikut di tagihan ini.',
    },
    {
      title: (
        <>
          Siapa makan <span className="underline decoration-primary decoration-4">apa</span>?
        </>
      ),
      help: 'Catat menu dan pilih siapa saja yang ikut memakannya.',
    },
    {
      title: (
        <>
          Ada diskon atau <span className="underline decoration-primary decoration-4">pajak</span>?
        </>
      ),
      help: 'Masukkan potongan harga, biaya service, atau PPN.',
    },
    {
      title: (
        <>
          Berapa yang harus <span className="underline decoration-primary decoration-4">dibayar</span>?
        </>
      ),
      help: 'Hasil perhitungan adil proporsional siap dibagikan.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-28 px-4 max-w-md mx-auto">
      <Header />

      {/* Hero section */}
      <div className="my-4">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground">
          {heroes[activeStep].title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          {heroes[activeStep].help}
        </p>
      </div>

      <Stepper activeStep={activeStep} onChange={setActiveStep} />

      {/* Step Content */}
      <div className="space-y-4">
        {activeStep === 0 && <PeopleSection />}

        {activeStep === 1 && <ItemList showInlineForm={false} />}

        {activeStep === 2 && <ChargesForm />}

        {activeStep === 3 && (
          <div className="space-y-4">
            {/* Kartu hitam "Bagianmu" */}
            {selectedPerson && selectedSummary && (
              <Card variant="ink" className="p-5 shadow-[4px_4px_0_0_var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Bagian untuk
                  </span>
                  {/* Selector avatar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {people.map((p, idx) => {
                      const isSel = p.id === currentSelectedId
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPersonId(p.id)}
                          className={`rounded-full transition-all cursor-pointer ${
                            isSel ? 'ring-3 ring-primary scale-110' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Avatar name={p.name} index={idx} size="sm" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Avatar
                    name={selectedPerson.name}
                    index={selectedPersonIndex >= 0 ? selectedPersonIndex : 0}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold leading-none">
                      {selectedPerson.name}
                    </h3>
                    <span className="text-xs opacity-75">
                      Subtotal: {formatRupiah(selectedSummary.subtotal)}
                    </span>
                  </div>
                </div>

                <div className="my-3">
                  <p className="text-4xl font-black tabular-nums tracking-tight">
                    {formatRupiah(selectedSummary.total)}
                  </p>
                </div>

                <Button
                  variant="default"
                  size="md"
                  pill
                  onClick={handleCopy}
                  className="w-full text-foreground"
                >
                  {copied ? (
                    <>
                      <Check size={18} className="mr-1.5" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="mr-1.5" />
                      Salin Ringkasan
                    </>
                  )}
                </Button>
              </Card>
            )}

            <SummaryCard showTotalCard={false} />
          </div>
        )}
      </div>

      <BottomBar
        grandTotal={summary.grandTotal}
        activeStep={activeStep}
        onNext={() => setActiveStep((prev) => Math.min(prev + 1, 3))}
        onCopy={handleCopy}
        copied={copied}
      />

      <Toast show={copied} message="Ringkasan siap dikirim ke WhatsApp!" />
    </div>
  )
}
