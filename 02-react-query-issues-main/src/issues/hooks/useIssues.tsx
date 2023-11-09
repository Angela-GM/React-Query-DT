import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { FC } from "react";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async ( labels:string[] = [], state?: State ): Promise<Issue[]> => {
  await sleep(2)

  const params = new URLSearchParams(); //extraer la url

  if (state) params.append('state', state)

  if ( labels.length > 0) {
    const labelString =  labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', '1');
  params.append('per_page', '5');



  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(
    ["issues", { state, labels } ],
    () => getIssues(labels, state)
    );

  return {
    issuesQuery,
  };
};
