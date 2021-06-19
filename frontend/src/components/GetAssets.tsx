import { useEffect } from 'react'
import { ethers } from 'ethers'
import color from '../contracts/Color.json'
import contractAddress from '../contracts/contract-address.json'

type GetAssetsType = {
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  address: string
  colorContract: ethers.Contract
  setColorContract: React.Dispatch<React.SetStateAction<ethers.Contract>>
  setBalance: React.Dispatch<React.SetStateAction<number>>
  setColors: React.Dispatch<React.SetStateAction<[string, string, number][]>>
}

export const GetAssets = ({
  provider,
  signer,
  address,
  colorContract,
  setColorContract,
  setBalance,
  setColors,
}: GetAssetsType) => {
  async function getBalance() {
    try {
      const balance = await provider.getBalance(address)
      setBalance(Number(ethers.utils.formatEther(balance)))
      const colorContract = new ethers.Contract(
        contractAddress.Token,
        color.abi,
        signer
      )
      setColorContract(colorContract)
      const totalSupply = await colorContract.totalSupply()
      let colors: [string, string, number][] = []
      for (let i = 0; i < totalSupply; i++) {
        const color: string = await colorContract.tokenURI(i)
        const owner: string = await colorContract.ownerOf(i)
        colors.push([color, owner, i])
      }
      setColors(colors)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (address) {
      getBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (!colorContract) return <div></div>

  return <div></div>
}
