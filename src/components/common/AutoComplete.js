// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import Chip from "@mui/material/Chip";
// import { useTheme } from "@emotion/react";

// const filter = createFilterOptions();

// export default function AutoComplete({
//   id,
//   placeholder,
//   sx,
//   value,
//   defaultValue,
//   onChange,
//   data,
//   disabled = false,
//   multiple = false,
//   limitTags = 5,
// }) {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         display: "flex",
//         borderRadius: "25px",
//         height: "40px",
//         boxShadow: "none",
//         border: `1px solid ${theme.palette.grayBorder}`,
//         ...sx,
//       }}
//     >
//       <Autocomplete
//         multiple={multiple}
//         limitTags={limitTags}
//         sx={{
//           width: "100%",
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: "none",
//           },
//         }}
//         disabled={disabled}
//         size="small"
//         id={id}
//         placeholder={placeholder}
//         value={value}
//         defaultValue={defaultValue}
//         onChange={(event, newValue) => onChange(event, newValue, id)}
//         filterOptions={(options, params) => {
//           const filtered = filter(options, params);
//           const { inputValue } = params;

//           if (inputValue && inputValue.length && inputValue.length > 1) {
//             // Suggest the creation of a new value
//             const isExisting = options.some(
//               (option) => inputValue === option.name
//             );
//             if (inputValue !== "" && !isExisting) {
//               filtered.push({
//                 inputValue,
//                 name: `Add "${inputValue}"`,
//               });
//             }
//             return filtered;
//           } else {
//             return [];
//           }
//         }}
//         selectOnFocus
//         clearOnBlur
//         handlehomeendkeysfilter="true"
//         options={data}
//         getOptionLabel={(option) => {
//           // Value selected with enter, right from the input
//           if (typeof option === "string") {
//             return option;
//           }
//           // Add "xxx" option created dynamically
//           if (option.inputValue) {
//             return option.inputValue;
//           }
//           // Regular option
//           return option.name || "";
//         }}
//         renderOption={(props, option) => <li {...props}>{option.name}</li>}
//         freeSolo
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder={placeholder}
//             sx={{
//               "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
//                 paddingTop: multiple ? "3px" : "6px",
//               },
//             }}
//           />
//         )}
//         renderTags={(value, getTagProps) => {
//           if (multiple && value[0] != "") {
//             return value.map((option, index) => (
//               <Chip
//                 variant="outlined"
//                 label={option?.name || option}
//                 {...getTagProps({ index })}
//               />
//             ));
//           }
//         }}
//       />
//     </Paper>
//   );
// }
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/system";

const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-popupIndicator {
    display: none;
  }
`;

const filter = createFilterOptions();

export default function AutoComplete({
  id,
  placeholder,
  sx,
  value,
  defaultValue,
  onChange,
  data,
  disabled = false,
  multiple = false,
  limitTags = 5,
  allowCustomInput = true,
  index,
}) {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        borderRadius: "25px",
        height: "40px",
        boxShadow: "none",
        border: `1px solid ${theme.palette.grayBorder}`,
        ...sx,
      }}
    >
      <StyledAutocomplete
        multiple={multiple}
        limitTags={limitTags}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        disabled={disabled}
        size="small"
        id={id}
        index={index}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(event, newValue) => onChange(event, newValue, id, index)}
        filterOptions={(options, params) => {
          const newOptionsArr = options.filter((val) => val?.name != "");
          const filtered = filter(newOptionsArr, params);
          const { inputValue } = params;

          if (
            inputValue &&
            inputValue.length &&
            inputValue.length > 1 &&
            allowCustomInput
          ) {
            // Suggest the creation of a new value
            const isExisting = newOptionsArr.some(
              (option) => inputValue === option.name
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }
            return filtered;
          } else {
            return filtered;
          }
        }}
        selectOnFocus
        clearOnBlur
        handlehomeendkeysfilter="true"
        options={data}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name || "";
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            sx={{
              "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                paddingTop: multiple ? "3px" : "6px",
              },
            }}
          />
        )}
        renderTags={(value, getTagProps) => {
          if (multiple && value[0] != "") {
            return value.map((option, index) => (
              <>
                <Chip
                  variant="outlined"
                  label={option?.name || option}
                  {...getTagProps({ index })}
                />
              </>
            ));
          }
        }}
      />
    </Paper>
  );
}
