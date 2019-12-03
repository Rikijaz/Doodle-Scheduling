import React, { useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Category(props) {
    const [state, setState] = React.useState({
        work: false,
        school: false,
        social: false
    });

    const handleChange = name => event => {
        setState({ state, [name]: event.target.checked });
    };

    /**
     * ComponentDidMount, this checks boxes if you are editing
     * event
     */
    useEffect(() => {
        if(props.checked === "work"){
            setState({work: true})
        }
        else if(props.checked === "school"){
            setState({school: true})
        }
        else if(props.checked === "social"){
            setState({social: true})
        }

    },[])

    /**
     * Everytime you click on box, 
     * it will update
     */
    useEffect(() => {
        let text = "";
        if (state.work) {
            text = "work";
        } else if (state.school) {
            text = "school";
        } else if (state.social) {
            text = "social";
        } else {
            text = "";
        }
        props.setCategory(text);
        // eslint-disable-next-line
    }, [state]);

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.work}
                        onChange={handleChange("work")}
                        value="work"
                    />
                }
                label="Work"
                labelPlacement="top"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.school}
                        onChange={handleChange("school")}
                        value="school"
                        color="primary"
                    />
                }
                label="School"
                labelPlacement="top"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.social}
                        onChange={handleChange("social")}
                        value="social"
                        color="primary"
                    />
                }
                label="Social"
                labelPlacement="top"
            />
        </FormGroup>
    );
}
