import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ShowModal } from "../redux/actions/ModalAction";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  span: {
    fontWeight: 700,
    color: "#164011",
  },
  head: {
    marginBottom: "20px",
    color: "#164011",
  },
}));

export default function AlanModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(ShowModal(false));
    setOpen(false);
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.head}>
              Commands to interact with Alan
            </h2>
            <p id="transition-modal-description">
              - To add an item:{" "}
              <span className={classes.span}> Add [item_name] to the cart</span>
            </p>
            <p id="transition-modal-description">
              - To add an item with the specific quantity:{" "}
              <span className={classes.span}>
                Add [quantity_no] [item_name] to the cart
              </span>
            </p>
            <p id="transition-modal-description">
              - To remove an item:{" "}
              <span className={classes.span}>
                Remove [item_name] from the cart
              </span>
            </p>
            <p id="transition-modal-description">
              - To go back to previous page:{" "}
              <span className={classes.span}>Go back</span>
            </p>
            <p id="transition-modal-description">
              - To go back to home page:{" "}
              <span className={classes.span}>Go to home page</span>
            </p>
            <p id="transition-modal-description">
              - To open the cart:{" "}
              <span className={classes.span}>Show me the cart</span>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
