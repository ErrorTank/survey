import React, {useEffect} from 'react';

export const PaginationDataTable = ({api, size, filter, columns}) => {
    let [total, setTotal] = React.useState(0);
    let [rows, setRows] = React.useState();
    const [order, setOrder] = React.useState('desc');
    const [sortBy, setSortBy] = React.useState('createdAt');
    useEffect(() => {
        api()
    }, [api, size, filter.keyword])
    return (
        <div>

        </div>
    );
};

