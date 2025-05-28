// "use client";

// import { useState, useCallback, useMemo } from "react";
// import {
//   useAuth,
//   useAuthDispatch,
// } from "@/context/LoginContext";
// import { AUTH_ACTION } from "@/types/action";
// import { useRouter } from "next/navigation";

// const useFetch = () => {
//   const auth = useAuth();
//   const authDispatch = useAuthDispatch();
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState<string | null>(null);
//   const [response, setResponse] = useState<Response | null>(null);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Memoize fetchData to prevent recreation on each render
//   const fetchData = useCallback(async (
//     path: string,
//     method: string,
//     body: any | null = null,
//     authRequired: boolean = true
//   ): Promise<any> => {
//     try {
//       const url = `${apiUrl}${path}`;
//       const headers: Record<string, string> = {
//         "Content-Type": "application/json",
//       };
      
//       if (authRequired && auth.tokens?.accessToken) {
//         headers["Authorization"] = `Bearer ${auth.tokens.accessToken}`;
//       }
      
//       const options: RequestInit = {
//         method,
//         headers,
//         body: body ? JSON.stringify(body) : null,
//       };

//       let response = await fetch(url, options);
//       let data = await response.json();

//       if (response.status === 401) {
//         const refreshToken = auth.tokens?.refreshToken;
//         if (!refreshToken) throw new Error("Token expired. Please login again.");

//         if (!apiUrl) throw new Error("API URL not found");
//         const refreshData = await fetchRefreshToken(refreshToken, apiUrl);

//         authDispatch({
//           type: AUTH_ACTION.REFRESH_TOKEN_SUCCESS,
//           payload: {
//             token: refreshData.token,
//             refreshToken: refreshData.refresh_token
//           }
//         });

//         options.headers = {
//           ...options.headers,
//           Authorization: `Bearer ${refreshData.token}`,
//         };
//         response = await fetch(url, options);
//         data = await response.json();

//         setData(data);
//         setError(null);
//         return data;
//       }

//       if (response.status === 400) {
//         authDispatch({
//           type: AUTH_ACTION.LOGOUT
//         });
//         router.push("/");
//       } else if (response.status === 402) {
//         router.push("/");
//       } else if (response.status === 404) {
//         router.push("/404");
//       } else if (!response.ok) {
//         throw new Error(data.message || "Erro ao buscar os dados.");
//       }

//       setResponse(response);
//       setData(data);
//       setError(null);
//       return data;
//     } catch (err) {
//       const message = (err as Error).message || "Erro ao buscar os dados.";
//       setError(message);
//       return null;
//     }
//   }, [apiUrl, auth, authDispatch, router]);

//   // Memoize the return value to prevent unnecessary re-renders
//   const returnValue = useMemo(() => ({
//     fetchData,
//     data,
//     error,
//     response
//   }), [fetchData, data, error, response]);

//   return returnValue;
// };

// const fetchRefreshToken = async (refreshToken: string, apiUrl: string) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ refresh_token: refreshToken }),
//   };

//   const response = await fetch(`${apiUrl}/api/refresh-token`, options);
//   const data = await response.json();
//   return data;
// };

// export default useFetch;

