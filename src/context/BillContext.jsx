import { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'splitbill:v1'

const initialState = {
  people: [],
  items: [],
  charges: {
    discount: { type: 'percent', value: 0 },
    service: { type: 'percent', value: 0 },
    tax: { type: 'percent', value: 0 },
  },
}

function billReducer(state, action) {
  switch (action.type) {
    case 'ADD_PERSON':
      return { ...state, people: [...state.people, action.payload] }

    case 'UPDATE_PERSON':
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      }

    case 'REMOVE_PERSON': {
      const personId = action.payload
      return {
        ...state,
        people: state.people.filter((p) => p.id !== personId),
        items: state.items.map((item) => ({
          ...item,
          sharedBy: item.sharedBy.filter((id) => id !== personId),
        })),
      }
    }

    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case 'TOGGLE_SHARE': {
      const { itemId, personId } = action.payload
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== itemId) return item
          const inList = item.sharedBy.includes(personId)
          return {
            ...item,
            sharedBy: inList
              ? item.sharedBy.filter((id) => id !== personId)
              : [...item.sharedBy, personId],
          }
        }),
      }
    }

    case 'SET_CHARGE': {
      const { chargeType, field, value } = action.payload
      return {
        ...state,
        charges: {
          ...state.charges,
          [chargeType]: {
            ...state.charges[chargeType],
            [field]: value,
          },
        },
      }
    }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

const BillContext = createContext(null)
const BillDispatchContext = createContext(null)

function loadState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...initialState, ...parsed }
    }
  } catch {
    // data rusak, pakai default
  }
  return initialState
}

export function BillProvider({ children }) {
  const [state, dispatch] = useReducer(billReducer, null, loadState)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage penuh atau tidak tersedia
    }
  }, [state])

  return (
    <BillContext.Provider value={state}>
      <BillDispatchContext.Provider value={dispatch}>
        {children}
      </BillDispatchContext.Provider>
    </BillContext.Provider>
  )
}

export function useBill() {
  const context = useContext(BillContext)
  if (context === null) {
    throw new Error('useBill harus dipakai di dalam BillProvider')
  }
  return context
}

export function useBillDispatch() {
  const context = useContext(BillDispatchContext)
  if (context === null) {
    throw new Error('useBillDispatch harus dipakai di dalam BillProvider')
  }
  return context
}
