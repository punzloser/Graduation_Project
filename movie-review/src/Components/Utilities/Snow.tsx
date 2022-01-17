import Snowfall from 'react-snowfall'

export const Snow = () => {
    return (
        <>
            <Snowfall
                speed={[0.5, 1.0]}
                snowflakeCount={4}
                wind={[0.5, 0.5]}
                radius={[0.5, 2]}
                color={`#ffeb3b`}
            />
            <Snowfall
                speed={[0.5, 1.0]}
                snowflakeCount={4}
                wind={[0.5, 0.5]}
                radius={[0.5, 2]}
                color={`#e91e63`}
            />
        </>
    );
}