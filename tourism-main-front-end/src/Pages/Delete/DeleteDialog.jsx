import { Dialog } from "@mui/material";
import "./DeleteDialog.css";
import cancelImage from "../../assets/cancel.svg";
import refundImage from "../../assets/refund.svg";
import deleteImage from "../../assets/delete.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Cancel, Refund, Delete } from "./DeleteSlice"; // Adjusted imports
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
function DeleteDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const Data = useSelector(
    (state) => state.delete?.cancel[state.delete.cancel.length - 1]?.detail
  );
  const Dataa = useSelector(
    (state) => state.delete?.refund[state.delete.refund.length - 1]?.detail
  );
  let [isCancelled, setisCancelled] = useState(true);
  let [isRefund, setisRefund] = useState(false);
  let [isDelete, setisDelete] = useState(false);
  let [DialogOpen, setDialogOpen] = useState(true);

  const handleClose = () => {
    setDialogOpen(false);
    navigate("/activities");
  };
  console.log(Data);
  console.log(Dataa);

  const handleCancel = () => {
    dispatch(Cancel(params.id));
    if (Data === "success" || Data === "already canceled") {
      setisCancelled(false);
      setisRefund(true);
    }
  };

  const handleRefund = () => {
    dispatch(Refund(params.id));
    if (Dataa === "success") {
      setisRefund(false);
      setisDelete(true);
    }
  };

  const handleDelete = () => {
    dispatch(Delete(params.id));
    navigate("/activities");
  };

  return (
    <Dialog open={DialogOpen}>
      <div className="deleteservice">
        <div className="icon" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={["fas", "times"]}
            style={{ color: "white", fontSize: "24px", paddingTop: "20px" }}
            onClick={handleClose}
          />
        </div>
        {isCancelled && (
          <div className="refund">
            <div className="imagee">
              <img src={cancelImage} alt="" />
            </div>
            <div className="button_delete">
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
        {isRefund && (
          <div className="cancel">
            <div className="imagee">
              <img src={refundImage} alt="" />
            </div>
            <div className="button_delete">
              <button onClick={handleRefund}>Refund</button>
            </div>
          </div>
        )}
        {isDelete && (
          <div className="delete">
            <div className="imagee">
              <img src={deleteImage} alt="" />
            </div>
            <div className="button_delete">
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default DeleteDialog;
