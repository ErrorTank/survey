import React, {useEffect} from 'react';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
        alignItems: 'center',

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

export const SearchInput = ({placeholder, initValue = '', onChange}) => {
    let [value, setValue] = React.useState(initValue);
    const classes = useStyles();
    useEffect(() => {
        setValue(initValue);
    }, [initValue])
    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                type={"text"}
                onChange={e => setValue(e.target.value)}
                value={value}
                onKeyDown={e => {
                    if(e.keyCode === 13){
                        onChange(value);
                    }
                }}

            />
            <IconButton   className={classes.iconButton} onClick={() => onChange(value)} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

