import { ethers } from 'hardhat'
import { assert } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chai from 'chai'
import { ContractReceipt, ContractTransaction } from 'ethers'
chai.use(chaiAsPromised).should()
import { Color__factory, Color } from '../typechain'

let color: Color

before(async () => {
  const Color = (await ethers.getContractFactory('Color')) as Color__factory
  color = await Color.deploy()
  await color.deployed()
})

describe('deployment', function () {
  it('deploys successfully', async function () {
    const address = color.address
    assert.notEqual(address, '0x0')
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('has a name', async () => {
    const name = await color.name()
    assert.equal(name, 'Color')
  })

  it('has a symbol', async () => {
    const symbol = await color.symbol()
    assert.equal(symbol, 'COLOR')
  })
})

describe('minting', async () => {
  it('creates a new token', async () => {
    const [owner, addr1] = await ethers.getSigners()
    const result: ContractTransaction = await color.mint('#EC058E')
    const receipt: ContractReceipt = await result.wait()
    const event = receipt.events ? receipt.events[0].args : null
    const totalSupply = await color.totalSupply()

    // SUCCESS
    assert.equal(Number(totalSupply), 1)
    assert.equal(event?.tokenId, 0, 'id is correct')
    assert.equal(
      event?.from,
      '0x0000000000000000000000000000000000000000',
      'from is correct'
    )
    assert.equal(event?.to, owner.address, 'to is correct')

    // FAILURE: cannot mint same color twice
    await color.mint('#EC058E').should.be.rejected

    // FAILURE: only the owner can mint new tokens
    await color.mint('#EC05FF', { from: addr1.address }).should.be.rejected
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      // Mint 3 more tokens
      await color.mint('#5386E4')
      await color.mint('#FFFFFF')
      await color.mint('#000000')

      const totalSupply = await color.totalSupply()
      let result = []
      for (var i = 0; i < Number(totalSupply); i++) {
        const colorURI = await color.tokenURI(i)
        result.push(colorURI)
      }

      const expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})
