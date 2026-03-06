import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./todo";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect, useMemo} from "react";
import { todosContext } from "../contexts/todoContext";

// dialog for delete

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
//end dialog for delete

// snackbar == =

import { useSnackbar } from "notistack";

//end

// reducer -todo


export default function TodoList() {
  const { todos, dispatch } = useContext(todosContext);


  const [alignment, setAlignment] = React.useState("All");
  // for dialog delete
  const [open, setOpen] = useState(false);
  const [idtodo, setidtodo] = useState();

  // use snackbar

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = (todo) => {
    setidtodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for dialog delete

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [titletexte, settitletexte] = useState("");

  // dialog for editing
  const [openedite, setopenedite] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  const handleClickOpenediting = (todo) => {
    setidtodo(todo);
    setopenedite(true);
    setFormData({
      title: todo.title,
      details: todo.details,
    });
  };

  const handleCloseediting = () => {
    setopenedite(false);
  };

  // end dialog for editing

  const todosjsx = useMemo(() => {
  

    // 1. الفلترة أولاً (filter)
    let filteredTodos = todos; // الافتراضي هو كل المهام

    if (alignment === "Completed") {
      filteredTodos = todos.filter((t) => t.iscompleted);
    } else if (alignment === "notCompleted") {
      filteredTodos = todos.filter((t) => !t.iscompleted);
    }

    // 2. التحويل ثانياً (map)
    return filteredTodos.map((t) => (
      <Todo
        todo={t}
        key={t.id}
        handleClickOpen={handleClickOpen}
        handleClickOpenediting={handleClickOpenediting}
      />
    ));
  }, [todos, alignment]);

  useEffect(() => {
    const todosfromlocal = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch({ type: "get", payload: todosfromlocal });
  }, []);

  return (
    <>
      {/* dialog for editing  */}

      <Dialog open={openedite} onClose={handleCloseediting}>
        <DialogContent dir="rtl">
          <DialogContentText sx={{ marginBottom: "20px" }} variant="h5">
            أترغب في تعديل هذه المهمة
          </DialogContentText>

          <TextField
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                height: "40px", // أو يمكنك وضع رقم ثابت مثل "56px"
                marginBottom: "10px",
              },
            }}
            id="outlined-basic"
            label="عنوان المهمة"
            variant="outlined"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <TextField
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                height: "40px", // أو يمكنك وضع رقم ثابت مثل "56px"
              },
            }}
            id="outlined-basic"
            label="تفاصيل المهمة"
            variant="outlined"
            value={formData.details}
            onChange={(e) => {
              setFormData({ ...formData, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseediting}>لا, أتراجع</Button>
          <Button
            type="submit"
            onClick={() => {
              console.log(" teste");
              dispatch({type:"edite",payload:{title:formData.title,details:formData.details,idtodo:idtodo}})
              handleCloseediting();
              enqueueSnackbar("تمت عملية التعديل بنجاح", { variant: "info" });
            }}
          >
            نعم
          </Button>
        </DialogActions>
      </Dialog>

      {/* end --- dialog for deleting */}

      {/* dialog for delete */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من حذفك هذه المهمة ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch({ type: "delete", payload: { idtodo: idtodo } });
              handleClose();
              enqueueSnackbar("تمت عملية الحذف بنجاح", { variant: "error" });
            }}
          >
            حذف
          </Button>
          <Button onClick={handleClose} autoFocus>
            أتراجع عن هذا الفعل
          </Button>
        </DialogActions>
      </Dialog>

      {/* ======  dialog for delete ========*/}

      <Container maxWidth="md">
        <Card variant="outlined" sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="h3">مهامي</Typography>
            <Divider sx={{ borderBottomWidth: 1, borderColor: "black" }} />

            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              dir="rtl"
              style={{ marginTop: "10px" }}
            >
              <ToggleButton value="All">الكل</ToggleButton>
              <ToggleButton value="Completed">المنجر</ToggleButton>
              <ToggleButton value="notCompleted">الغير منجز</ToggleButton>
            </ToggleButtonGroup>
            {/* all todos */}

            {todosjsx}

            {/* ----- all todos */}

            <Grid container spacing={2} style={{ marginTop: "8px" }}>
              <Grid size={5}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    dispatch({
                      type: "added",
                      payload: { titletexte: titletexte },
                    });
                    settitletexte("");
                    enqueueSnackbar("تمت إضافة المهمة بنجاح", {
                      variant: "success",
                    });
                  }}
                  disabled={titletexte.length > 0 ? false : true}
                >
                  إضافة
                </Button>
              </Grid>
              <Grid size={7}>
                {" "}
                <TextField
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px", // أو يمكنك وضع رقم ثابت مثل "56px"
                    },
                  }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titletexte}
                  onChange={(t) => {
                    settitletexte(t.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
