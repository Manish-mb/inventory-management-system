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
import { OrdersTable } from "src/sections/orders/orders-table";
import { getorderbychalannumber, saveorder } from "request/orders";
import { getrtlorderbychalannumber, savertlorder } from "request/rtlorders";
import SubDistributorFindOrCreateAutoComplete from "src/components/subdisctributorFindOrCreateAutoComplete";

const Page = () => {
  const [orderStock, setOrderStock] = useState({ items: [], grantTotal: 0 });
  const [distributorID, setDistributorID] = useState("");
  const [subDistributorID, setSubDistributorID] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");
  const [isRtlOrder, setisRtlOrder] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  const onPageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const getOrderByChalanData = (searchNumber) => {
    if (isRtlOrder) {
      getrtlorderbychalannumber({ chalanNumber: searchNumber }).then((res) => {
        setOrderStock(res.result);
        setFilteredData(res.result.items);
      });
    } else {
      getorderbychalannumber({ chalanNumber: searchNumber, distributorID, subDistributorID }).then(
        (res) => {
          setOrderStock(res.result);
          setFilteredData(res.result.items);
        }
      );
    }
  };

  const addOrder = (date, itemID, sizeQtyData) => {
    return new Promise(async (resolve, reject) => {
      if (!chalanNumber) {
        reject(false);
      } else {
        try {
          let itemIndex = orderStock.items.findIndex((item) => item.item._id === itemID);

          if (itemIndex != -1) {
            sizeQtyData.map(async (item) => {
              if (isRtlOrder) {
                await savertlorder({
                  chalanNumber: chalanNumber,
                  itemID,
                  date,
                  sizeID: item.sizeID,
                  qty: item.qty,
                });
              } else {
                if (!subDistributorID || !distributorID) {
                  reject(false);
                } else {
                  await saveorder({
                    subDistributorID: subDistributorID,
                    distributorID: distributorID,
                    chalanNumber: chalanNumber,
                    itemID,
                    date,
                    sizeID: item.sizeID,
                    qty: item.qty,
                  });
                }
              }
            });
          } else {
            let res;

            if (isRtlOrder) {
              res = await savertlorder({
                chalanNumber: chalanNumber,
                itemID,
                date,
                sizeID: sizeQtyData[0].sizeID,
                qty: sizeQtyData[0].qty,
              });
            } else {
              if (!subDistributorID || !distributorID) {
                reject(false);
              } else {
                res = await saveorder({
                  subDistributorID: subDistributorID,
                  distributorID: distributorID,
                  chalanNumber: chalanNumber,
                  itemID,
                  date,
                  sizeID: sizeQtyData[0].sizeID,
                  qty: sizeQtyData[0].qty,
                });
              }
            }

            if (res.status == "success") {
              setTimeout(async () => {
                if (isRtlOrder) {
                  sizeQtyData.map(async (item, key) => {
                    if (key != 0) {
                      await savertlorder({
                        chalanNumber: chalanNumber,
                        itemID,
                        date,
                        sizeID: item.sizeID,
                        qty: item.qty,
                      });
                    }
                  });
                } else {
                  sizeQtyData.map(async (item, key) => {
                    if (key != 0) {
                      if (!subDistributorID || !distributorID) {
                        reject(false);
                      } else {
                        await saveorder({
                          subDistributorID: subDistributorID,
                          distributorID: distributorID,
                          chalanNumber: chalanNumber,
                          itemID,
                          date,
                          sizeID: item.sizeID,
                          qty: item.qty,
                        });
                      }
                    }
                  });
                }
              }, 1000);
            }
          }
          setTimeout(() => {
            getOrderByChalanData(chalanNumber);
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
      getOrderByChalanData(chalanNumber);
    }, 800);
    return () => {
      clearTimeout(debounceId);
    };
  }, [chalanNumber, isRtlOrder, subDistributorID, distributorID]);
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
                <Typography variant="h4">
                  {isRtlOrder ? "RTL Order" : "Distributor Order"}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Button
                  onClick={() => {
                    setisRtlOrder(!isRtlOrder);
                  }}
                  variant="contained"
                >
                  {isRtlOrder ? "Distributor Order" : "RTL Order"}
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4}>
              {!isRtlOrder && (
                <>
                  <Stack spacing={1}>
                    <DistributorFindOrCreateAutoComplete setDistributorID={setDistributorID} />
                  </Stack>
                  {distributorID && <Stack spacing={1}>
                    <SubDistributorFindOrCreateAutoComplete
                      setSubDistributorID={setSubDistributorID}
                      distributorID={distributorID}
                    />
                  </Stack>}
                </>
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
            <ItemSizeForm addFunction={addOrder} />
            {/*  */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ChalanSearch
                chalanNumber={chalanNumber}
                setChalanNumber={setChalanNumber}
                handleSearch={getOrderByChalanData}
              />{" "}
            </div>
            {/* Inventory Table */}
            {filteredData.length > 0 && (
              <OrdersTable
                orderStock={orderStock}
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
