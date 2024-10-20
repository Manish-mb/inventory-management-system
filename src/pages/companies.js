import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { DatePicker } from '@mui/x-date-pickers';
import { Scrollbar } from 'src/components/scrollbar';
import FreeSoloCreateOptionDialog from 'src/components/ItemFindOrCreateAutoComplete';
// import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from '@mui/icons-material/Delete';

const Page = () => (
  <>
    <Head>
      <title>
      Dispatch
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
           <Container maxWidth="xl">
      <Stack direction="row" marginBottom={6} justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Dispatch</Typography>
            </Stack>
          </Stack>
        
        <Stack spacing={2}>
         
        <div style={{display:'flex' , justifyContent:"space-between", flexDirection:"column"}} >
          <div spacing={2} style={{display:"flex" , flexDirection:"row" , alignItems:"center" , marginBottom:5 , gap:15 }}>
        <TextField  id="outlined-basic"  label="Enter Distributor name" variant="outlined"/>
        <TextField id="outlined-basic" label="Enter Challan Number" variant="outlined"  />
        </div>
        <div  style={{gap:15, display:"flex"}}>
        <TextField id="outlined-basic" label="Enter Sub-Distributor name" variant="outlined"  />
        <TextField id="outlined-basic" label="Dispatch No." variant="outlined"  />
        <DatePicker label="Select Date"/>
        </div>
        {/*  */}
        </div>

          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Typography variant="h6">Add Items For Sub Distributor  Order</Typography>
          </div>
          {/*  */}
          <Card>
            <Scrollbar>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Design Code</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>34</TableCell>
                      <TableCell>36</TableCell>
                      <TableCell>38</TableCell>
                      <TableCell>40</TableCell>
                      <TableCell>42</TableCell>
                      <TableCell>44</TableCell>
                      <TableCell>46</TableCell>
                      <TableCell>48</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            <FreeSoloCreateOptionDialog />
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-number"
                          placeholder="0"
                          variant="standard"
                          style={{ fontSize: "0.20rem" }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
          </Card>
          {/*  */}
          <div style={{ display: "flex", justifyContent: "end" }}>
            {/* <ItemSearch />{" "} */}
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Add Item
            </Button>
          </div>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // py: 2,
            }}
          >
            <Card>
              <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Design Code</TableCell>
                        <TableCell>28</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>32</TableCell>
                        <TableCell>34</TableCell>
                        <TableCell>36</TableCell>
                        <TableCell>38</TableCell>
                        <TableCell>40</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>44</TableCell>
                        <TableCell>46</TableCell>
                        <TableCell>48</TableCell>
                        <TableCell>Delet</TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Typography variant="subtitle2">XYZ</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <Button>
                        <DeleteIcon/>
                        </Button>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Scrollbar>
              <TablePagination
                component="div"
                count={5}
                onPageChange={10}
                onRowsPerPageChange={4}
                page={12}
                rowsPerPage={5}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
          <div style={{ display: "flex", justifyContent: "end" }}>
            {/* <ItemSearch />{" "} */}
            <Button
              
              variant="contained"
            >
              Print Invoice
            </Button>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
