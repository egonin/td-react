import { MenuList, MenuItem, Box, Typography } from "@mui/material";
import { Add, FilterAlt } from "@mui/icons-material";
import { TaskCreationModal } from "./todoModal";

export const Menu = (props) => {
    return (<MenuList>
            <MenuItem>
            <Add onClick={() => props.setVisible(true)} sx = {{color:"#94A187"}}/>
            <TaskCreationModal
            visible={props.visible}
            setVisible={props.setVisible}
            createTask={props.createTask}
            creationCallback={props.creationCallback}
            />
            </MenuItem>
            {/* <MenuItem>
            <FilterAlt sx = {{color:"#94A187"}} />
            </MenuItem> */}
        </MenuList>)
}
