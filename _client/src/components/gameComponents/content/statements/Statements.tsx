import React, {useEffect, useState} from 'react';

type StatementProps = {
    Statement: string
}

const Statements = function ({Statement}: StatementProps) {

    return (
        <>
            {Statement}
        </>
    )
}

export default Statements;