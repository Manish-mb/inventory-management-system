import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Box, Stack, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { InventoryTable } from "src/sections/inventory/inventory-table";
import { useCallback, useEffect, useState } from "react";
import { getcurruntstock, saveinventory } from "request/curruntStock";
import ItemSizeForm from "src/sections/inventory/itemSizeForm";
import { ItemSearch } from "src/components/SearchItem";

const Page = () => {
  const [curruntStock, setCurruntStock] = useState({ items: [], grantTotal: 0 });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onPageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const getInventoryData = () => {
    getcurruntstock().then((res) => {
      setCurruntStock(res.result);
      setFilteredData(res.result.items);
    });
  };

  const addInventory = (date, itemID, sizeQtyData) => {
    return new Promise(async (resolve, reject) => {
      try {
        let itemIndex = curruntStock.items.findIndex((item) => item.item._id === itemID);

        if (itemIndex != -1) {
          sizeQtyData.map(async (item) => {
            await saveinventory({
              itemID,
              date,
              sizeID: item.sizeID,
              qty: item.qty,
            });
          });
        } else {
          let res = await saveinventory({
            itemID,
            date,
            sizeID: sizeQtyData[0].sizeID,
            qty: sizeQtyData[0].qty,
          });

          if (res.status == "success") {
            setTimeout(async () => {
              sizeQtyData.map(async (item, key) => {
                if (key != 0) {
                  await saveinventory({
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
          getInventoryData();
          resolve(true);
        }, 2000);
      } catch (error) {
        reject(false);
      }
    });
  };
  useEffect(() => {
    getInventoryData();
  }, []);

  const handleSearchItem = (searchStr) => {
    let tempArray = curruntStock.items;
    let filteredArray = tempArray.filter((item) => {
      return item.item?.itemcode.includes(searchStr);
    });
    setFilteredData(filteredArray);
  };
  useEffect(() => {
    if (searchText) {
      const debounceId = setTimeout(() => {
        handleSearchItem(searchText);
      }, 800);
      return () => {
        clearTimeout(debounceId);
      };
    } else {
      setFilteredData(curruntStock.items);
    }
  }, [searchText]);
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
                <Typography variant="h4">Inventory</Typography>
              </Stack>
            </Stack>
            {/*  */}
            <ItemSizeForm addFunction={addInventory} />
            {/*  */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ItemSearch
                text={searchText}
                setText={setSearchText}
                handleSearch={handleSearchItem}
              />
            </div>
            {/* Inventory Table */}
            <InventoryTable
              curruntStock={curruntStock}
              count={filteredData.length}
              page={page}
              rows={filteredData}
              rowsPerPage={rowsPerPage}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
