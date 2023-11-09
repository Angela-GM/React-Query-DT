import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { FC, useState } from "react";

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

  const [ page, setPage ] = useState(1);

  const issuesQuery = useQuery(
    ["issues", { state, labels, page } ],
    () => getIssues({ labels, state, page } )
    );

  return {
    // Properties
    issuesQuery,

    // Getter (algo que tiene una función propia)
    page,

    // Methods
  };
};
