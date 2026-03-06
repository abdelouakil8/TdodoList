import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useContext } from "react";
import { todosContext } from "../contexts/todoContext";

// snackbar - -- -

import { useSnackbar } from "notistack";

//end snackbar
export default function Todo({
  todo,
  handleClickOpen,
  handleClickOpenediting,
}) {
  const { todos, dispatch } = useContext(todosContext);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          minWidth: 300,
          background: "#283593",
          color: "white",
          marginTop: 1,
          height: 95,
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap={"3.5px"}
            >
              {/* cheek icon */}
              <IconButton
                className="iconButton"
                aria-label="cheek"
                style={{
                  color: todo.iscompleted ? "white" : "#8bc34a",
                  background: todo.iscompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a  2px",
                }}
                onClick={() => {
                  dispatch({type:"completed",payload:{todo}})
                  todo.iscompleted
                    ? enqueueSnackbar("تم الإنتهاء من هذه المهمة", {
                        variant: "success",
                      })
                    : enqueueSnackbar(
                        "تم إرجاع هذه المهمة للقائمة الغير مكتملة",
                        { variant: "info" },
                      );
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 19 }} />
              </IconButton>

              {/*====== cheek icon =======*/}

              <IconButton
                className="iconButton"
                aria-label="edite "
                style={{
                  color: "#16b9ef",
                  background: "white",
                  border: "solid #16b9ef 2px",
                }}
                onClick={() => {
                  handleClickOpenediting(todo);
                }}
              >
                <ModeEditRoundedIcon sx={{ fontSize: 19 }} />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17  2px",
                }}
                onClick={() => {
                  handleClickOpen(todo);
                }}
              >
                <DeleteRoundedIcon sx={{ fontSize: 19 }} />
              </IconButton>
            </Grid>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
