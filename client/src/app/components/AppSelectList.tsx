import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    label: string;
    name: string;
    required: boolean;
    items: string[];
    handleChange: (event: any) => void;
    initialVal?: string;
}

const AppSelectList = ({label, name, required, items, handleChange, initialVal}: Props) => {
    const [formValue, setFormValue] = useState(initialVal);
    useEffect(() => {
        setFormValue(initialVal);
        console.log(`initial value changed to ${initialVal}`)
    }, [initialVal])

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                required={required}
                defaultValue={initialVal}
                value={formValue}
                label={label}
                name={name}
                onChange={handleChange}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default AppSelectList;