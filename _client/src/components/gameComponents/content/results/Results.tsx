import React, {useEffect, useState} from 'react';

type resultProps = {
    Results: Array<string>
}

const Results = function ({Results}: resultProps) {
    return (
        <>
            {Results.map(result => {
                return <p>{result}</p>
            })}
        </>
    )
}

export default Results;