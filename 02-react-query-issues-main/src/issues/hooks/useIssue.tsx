import { useQuery } from 'react-query';
import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';


const getIssueInfo = async ( issueNumber: number ):Promise<Issue> => {
    await sleep(2)
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    console.log(data);    
    return data;

}

const getIssueComments = async ( issueNumber: number ):Promise<Issue[]> => {
    await sleep(2)
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    console.log(data);    
    return data;

}

export const useIssue = ( issueNumber: number ) => {

    const issueQuery = useQuery( 
        ['issue', issueNumber ],
        () => getIssueInfo(issueNumber),

    )

    const commentsQuery = useQuery( 
        ['issue', 'comments' ],
        () => getIssueComments(issueQuery.data!.number), //! se pone para indicar que siempre tendré la data
        {
            // enabled: false, //para deshabilidatr esta petición
            enabled: issueQuery.data !== undefined //le estoy diciendo que se habilite cuando data no sea undefined, cuando tengamos la data
        }

    )


  return {
    issueQuery,
    commentsQuery

  }
}
