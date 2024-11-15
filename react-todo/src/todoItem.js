import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Check } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

const TodoCard = styled(Card)( {color: "blue"});

export const TodoItem = ({task}) => (
    <TodoCard>
        <Typography>
            {task.title}
        </Typography>
    </TodoCard>
)