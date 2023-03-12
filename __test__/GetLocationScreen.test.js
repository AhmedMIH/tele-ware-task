import { render, waitFor } from "@testing-library/react"
import Geolocation from "./__mock__/react-native-geolocation-service"

describe("", () => {
  test("should get user current location", async () => {
      const position = Geolocation.getCurrentPosition()
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
      expect(position.coords.latitude).toEqual(57.7)
      expect(position.coords.longitude).toEqual(11.93)
  })
})

