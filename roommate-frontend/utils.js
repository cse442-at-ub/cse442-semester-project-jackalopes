const currentBackend = 'cheshire' // one of 'local', 'cheshire'
export const determineURL = () => {
  switch (currentBackend) {
    case 'cheshire': {
      return 'https://cheshire.cse.buffalo.edu:3232/'
    }
    case 'local': {
      return 'https://localhost:8000'
    }
    default: {
      return currentBackend
    }
  }
}