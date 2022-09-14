import React, { useState } from "react";
import PropTypes from "prop-types";

import FormControl from "@/components/form/formControl";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import Select from "@/components/Select";

const Form = ({ formik, places }) => {

    return (
    <div className="w-full p-4">
        <form className="w-full" onSubmit={formik.handleSubmit}>
            <FormControl label="Name" id="name">
                <Input placeholder="Input your kosan name" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors && 
                <label className="text-red-500">
                    {formik.errors['name']}
                </label>}
            </FormControl>

            <FormControl label="Place" id="place">
                <Select options={places} id="place" name="place" onChange={formik.handleChange} value={formik.values.place}/>
                {formik.errors && 
                <label className="text-red-500">
                    {formik.errors['place']}
                </label>}
            </FormControl>

            <FormControl label="Description" id="description">
                <Input placeholder="Input your kosan description" id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
                {formik.errors && 
                <label className="text-red-500">
                    {formik.errors['description']}
                </label>}
            </FormControl>

            <FormControl label="Price" id="price">
                <Input placeholder="Input your kosan price" id="price" type="number" name="price" onChange={formik.handleChange} value={formik.values.price} />
            </FormControl>

            <Button type="submit" disabled={!formik.isValid && formik.dirty}>
                {formik.values.id ? "Update" : "Submit"}
            </Button>
        </form>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </div>
    )
}

Form.propTypes = {
}

export default Form;