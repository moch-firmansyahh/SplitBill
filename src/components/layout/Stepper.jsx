import Segmented from '../ui/Segmented.jsx'

export default function Stepper({ activeStep = 0, onChange }) {
  const steps = [
    { label: 'Peserta', value: 0 },
    { label: 'Pesanan', value: 1 },
    { label: 'Biaya', value: 2 },
    { label: 'Hasil', value: 3 },
  ]

  return (
    <div className="w-full overflow-x-auto pb-1 mb-4 flex justify-center">
      <Segmented
        options={steps}
        value={activeStep}
        onChange={onChange}
        className="w-full max-w-sm justify-between"
      />
    </div>
  )
}
