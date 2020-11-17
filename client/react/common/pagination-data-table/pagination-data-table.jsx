import React, {useEffect} from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {LoadingInline} from "../loading-inline/loading-inline";

function EnhancedTableHead(props) {
    const { order, sortBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {columns.map((headCell, i) => (
                    <TableCell
                        key={i}
                        align={'left'}
                        padding={'default'}
                        sortDirection={sortBy === headCell.key ? order : false}
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={sortBy === headCell.key}
                                direction={sortBy === headCell.key ? order : 'asc'}
                                onClick={createSortHandler(headCell.key)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        ) : headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export const PaginationDataTable = ({api, size, filter, columns, getRowKey = each => each._id, onClickRow}) => {
    let [total, setTotal] = React.useState(0);
    let [rows, setRows] = React.useState([]);
    let [loading, setLoading] = React.useState(true);
    const [order, setOrder] = React.useState('desc');
    const [sortBy, setSortBy] = React.useState('createdAt');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(Number(size));
    const fetch = (config) => {
        if(!loading){
            setLoading(true);
        }
        api(config).then(data => {
            setTotal(data.total);
            setRows(data.list);
            setLoading(false);
        })
    }
    useEffect(() => {
        setRowsPerPage(size);
    }, [size])
    useEffect(() => {
        fetch({...filter, order, sortBy, skip: 0, limit: rowsPerPage});
    }, [api, rowsPerPage, filter, order, sortBy])


    const handleRequestSort = (event, property) => {
        const isAsc = sortBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };



    const handleClick = (row) => {
        onClickRow(row);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetch({...filter, order, sortBy, skip: rowsPerPage * newPage, limit: rowsPerPage})
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div className="pagination-data-table">
            {loading && (
                <LoadingInline/>
            )}
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        order={order}
                        sortBy={sortBy}
                        onRequestSort={handleRequestSort}
                        columns={columns}
                    />
                    <TableBody>
                        {rows.map((row, index) => {


                                return (
                                    <TableRow
                                        hover
                                        onClick={() => handleClick(row)}
                                        tabIndex={-1}
                                        key={getRowKey(row)}
                                    >

                                        {columns.map(col => (
                                            <TableCell key={col.key} align="left">{col.render(row)}</TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 8, 15, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Số lượng"}
                page={page}
                labelDisplayedRows={({ from, to, count }) => `${from} đến ${to} trong tổng số ${count}`}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

