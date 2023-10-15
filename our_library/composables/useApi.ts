import { authentication } from "../store/modules/authentication";

export const useApi: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const useAuthentication = authentication();
  const _auth = useAuthentication._auth;
  const token: String = _auth?.token;

  if (!token) {
    router.push({ path: "/login" });
  }

  return useFetch(request, {
    onRequest({ request, options }) {
      const token: String = _auth?.token;
      options.headers = options.headers || {};

      if (token) {
        options.headers.authorization = `Bearer ${token}`;
      }
    },
    baseURL: config.public.baseURL,
    ...opts,
  });
};
