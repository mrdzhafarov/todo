import React from "react";
import styles from "./select.module.css";

import styled from "@emotion/styled";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
    SelectChangeEvent,
    SelectProps,
} from "@mui/material";

export type SelectOptionsType = {
    name: string;
    value: string | number;
};
export interface SelectPropsLocal extends Omit<SelectProps, "onChange"> {
    options: SelectOptionsType[];
    value: string | number;
    label?: string;
    onChange: (value: string | number) => void;
    required?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    helperText?: string | undefined | null;
    error?: boolean;
    hideLabel?: boolean;
}

const StyledSelect = styled(MuiSelect)({
    "&.MuiInputBase-input": {
        // padding: 0,
        backgroundColor: "gray!important",
    },
});

/**
 * @param value принимает только string или number;
 * по хорошему это надо исправить
 * @param options `Array of { name: string, value: string | number \}`
 */

const Select = React.forwardRef(
    (
        {
            onChange,
            options,
            value = "",
            label = "Выберите пункт",
            helperText,
            error,
            hideLabel,
            ...props
        }: SelectPropsLocal,
        ref
    ) => {
        const handleChange = (
            event: SelectChangeEvent<unknown>,
            child: React.ReactNode
        ) => {
            if (
                typeof event.target.value === "string" ||
                typeof event.target.value === "number"
            ) {
                onChange(event.target.value);
            }
        };

        return (
            <FormControl
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: (theme) =>
                            error ? theme.palette.error.main : "",
                        flex: "1",
                    },
                }}
            >
                {hideLabel ? null : (
                    <InputLabel
                    sx={{
                        color: (theme) => theme.palette.primary.light
                    }}
                        id="demo-simple-select-label"
                    >
                        {label}
                    </InputLabel>
                )}
                <StyledSelect
                    ref={ref}
                    value={String(value)}
                    label={hideLabel ? null : label}
                    onChange={handleChange}
                    id="demo-simple-select-label"
                    MenuProps={{
                        style: { top: 15, maxHeight: "400px" },
                    }}
                    {...props}
                >
                    {options.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.name}
                        </MenuItem>
                    ))}
                </StyledSelect>
                {helperText ? (
                    <FormHelperText error>{helperText}</FormHelperText>
                ) : null}
            </FormControl>
        );
    }
);

export default Select;
