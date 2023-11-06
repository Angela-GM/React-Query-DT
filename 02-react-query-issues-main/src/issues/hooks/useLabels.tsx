import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(
    ["labels"], //nombre para guardar en caché
    getLabels, //funcion que llama a la api para traer los datos
    {
      //   refetchOnWindowFocus: false, //opcion para que no se refresque de nuevo la petición al cambiar de ventana
      staleTime: 1000 * 60 * 60, //1 hora para que se vuelva a hacer el fetch
 
      placeholderData: [
        {
          id: 725156255,
          node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
          name: "good first issue (taken)",
          color: "b60205",
          default: false,
        },
        {
          id: 717031390,
          node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
          name: "good first issue",
          color: "6ce26a",
          default: true,
        },
      ],
    }
  );

  return labelsQuery;
};
