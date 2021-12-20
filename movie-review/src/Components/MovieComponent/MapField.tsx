import { useFormikContext } from 'formik';
import ICoordinate from '../Utilities/ICoordinate';
import { Map } from '../Utilities/Map'

interface IMapField {
    coordinates: ICoordinate[],
    latField: string,
    lngField: string
}
export const MapField = (props: IMapField) => {

    const { values } = useFormikContext<any>();

    const handleMapClick = (coordinates: ICoordinate) => {
        values[props.latField] = coordinates.lat;
        values[props.lngField] = coordinates.lng;
    };
    return (
        <Map
            coordinates={props.coordinates}
            handleMapClick={handleMapClick}
        />
    );
}

MapField.defaultProps = {
    coordinates: []
}