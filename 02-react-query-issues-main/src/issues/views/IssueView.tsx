import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;

  const { issueQuery } = useIssue(+id); //se pone el + para convertir el id en string

  if (issueQuery.isLoading) return <LoadingIcon />;

  if (!issueQuery.data)
  return (<Navigate to={"./issues/list"} />)

  //Mostrar el LoadingIcon mientras carga
  //Verificar si hay data en issueQuery.data >-- si no hay data...
  //sacar del navegador con un <Navigate to="./issues/list" />

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {/* <IssueComment body={ comment2 } />
      <IssueComment body={ comment3 } /> */}
    </div>
  );
};
