import { ethers } from 'ethers'

type DisplayTokensType = {
  colors: [string, string, number][]
}

export const displayAddress = (address: string): string => {
  return ethers.utils.isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`
    : ''
}

export const DisplayTokens = ({ colors }: DisplayTokensType) => {
  return (
    <div className="flex flex-wrap pt-6 pr-6">
      {colors.map(color => (
        <div key={color[0]} className="pl-6 pb-6">
          <div
            className="w-36 h-36 rounded-full"
            style={{ backgroundColor: color[0] }}
          />
          <div className="text-center pt-2">
            {color[0]} - {color[2]}
          </div>
          <div className="text-center">{displayAddress(color[1])}</div>
        </div>
      ))}
    </div>
  )
}
