import React, { useEffect, useMemo, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    MenuList,
    Select,
} from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'

import useStyles from './Style'
import { apiCreateDepartment, apiDeleteDepartment, apiGetDepartments } from '../../Axios/Department'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import CustomInput from '../../Components/CustomForm/CustomInput'
import { ArrowDropDown, Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert } from '../../Redux/Slices/Alert'
import { createDepartment, deleteDepartment, fetchDepartment } from '../../Redux/Slices/Department'

const Department = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [errorField, setErrorField] = useState([])
    const dispatch = useDispatch()
    const classes = useStyles()
    const { results, count, page } = useSelector(state => state.department)

    const fetchData = async params => {
        dispatch(fetchDepartment(params))
    }

    const hasEmptyField = () => {
        const errorFieldList = Object.entries({ name, address })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const handleHelperText = fieldName => {
        switch (fieldName) {
            case 'name':
                return results.find(d => d.name === name) && '此部門已存在'
            default:
                return ''
        }
    }

    const handleChange = useDebouncedCallback((value, name) => {
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'address':
                setAddress(value)
                break

            default:
                break
        }
    }, 500)

    const handleSubmit = async () => {
        if (hasEmptyField()) return
        dispatch(createDepartment({ name, address }))
        setName('')
        setAddress('')
    }

    const columns = useMemo(
        () => [
            { accessor: 'name', Header: '部門名稱', Cell: row => row.row.original.name },
            { accessor: 'address', Header: '部門地址', Cell: row => row.row.original.address },
            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    const { _id, name, address } = row.row.original
                    return (
                        <Box>
                            <IconButton
                                onClick={() => {
                                    dispatch(
                                        openAlert({
                                            alertTitle: '確定刪除該部門?',
                                            toastTitle: '刪除成功',
                                            text: `${name} - ${address}`,
                                            icon: 'success',
                                            type: 'confirm',
                                            event: () => dispatch(deleteDepartment(_id)),
                                        })
                                    )
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )
                },
            },
        ],
        []
    )

    const inputModel = [
        { name: 'name', label: '部門名稱', value: name, setValue: setName, required: true },
        { name: 'address', label: '部門地址', value: address, setValue: setAddress, required: true },
    ]

    return (
        <Box className={classes.container}>
            <Accordion elevation={0} className={classes.accordion}>
                <AccordionSummary expandIcon={<ArrowDropDown />} sx={{ flexDirection: 'column-reverse' }} />
                <AccordionDetails>
                    <Box className={classes.formWrapper}>
                        <Box className={classes.formHeader}>新增部門</Box>
                        <Box className={classes.formContainer}>
                            {inputModel.map(({ name, label, value, setValue, required }) => (
                                <CustomInput
                                    key={name}
                                    name={name}
                                    label={label}
                                    value={value}
                                    setValue={setValue}
                                    handleChange={handleChange}
                                    handleHelperText={handleHelperText}
                                    error={errorField.includes(name)}
                                    required={required}
                                />
                            ))}
                            <Button
                                variant="contained"
                                className={classes.button}
                                sx={{ fontSize: '1.1rem ', padding: '.1rem', marginRight: '.5rem' }}
                                onClick={handleSubmit}
                            >
                                新增
                            </Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <CustomTable columns={columns} fetchData={fetchData} data={results} totalPage={page} totalCount={count} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Department