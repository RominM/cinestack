import { useMappers } from "./mappers"
import { useCustomRoute } from "./routes/useCustomRoute"
import { useDate } from "./transform/useDate"

export const useUtils = () => {
  return {
    routes: useCustomRoute(),
    mappers: useMappers(),
    date: useDate()
  }
}