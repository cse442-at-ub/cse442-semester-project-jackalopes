const currentBackend = 'https://4182f6cd.ngrok.io' // one of 'local', 'cheshire', 'genymotion'
export const determineURL = () => {
  switch (currentBackend) {
    case 'cheshire': {
      return 'http://cheshire.cse.buffalo.edu:3232'
    }
    case 'local': {
      return 'http://localhost:8000'
    }
    case 'genymotion': {
      return 'http://10.0.3.2:8000'
    }
    default: {
      return currentBackend
    }
  }
}