import { useState } from 'react'
import { Color } from '../../../typechain'

type BottomBarType = {
  from: string
  colorContract: Color
}

export const BottomBar = ({ from, colorContract }: BottomBarType) => {
  const [id, setId] = useState(0)
  const [to, setTo] = useState('')

  async function transfer() {
    try {
      await colorContract['safeTransferFrom(address,address,uint256)'](
        from,
        to,
        id
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex bg-blue-700 p-2">
      <input
        className="bg-gray-700 rounded text-white ml-6 p-2 w-24"
        type="text"
        onChange={event => setId(Number(event.target.value))}
      />
      <input
        className="bg-gray-700 rounded text-white ml-1 p-2"
        style={{ width: '25rem' }}
        type="text"
        onChange={event => setTo(event.target.value)}
      />
      <button
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-1"
        onClick={transfer}
      >
        Transfer
      </button>
    </div>
  )
}