import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { getallsubdistributors, savesubdistributor } from "request/subdistributors";

const filter = createFilterOptions();

export default function SubDistributorFindOrCreateAutoComplete({ setSubDistributorID,distributorID }) {
  const [items, setItems] = React.useState([]);

  const getAllSubDistributorList = () => {
    getallsubdistributors().then((res) => {
      setItems(res.result);
    });
  };
  React.useEffect(() => {
    getAllSubDistributorList();
  }, []);

  const [distributor, setDistributor] = React.useState(null);
  const [addNewModalopen, setaddNewModalOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      name: "",
      distributorID:distributorID
    });
    setaddNewModalOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: "",
    distributorID:distributorID
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      savesubdistributor(dialogValue).then((res) => {
        if (res.status == "success") {
          getallsubdistributors().then((res2) => {
            if (res2.status == "success") {
              setItems(res2.result);
              setTimeout(() => {
                setDistributor({
                  name: res.result.name,
                });
                handleClose();
              }, 1000);
            }
          });
        }
        setSubDistributorID(res.result._id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={distributor}
        onChange={(event, value) => {
          if (typeof value === "string") {
            setTimeout(() => {
              setaddNewModalOpen(true);
              setDialogValue({
                name: value,
                distributorID:distributorID
              });
            });
          } else if (value && value.inputValue) {
            setaddNewModalOpen(true);
            setDialogValue({
              name: value.inputValue,
              distributorID:distributorID
            });
          } else {
            setSubDistributorID(value?._id);
            setDistributor(value);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={items}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 150 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            variant="standard"
            {...params}
            label="Enter Sub Distributor"
            style={{ width: 150 }}
          />
        )}
      />

      <Dialog open={addNewModalopen} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Sub Distributor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any Sub Distributor in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                  distributorID:distributorID
                })
              }
              label="Distributor"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
