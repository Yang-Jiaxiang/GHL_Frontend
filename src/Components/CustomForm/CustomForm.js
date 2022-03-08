import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useTheme } from '@mui/styles'
import useStyles from './Style'

import DatePicker from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

import { useDispatch } from 'react-redux'
import { fetchPatients, addPatient, removePatient } from '../../Redux/Slices/Patient'
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar'
import { openSnackbar } from '../../Redux/Slices/Snackbar'

const CustomForm = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [birth, setBirth] = useState(null)
    const [gender, setGender] = useState('女')
    const [age, setAge] = useState(0)
    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        //計算年紀
        if (birth) {
            const today = new Date()
            const birthday = new Date(`${birth.year}/${birth.month}/${birth.day}`)
            setAge(parseInt((today - birthday) / 31557600000)) // 31557600000 是 24 * 3600 * 365.25 * 1000 = 一年
        }
    }, [birth])

    const handleDelete = () => {
        setId('')
        setName('')
        setAddress('')
        setPhone('')
        setDepartment('')
        setBirth(null)
        setGender('女')
        setAge(0)
    }

    const handleSubmit = () => {
        dispatch(
            addPatient({
                id,
                name,
                address,
                phone,
                department,
                birth: `${birth.year}/${birth.month}/${birth.day}`,
                gender,
                age,
                updateTime: new Date().toLocaleString(),
            })
        )
        dispatch(openSnackbar('新增成功'))
        handleDelete()
    }

    const DatePickerCustomInput = ({ ref }) => {
        return (
            <TextField
                ref={ref} // necessary
                value={birth ? `${birth.year}/${birth.month}/${birth.day} - ${age}歲` : ''}
                variant="standard"
                label="生日"
                required
                InputProps={{
                    style: {
                        fontSize: '1.3rem',
                        color: theme.palette.primary.main,
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
                className={classes.textField}
            />
        )
    }

    const GenderPicker = () => {
        return (
            <FormControl className={classes.textField}>
                <FormLabel id="genderPicker" sx={{ fontSize: '1.5rem' }}>
                    性別
                </FormLabel>
                <RadioGroup row aria-labelledby="genderPicker" value={gender} onChange={e => setGender(e.target.value)}>
                    <FormControlLabel value="女" control={<Radio />} label={<Box className={classes.labelText}>女</Box>} />
                    <FormControlLabel value="男" control={<Radio />} label={<Box className={classes.labelText}>男</Box>} />
                    <FormControlLabel value="其他" control={<Radio />} label={<Box className={classes.labelText}>其他</Box>} />
                </RadioGroup>
            </FormControl>
        )
    }

    return (
        <Box className={classes.formWrapper}>
            <Box className={classes.formHeader}>新增病人</Box>
            <Box className={classes.formContainer}>
                <Box className={classes.formBody}>
                    <TextField
                        label="身分證字號"
                        variant="standard"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: '1.3rem',
                            },
                        }}
                        InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                        className={classes.textField}
                    />
                </Box>
                <Box className={classes.formBody}>
                    <TextField
                        label="姓名"
                        variant="standard"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: '1.3rem',
                            },
                        }}
                        InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                        className={classes.textField}
                    />
                    <TextField
                        label="地址"
                        variant="standard"
                        required
                        value={address}
                        multiline
                        maxRows={3}
                        onChange={e => setAddress(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: '1.1rem',
                            },
                        }}
                        InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                        className={classes.textField}
                    />
                    <TextField
                        label="電話"
                        variant="standard"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: '1.3rem',
                            },
                        }}
                        InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                        className={classes.textField}
                    />
                    <TextField
                        label="部門單位"
                        variant="standard"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                        InputProps={{
                            style: {
                                fontSize: '1.3rem',
                            },
                        }}
                        InputLabelProps={{ style: { fontSize: '1.3rem' } }}
                        className={classes.textField}
                    />
                </Box>
                <Box className={classes.formBody}>
                    <DatePicker value={birth} onChange={setBirth} shouldHighlightWeekends renderInput={DatePickerCustomInput} />
                    <GenderPicker />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" className={classes.button} onClick={handleSubmit}>
                        新增
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color="secondary"
                        sx={{ color: theme.palette.primary.main }}
                        onClick={handleDelete}
                    >
                        清除
                    </Button>
                </Box>
                <CustomSnackbar />
                {/* <table border="1">
                <tr>
                    <td>姓名</td>
                    <td>
                        <input type="text" id="patient_name" />
                    </td>
                    <td>性別</td>

                    <td>
                        <select id="patient_sex">
                            <option value=""></option>
                            <option value="man">男性</option>
                            <option value="female">女性</option>
                            <option value="other">其他</option>
                        </select>
                    </td>

                    <td>出生年月日</td>
                    <td>
                        <input type="date" id="patient_birthday" name="patient_birthday" />
                    </td>

                    <td>年齡</td>
                    <td>xxxxx</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td colspan="7">
                        <input type="text" id="patient_address" />
                    </td>
                </tr>
                <tr>
                    <td>電話</td>
                    <td>(白天)</td>
                    <td>
                        <input type="text" id="patient_telephone1" />
                    </td>
                    <td>(晚間)</td>
                    <td>
                        <input type="text" id="patient_telephone2" />
                    </td>
                    <td>(手機)</td>
                    <td colspan="2">
                        <input type="text" id="patient_phone" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2">部門單位</td>
                    <td colspan="2">
                        <input type="text" id="department" />
                    </td>
                    <td colspan="2">身分證字號</td>
                    <td colspan="2">
                        <input type="text" id="patient_id" />
                    </td>
                </tr>
            </table>
            <button style={{ marginTop: '1rem' }}>提交</button> */}
            </Box>
        </Box>
    )
}

export default CustomForm
