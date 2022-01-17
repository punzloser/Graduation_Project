import Snowfall from 'react-snowfall'

export const Snow = () => {
    return (
        <Snowfall
            speed={[0.5, 1.0]}
            snowflakeCount={5}
            wind={[0.5, 0.5]}
            radius={[0.5, 2]}
            color={`#ffeb3b`}
        />
    );
}