import { useMappers } from "./mappers"
import { useCustomRoute } from "./routes/useCustomRoute"

export const useUtils = () => {
  return {
    routes: useCustomRoute(),
    mappers: useMappers(),
  }
}