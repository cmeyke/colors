import { useState } from 'react'
import { ethers } from 'ethers'
import { displayAddress } from './DisplayTokens'

type ApplicationBarType = {
  address: string
  balance: number
  colorContract: ethers.Contract
}

export const handleError = (err: unknown) => {
  const errMessage: string = (err as any)?.data?.message
  if (errMessage) {
    const start = errMessage.indexOf("'")
    const end = errMessage.lastIndexOf("'")
    if (start < end) {
      const errString = errMessage.slice(start + 1, end)
      alert(errString)
    } else {
      console.error(errMessage)
    }
  } else console.error(err)
}

export const ApplicationBar = ({
  address,
  balance,
  colorContract,
}: ApplicationBarType) => {
  const [color, setColor] = useState('')

  if (!address) return <div></div>

  const formaterETH = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format

  async function mint() {
    if (color)
      try {
        await colorContract.mint(color)
      } catch (err) {
        handleError(err)
      }
  }

  const handleColorInput: React.ChangeEventHandler<HTMLInputElement> =
    event => {
      setColor(event.target.value.toLowerCase())
    }

  return (
    <div className="flex bg-blue-700 p-2">
      <button
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-6"
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload
      </button>
      <input
        autoFocus
        className="bg-gray-700 rounded text-white ml-6 p-2 w-24"
        type="text"
        onChange={handleColorInput}
      />
      <button
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-1"
        onClick={mint}
      >
        Mint
      </button>
      <button
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ml-auto mr-6"
        onClick={() => {
          navigator.clipboard.writeText(address)
        }}
      >
        {displayAddress(address)} - {formaterETH(balance)}
      </button>
    </div>
  )
}
