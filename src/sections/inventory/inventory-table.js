import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { UseConstants } from "src/contexts/constants-context";
import { useEffect, useState } from "react";
import PrintModal from "src/components/printModal";

export const InventoryTable = (props) => {
  const {
    count = 0,
    page = 0,
    rowsPerPage = 0,
    rows = [],
    curruntStock,
    onPageChange,
    onRowsPerPageChange,
  } = props;

  const { sizes } = UseConstants();

  const [sizeCount, setSizeCount] = useState([]);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [printingData, setPrintingData] = useState(null);

  useEffect(() => {
    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
      row?.sizes?.map((item, key2) => {
        setSizeCount((prevData) => {
          if (key == 0) {
            return [...prevData, item.qty];
          } else {
            let oldArray = prevData;
            let tempCount = prevData[`${key2}`] + item.qty;
            oldArray[`${key2}`] = tempCount;
            return oldArray;
          }
        });
      });
    });
    
    return () => {
      setSizeCount([]);
    };
  }, [rows]);


  useEffect(() => {
    setPrintingData({
      finalCountRow: sizeCount,
      stockData: curruntStock,
    });
  }, [sizeCount]);

  return (
    <>
      {openPrintModal &&<PrintModal
        title="Inventory"
        data={printingData}
        setOpen={setOpenPrintModal}
        open={openPrintModal}
      />}
      <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Design Code</TableCell>
                {sizes &&
                  sizes.map((item, key) => {
                    return <TableCell key={key}>{item?.name}</TableCell>;
                  })}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {curruntStock &&
                rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    return (
                      <TableRow hover key={key}>
                        <TableCell>
                          <Typography variant="subtitle2">{row?.item?.itemcode}</Typography>
                        </TableCell>
                        {row?.sizes &&
                          row?.sizes?.map((item, key) => (
                            <TableCell key={key}>{item?.qty}</TableCell>
                          ))}
                        <TableCell>{row?.totalqty}</TableCell>
                      </TableRow>
                    );
                  })}
              <TableRow>
                <TableCell>
                  <Button
                    onClick={() => {
                      setOpenPrintModal(true);
                    }}
                  >
                    Print
                  </Button>
                </TableCell>
                {sizeCount?.map((item, key) => (
                  <TableCell key={key}>{item}</TableCell>
                ))}
                <TableCell>Total : {curruntStock.grantTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Card>
    </>
  );
};

InventoryTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
