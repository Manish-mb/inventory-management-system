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

export const OrdersTable = (props) => {
  const {
    count = 0,
    page = 0,
    rowsPerPage = 0,
    rows = [],
    orderStock,
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
      stockData: orderStock,
    });
  }, [sizeCount]);

  return (
    <>
      {openPrintModal && (
        <PrintModal
          title="Order"
          data={printingData}
          setOpen={setOpenPrintModal}
          open={openPrintModal}
        />
      )}
      <Card>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "800px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Distributor</TableCell>
                <TableCell>SubDistributor</TableCell>
                <TableCell>Item Code</TableCell>
                {sizes && sizes.map((item, key) => <TableCell key={key}>{item?.name}</TableCell>)}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderStock &&
                rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    return (
                      <TableRow hover key={key}>
                        <TableCell>
                          <Typography variant="subtitle2">{row?.distributor}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{row?.subDistributor}</Typography>
                        </TableCell>
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
                <TableCell colSpan={3}>
                  <Button
                    onClick={() => {
                      setOpenPrintModal(true);
                    }}
                  >
                    Print Purchase Order
                  </Button>
                </TableCell>
                {sizeCount?.map((item, key) => (
                  <TableCell key={key}>{item}</TableCell>
                ))}
                <TableCell>Total : {orderStock.grantTotal}</TableCell>
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

OrdersTable.propTypes = {
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
