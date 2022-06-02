import { useState, useEffect, useRef } from "react";

import supabase from "../../../supabaseClient";

import { useNavigate } from "react-router-dom";
import { Button, Typography, Modal, Box, Input } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  input: {
    width: "95%",
    height: "40px",
    outline: "none",
    border: "1px solid #676767",
    borderRadius: "0px",
    padding: "10px",
  },
};

const Body = () => {
  const [open, setOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const newMeetingTitleRef = useRef();
  let navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchMeetings();
  });

  const fetchMeetings = async () => {
    let { data: meetings, error } = await supabase.from("meetings").select("*");
    if (error) console.log(error);
    else setMeetings(meetings);
  };

  const createNewMeeting = async () => {
    const title = newMeetingTitleRef.current.value;
    console.log(title);
    const { data: meeting, error } = await supabase
      .from("meetings")
      .insert({ title: title })
      .single();
    if (error) console.log(error);
    else {
      setMeetings([meeting, ...meetings]);
      newMeetingTitleRef.current.value = "";
      handleClose();
    }
  };

  return (
    <Box
      sx={{
        mt: "4rem",
      }}
    >
      {/* HERO BANNER */}
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
        Meetings
      </Typography>
      {/* NEW MEETING CTA */}
      <Button sx={{ mt: "2rem" }} variant="contained" onClick={handleOpen}>
        Create new meeting
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <Input
            type="text"
            inputRef={newMeetingTitleRef}
            name="title"
            placeholder="Add the Title"
            sx={style.input}
          />
          <Button
            sx={{ mt: "2rem" }}
            onClick={createNewMeeting}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </Modal>
      {/* MEETING LIST */}
      <TableContainer component={Paper} sx={{ mt: "3rem" }}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow
                hover
                key={meeting.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
              >
                <TableCell component="th" scope="row">
                  {meeting.title}
                </TableCell>
                <TableCell align="right">{meeting.held_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Body;
