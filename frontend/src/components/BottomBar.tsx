import { useState } from 'react'
import { Color } from '../../../typechain'
import { ethers } from 'ethers'
import { handleError } from './ApplicationBar'

type BottomBarType = {
  from: string
  colorContract: Color
  selectedId: number
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
}

export const BottomBar = ({
  from,
  colorContract,
  selectedId,
  setSelectedId,
}: BottomBarType) => {
  const [to, setTo] = useState('')

  async function idInRange(id: number): Promise<boolean> {
    if (id < 0) return false
    try {
      const totalSupply = await colorContract.totalSupply()
      const last = await colorContract.tokenByIndex(Number(totalSupply) - 1)
      return id <= Number(last)
    } catch (err) {
      handleError(err)
      return false
    }
  }

  async function transfer() {
    if (
      selectedId >= 0 &&
      from.toLowerCase() !== to.toLowerCase() &&
      ethers.utils.isAddress(from) &&
      ethers.utils.isAddress(to)
    )
      try {
        const inRange = await idInRange(selectedId)
        if (inRange)
          await colorContract['safeTransferFrom(address,address,uint256)'](
            from,
            to,
            selectedId
          )
      } catch (err) {
        handleError(err)
      }
  }

  async function burn() {
    try {
      const inRange = await idInRange(selectedId)
      if (inRange) await colorContract.burn(selectedId)
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div className="flex bg-blue-700 p-2">
      <input
        value={selectedId >= 0 ? selectedId : ''}
        className="bg-gray-700 rounded text-white ml-6 p-2 w-24"
        type="text"
        onChange={event => {
          const id = event.target.value ? Number(event.target.value) : -1
          setSelectedId(id >= 0 ? id : -1)
        }}
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
      <button
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-1"
        onClick={burn}
      >
        Burn
      </button>
    </div>
  )
}
