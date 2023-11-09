import { useNavigate } from "react-router-dom";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue, State } from "../interfaces";
import { FC } from "react";
import { useQueryClient } from "react-query";
import { getIssueComments, getIssueInfo } from "../hooks/useIssue";
interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery(["issue", issue.number], () =>
      getIssueInfo(issue.number)
    );

    queryClient.prefetchQuery(["issue", issue.number, "comments"], () =>
      getIssueComments(issue.number)
    );
  };

  const preSetData = () => {
    queryClient.setQueryData(
      ["issue", issue.number],
      issue, // con setQueryData se está precargando en caché el issue desde el caché, no se está hacinedo fetch o petición a la api, en este caso carga sólo la primera antes de entrar al issue, el resto se carga al entrar
      {
        updatedAt: new Date().getTime() + 100000 //hora actual + 1 minuto de este moddo le decimos que durante 1 minuto, hasta la hora o fecha que le hemos indicado, se considera fresca esa data, aunque entre en el issue, no se hará el fetch hasta que la fecha pase. Esto se usa aqui porque sabemos que en un minutos la data no se va actualizar en este caso
      }

    );
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter={prefetchData}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
