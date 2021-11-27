import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[];
    onChange : (event: any) => void;
    selectedValue: string;
}

const RadioButtonGroup = ({ options, onChange, selectedValue }: Props) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Order by</FormLabel>
            <RadioGroup onChange={onChange} value={selectedValue}>
            {options.map(({ value, label }) => (
                <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
            ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup;