import { authentication } from "../store/modules/authentication";

export const useApi: typeof useFetch = (request, next_path, opts?) => {
  const config = useRuntimeConfig();
  const router = useRouter()
  const useAuthentication = authentication();
  const _auth = useAuthentication._auth;

  return useFetch(request, {
    onRequest({ request, options }) {
      const token: String = _auth?.token
      options.headers = options.headers || {}

      console.log('o authentication(): ', token)

      if (token) {
        options.headers.authorization = `Bearer ${token}`
      }
    },
    onResponse({ request, response, options }) {
      router.push({ path: next_path })
    },
    baseURL: config.public.baseURL, 
    ...opts 
  });
};