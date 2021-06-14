import { useEffect } from 'react'
import { ethers } from 'ethers'

type OpenWalletParameterType = {
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider>
  >
  setSigner: React.Dispatch<
    React.SetStateAction<ethers.providers.JsonRpcSigner>
  >
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const OpenWallet = ({
  setProvider,
  setSigner,
  setAddress,
}: OpenWalletParameterType) => {
  const givenProvider = (window as any).ethereum

  async function connectMetamask() {
    if (givenProvider)
      try {
        const provider = new ethers.providers.Web3Provider(givenProvider)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setProvider(provider)
        setSigner(signer)
        setAddress(address)
      } catch (err) {
        console.error(err)
      }
  }

  useEffect(() => {
    connectMetamask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!givenProvider)
    return (
      <div className="text-center font-bold text-3xl p-4">
        Please install Metamask.
      </div>
    )

  return <div></div>
}
