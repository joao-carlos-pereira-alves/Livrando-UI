import { authentication } from "../store/modules/authentication";
import Swal from "sweetalert2";

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
    onResponseError({ request, response, options }) {
      if (response?._data?.error && !request.include('/login')) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response._data.error,
          showConfirmButton: false,
          timer: 1500,
        });

        useAuthentication.logout();
      }
    },
    baseURL: config.public.baseURL,
    ...opts,
  });
};
