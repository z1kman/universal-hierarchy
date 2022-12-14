// Containers
import { TwoHierarhy } from './containers/TwoHierarchy'

const BLOCKS = {
  PINNED_ITEMS: 'pinned_items',
  OTHER_ITEMS: 'other_items',
}

const ITEMS = [
  {
    name: BLOCKS.PINNED_ITEMS,
  },
  {
    name: BLOCKS.OTHER_ITEMS,
    child: [
      {
        label: 'item1',
        child: [
          { label: 'item3' },
          { label: 'item4', child: [{ label: 'item5' }] },
        ],
      },
      { label: 'item2' },     
    ],
  },
]

function App() {
  return <TwoHierarhy data={ITEMS} />
}

export default App
