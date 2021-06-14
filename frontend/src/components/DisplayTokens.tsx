type DisplayTokensType = {
  colors: string[]
}

export const DisplayTokens = ({ colors }: DisplayTokensType) => {
  return (
    <div className="flex flex-wrap pt-6 pr-6 pb-6">
      {colors.map(color => (
        <div key={color} className="pl-6 pb-6">
          <div
            className="w-36 h-36 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="text-center p-2">{color}</div>
        </div>
      ))}
    </div>
  )
}
