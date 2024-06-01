// url of your express server
const url = 'http://localhost:3000/click'

// coordinates you want to click
const coordinates = {
  x: 100,
  y: 200
}

// function to send the post request
async function clickAtCoordinates(url, coordinates) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coordinates)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.text()
    console.log(data)
  } catch (error) {
    console.error('Error clicking at coordinates:', error)
  }
}

// execute the function
clickAtCoordinates(url, coordinates)
