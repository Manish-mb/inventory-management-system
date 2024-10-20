import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, IconButton, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const ItemSearch = ({ text, setText ,handleSearch}) => (
  <>
    <OutlinedInput
      value={text}
      onChange={(e)=>setText(e.target.value)}
      fullWidth
      placeholder="Search Design Code"
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            disabled={!text}
            aria-label="toggle password visibility"
            onClick={()=>handleSearch(text)}
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
