import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { FriendsIllustration } from '../ui/Illustration.jsx'
import PersonChip from './PersonChip.jsx'
import { useBill, useBillDispatch } from '../../context/BillContext.jsx'
import { generateId } from '../../utils/id.js'

export default function PeopleSection() {
  const { people } = useBill()
  const dispatch = useBillDispatch()
  const [name, setName] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    dispatch({
      type: 'ADD_PERSON',
      payload: { id: generateId('p'), name: trimmed },
    })
    setName('')
  }

  return (
    <Card
      title="Peserta"
      subtitle={`${people.length} orang`}
      className="ticket"
    >
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama teman (mis. Andi, Budi)"
          containerClassName="flex-1"
        />
        <Button
          type="submit"
          disabled={!name.trim()}
          aria-label="Tambah peserta"
          className="shrink-0"
        >
          <UserPlus size={18} className="mr-1.5" />
          Tambah
        </Button>
      </form>

      {people.length === 0 ? (
        <EmptyState
          illustration={<FriendsIllustration />}
          message="Belum ada teman."
          description="Tambah dulu siapa saja yang ikut makan bareng."
        />
      ) : (
        <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-dashed border-border">
          {people.map((person, index) => (
            <PersonChip key={person.id} person={person} index={index} />
          ))}
        </div>
      )}
    </Card>
  )
}
