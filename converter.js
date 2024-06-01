const Jimp = require("jimp")

const colorsToCompare = {
    "0": [240, 240, 240], // white, 0
    "1": [242, 178, 51],  // orange, 1
    "2": [229, 127, 216], // magenta, 2
    "3": [153, 178, 242], // lightBlue, 3
    "4": [222, 222, 108], // yellow, 4
    "5": [127, 204, 25],  // lime, 5
    "6": [242, 178, 204], // pink, 6
    "7": [76, 76, 76],    // gray, 7
    "8": [153, 153, 153], // lightGray, 8
    "9": [76, 153, 178],  // cyan, 9
    "a": [178, 102, 229], // purple, a
    "b": [51, 102, 204],  // blue, b
    "c": [127, 102, 76],  // brown, c
    "d": [87, 166, 78],   // green, d
    "e": [204, 76, 76],   // red, e
    "f": [25, 25, 25]     // black, f
}

function getColorDistance(color1, color2) {
  const rDiff = color1[0] - color2[0];
  const gDiff = color1[1] - color2[1];
  const bDiff = color1[2] - color2[2];
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

async function convertToComputerCraftImage(inputImagePath) {
  try {

  let fullData = ''

  const image = await Jimp.read(inputImagePath)

    image.resize(100, 67);

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelColorObj = Jimp.intToRGBA(image.getPixelColor(x, y));
        const pixelColor = [pixelColorObj.r, pixelColorObj.g, pixelColorObj.b]

        const values = Object.values(colorsToCompare)
        let closestColor = values[0];
        let closestDistance = Number.MAX_VALUE;
        for (let i = 0; i < values.length; i++) {
          const distance = getColorDistance(pixelColor, values[i]);
          if (distance < closestDistance) {
            closestColor = values[i];
            closestDistance = distance;
          }
        }

        fullData += Object.keys(colorsToCompare)[Object.values(colorsToCompare).indexOf(closestColor)]

        if (x === image.bitmap.width - 1) {
          fullData += '\n';
        }
      }
    }    

  return fullData;    

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = convertToComputerCraftImage()