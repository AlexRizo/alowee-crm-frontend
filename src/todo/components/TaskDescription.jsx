export const TaskDescription = ({ key = 'Título', value = 'Título de prueba'  }) => {
    return (
        <div>
            <span>{ key }:</span>
            <span>{ value }</span>
        </div>
    )
}
