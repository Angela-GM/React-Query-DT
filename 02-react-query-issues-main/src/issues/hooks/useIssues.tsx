import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { FC, useEffect, useState } from "react";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ( { labels, state, page = 1 }: Props ): Promise<Issue[]> => {
  await sleep(2)

  const params = new URLSearchParams(); //extraer la url

  if (state) params.append('state', state)

  if ( labels.length > 0) {
    const labelString =  labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');



  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {

  const [ page, setPage ] = useState(1);//cuando el setPage cambia se recarcará automaticamente el useQuery (issuesQuery) nueva petición a la api

  useEffect(() => {
    setPage(1)
  }, [state, labels]) //esto se ejectua si cualquiera de las variables state o labels cambia
  

  const issuesQuery = useQuery(
    ["issues", { state, labels, page } ],
    () => getIssues({ labels, state, page } )
    );

    const nextPage = () => {
      if (issuesQuery.data?.length === 0) return;

      setPage(page + 1)
    }

    const prevPage = () => {
      if (page > 1 ) setPage(page - 1)
    }

  return {
    // Properties
    issuesQuery,

    // Getter (algo que tiene una función propia)
    page: issuesQuery.isFetching ? 'Loading' : page,

    // Methods
    nextPage,
    prevPage,

  };
};
