import { useState } from 'react'
import './App.css'
import { ethers } from 'ethers'
import { OpenWallet } from './components/OpenWallet'
import { ApplicationBar } from './components/ApplicationBar'
import { GetAssets } from './components/GetAssets'
import { DisplayTokens } from './components/DisplayTokens'
import { BottomBar } from './components/BottomBar'
import { Color } from '../../typechain'

function App() {
  const [provider, setProvider] = useState(
    undefined as unknown as ethers.providers.Web3Provider
  )
  const [signer, setSigner] = useState(
    undefined as unknown as ethers.providers.JsonRpcSigner
  )
  const [address, setAddress] = useState('')
  const [colorContract, setColorContract] = useState(
    undefined as unknown as Color
  )
  const [balance, setBalance] = useState(0)
  const [colors, setColors] = useState([] as [string, string, number][])

  return (
    <div>
      <OpenWallet
        setProvider={setProvider}
        setSigner={setSigner}
        setAddress={setAddress}
      />
      <GetAssets
        provider={provider}
        signer={signer}
        address={address}
        colorContract={colorContract}
        setColorContract={setColorContract}
        setBalance={setBalance}
        setColors={setColors}
      />
      <ApplicationBar
        address={address}
        balance={balance}
        colorContract={colorContract}
      />
      <DisplayTokens colors={colors} />
      <BottomBar from={address} colorContract={colorContract} />
    </div>
  )
}

export default App
