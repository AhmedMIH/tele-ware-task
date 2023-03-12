
export default {
    getCurrentPosition: jest.fn().mockImplementation(() => {
      const position = {
        coords: {
          latitude: 57.7,
          longitude: 11.93,
        },
      }
      return  position
    }),
}