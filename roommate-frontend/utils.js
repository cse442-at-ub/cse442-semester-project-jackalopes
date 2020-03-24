const currentBackend = 'https://e42d4c5b.ngrok.io' // one of 'local', 'cheshire'
export const determineURL = () => {
  switch (currentBackend) {
    case 'cheshire': {
      return 'https://cheshire.cse.buffalo.edu/'
    }
    case 'local': {
      return 'https://localhost:8000'
    }
    default: {
      return currentBackend
    }
  }
}