import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, IconButton, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const ChalanSearch = ({ chalanNumber, setChalanNumber ,handleSearch}) => (
  <>
    <OutlinedInput
      value={chalanNumber}
      onChange={(e)=>setChalanNumber(e.target.value)}
      fullWidth
      placeholder="Search Chalan Number"
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            disabled={!chalanNumber}
            aria-label="toggle password visibility"
            onClick={()=>handleSearch(chalanNumber)}
            edge="end"
          >
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
          </IconButton>
        </InputAdornment>
      }
      sx={{ maxWidth: 300 }}
    />
  </>
);
