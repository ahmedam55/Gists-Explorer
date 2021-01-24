let colorsGeneratedLookup = {}

const randomColor = text => {
  const colorGenerated = colorsGeneratedLookup[text]

  if (colorGenerated == null) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)

    colorsGeneratedLookup[text] = `#${randomColor}`
  }

  return colorsGeneratedLookup[text]
}

export default randomColor
