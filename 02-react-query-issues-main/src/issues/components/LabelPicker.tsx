import { FC } from 'react';
import { useLabels } from '../hooks/useLabels';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


interface Props {
  selectedLabels: string[];
  onChange: ( labelName: string) => void;
}



export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {

  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return (<LoadingIcon />); //! isLoading es cuando se carga la data por primra vez y no hay da ni en caché. Si hay data en cache provee la data de caché. El isFetching sale el Loading... porque siempre se vuelve a lanzar el fetch

  return (
    <div>
      {labelsQuery.data?.map(label => (
        <span 
              key={ label.id }
              className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes(label.name) ? 'label-active': '' }`}
              style={{ border: `1px solid #${ label.color }`, color: `#${ label.color }` }}
              onClick={ () => onChange( label.name ) }
          >
              { label.name }
          </span>
      ))
    }
    </div>
  );
};
