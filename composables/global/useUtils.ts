import { useMappers } from "./mappers"
import { useCustomRoute } from "./routes/useCustomRoute"
import { useString } from "./string/useString"
import { useDate } from "./transform/useDate"

export const useUtils = () => {
  return {
    routes: useCustomRoute(),
    mappers: useMappers(),
    date: useDate(),
    string: useString()
  }
}