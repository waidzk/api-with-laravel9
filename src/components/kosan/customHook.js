import { useState, useEffect } from "react";
import axios from '@/lib/axios'
import { useFormik } from "formik";

import { kosanSchema } from "@/components/kosan/schema";


const useKosan = () => {
    const [allKosan, setAllKosan] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues : {
            name: '',
            description: '',
            price: 0,
            place: '',
        },
        validationSchema: kosanSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                const formData = {
                    id: values.id,
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    place_id: values.place,
                }
                if(formData.id){                    
                    handleUpdateAllKosan(formData)
                } else {
                    handleAddKosan(formData)
                }
                
                resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    })

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get("http://localhost:8000/api/allKosan");
    
                setAllKosan(data.data);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        })()
    }, []);

    useEffect(() => {
        getPlaces()
    }, []);

    const getKosan = async id => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/allKosan/${id}`);

            const kosan = data.data;

            formik.setFieldValue('name', kosan.name);
            formik.setFieldValue('description', kosan.description);
            formik.setFieldValue('price', kosan.price);
            formik.setFieldValue('id', kosan.id);
            formik.setFieldValue('place', kosan.place.id);
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaces = async () => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/places`);

            const places = data.data.map(item => ({
                id: item.id,
                label: item.name,
            }))

            setPlaces(places)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddKosan = async values => {
        const { data } = await axios.post('http://localhost:8000/api/allKosan', values,);

        const kosan = data.data

        setAllKosan(prev => [...prev, kosan])
    }

    const handleUpdateAllKosan = async values => {
        const { data } = await axios.put(`http://localhost:8000/api/allKosan/${values.id}`, values,);

        const kosan = data.data

        const updatedAllKosan = allKosan.map(item => 
            item.id === kosan.id ? kosan : item,
            )

        setAllKosan(updatedAllKosan);
    }

    const handleDeleteKosan = async id => {
        const isOK = confirm('Are you sure want to delete this data?');

        if(isOK) {
            try {
                await axios.delete(`http://localhost:8000/api/allKosan/${id}`);

                const filteredAllKosan = allKosan.filter(item => item.id !== id);

                setAllKosan(filteredAllKosan);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return {
        formik,
        places,
        allKosan,
        kosanError: error,
        getKosan,
        handleDeleteKosan,
    }
}

export default useKosan;