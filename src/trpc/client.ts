import {createTRPCReact} from '@trpc/react-query'
import { AppRouter } from '.'


// thinn type safety
export const trpc = createTRPCReact<AppRouter>({})
