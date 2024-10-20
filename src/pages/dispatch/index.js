import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Stack,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ChalanSearch, ItemSearch } from "src/components/SearchChalan";
import { useCallback, useEffect, useState } from "react";
import ItemSizeForm from "src/sections/inventory/itemSizeForm";
import DistributorFindOrCreateAutoComplete from "src/components/disctributorFindOrCreateAutoComplete";
import { getdispatchbychalannumber, savedispatch } from "request/dispatch";
import { DispatchTable } from "src/sections/dispatch/dispatch-table";
import SubDistributorFindOrCreateAutoComplete from "src/components/subdisctributorFindOrCreateAutoComplete";

const Page = () => {
  const [dispatchStock, setDispatchStock] = useState({ items: [], grantTotal: 0 });
  const [distributorID, setDistributorID] = useState("");
  const [subDistributorID, setSubDistributorID] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  const onPageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const getDispatchByChalanData = (searchNumber) => {
    getdispatchbychalannumber({ chalanNumber: searchNumber,distributorID,subDistributorID }).then((res) => {
      setDispatchStock(res.result);
      setFilteredData(res.result.items);
    });
  };

  const addDispatch = (date, itemID, sizeQtyData) => {
    return new Promise(async (resolve, reject) => {
      if (!distributorID || !chalanNumber || !subDistributorID) {
        reject(false);
      } else {
        try {
          let itemIndex = dispatchStock.items.findIndex((item) => item.item._id === itemID);

          if (itemIndex != -1) {
            sizeQtyData.map(async (item) => {
              await savedispatch({
                distributorID: distributorID,
                subDistributorID: subDistributorID,
                chalanNumber: chalanNumber,
                itemID,
                date,
                sizeID: item.sizeID,
                qty: item.qty,
              });
            });
          } else {
            let res;
            res = await savedispatch({
              distributorID: distributorID,
              subDistributorID: subDistributorID,
              chalanNumber: chalanNumber,
              itemID,
              date,
              sizeID: sizeQtyData[0].sizeID,
              qty: sizeQtyData[0].qty,
            });

            if (res.status == "success") {
              setTimeout(async () => {
                sizeQtyData.map(async (item, key) => {
                  if (key != 0) {
                    await savedispatch({
                      distributorID: distributorID,
                      subDistributorID: subDistributorID,
                      chalanNumber: chalanNumber,
                      itemID,
                      date,
                      sizeID: item.sizeID,
                      qty: item.qty,
                    });
                  }
                });
              }, 1000);
            }
          }
          setTimeout(() => {
            getDispatchByChalanData(chalanNumber);
            resolve(true);
          }, 2000);
        } catch (error) {
          reject(false);
        }
      }
    });
  };

  useEffect(() => {
    const debounceId = setTimeout(() => {
      getDispatchByChalanData(chalanNumber);
    }, 800);
    return () => {
      clearTimeout(debounceId);
    };
  }, [chalanNumber,subDistributorID,distributorID]);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Dispatch Order</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Stack spacing={1}>
                <DistributorFindOrCreateAutoComplete setDistributorID={setDistributorID} />
              </Stack>

              {distributorID && (
                <Stack spacing={1}>
                  <SubDistributorFindOrCreateAutoComplete
                    distributorID={distributorID}
                    setSubDistributorID={setSubDistributorID}
                  />
                </Stack>
              )}

              <Stack spacing={1}>
                <TextField
                  id="outlined-basic"
                  name="chalanNumber"
                  label="Enter Challan Number"
                  variant="standard"
                  onChange={(e) => {
                    setChalanNumber(e.target.value);
                  }}
                  value={chalanNumber}
                />
              </Stack>
            </Stack>
            {/*  */}
            <ItemSizeForm addFunction={addDispatch} />
            {/*  */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ChalanSearch
                chalanNumber={chalanNumber}
                setChalanNumber={setChalanNumber}
                handleSearch={getDispatchByChalanData}
              />{" "}
            </div>
            {/* Inventory Table */}
            {filteredData.length > 0 && (
              <DispatchTable
                dispatchStock={dispatchStock}
                count={filteredData.length}
                page={page}
                rows={filteredData}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
