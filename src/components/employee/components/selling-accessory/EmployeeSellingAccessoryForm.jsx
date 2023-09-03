import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React from 'react';
import { _getAllCategory } from '../../../../services/categoryService';
import SellIcon from '@mui/icons-material/Sell';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { _createAccessory, _getCurrentAccessoryById, _updateAccessory } from '../../../../services/accessoryService';

const EmployeeSellingAccessoryForm = () => {

    const param = useParams()
    const navigate = useNavigate()

    const [allCategory, setAllCategory] = React.useState([])
    const [currentProduct, setCurrentProduct] = React.useState({
        name: '',
        category: '',
        id: null,
        companyName: '',
        quantity: '',
        description: '',
        price: '',
        status: 'Inactive',
        employeeId: JSON.parse(localStorage.getItem('user')).id
    })

    React.useEffect(() => {
        if (param.id) getCurrentAccessoryById()
        _getAllCategory().then(result => setAllCategory(result.data))
    }, [])

    const getCurrentAccessoryById = () => {
        _getCurrentAccessoryById(param.id).then(
            (result) => {
                setCurrentProduct(result.data);
            })
    }

    const addUserStyle = {
        position: 'absolute',
        right: '30px'
    }

    const handleChange = (e) => {
        console.log(e);
        const { value, name } = e.target
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        })
    }

    const updateAccessory = () => {
        _updateAccessory(currentProduct).then(
            (result) => {
                if (result.status === 200) {
                    alert('Accessory Udpated Successfully')
                    navigate('/employee/accessory')
                }
            })
    }

    return (
        <>
            {
                // <Button onClick={() => updateAccessory()}
                //     variant='contained' style={addUserStyle} color='primary'>
                //     <SellIcon />
                //     Sell
                // </Button>
            }
            <hr className='auto-hr' />
            {/* <div className="row">
                <div className="col-md-3">
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f7f7f7' }}>
                        <div className="col-md-12">
                            <TextField label="Customer Name" variant="standard" className='w-100' />
                        </div>
                        <div className="col-md-12">
                            <TextField label="Email Id" variant="standard" className='w-100' />
                        </div>
                        <div className="col-md-12">
                            <TextField label="Contact Number" variant="standard" className='w-100' />
                        </div>
                    </Paper>
                </div>
                <div className="col-md-9">
                    <div className='row'>
                        <div className="col-md-3">
                            <TextField label="Accessory Name" variant="standard" className='w-100'
                                value={currentProduct.name}
                                name='name'
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="col-md-3">
                            <FormControl className='w-100' variant="standard">
                                <InputLabel>Category</InputLabel>
                                <Select value={currentProduct.category}
                                    name='category'
                                    onChange={(e) => handleChange(e)}>
                                    {
                                        allCategory.map((category, index) => (
                                            <MenuItem key={index} value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="row">
                <div className="col-md-3 border border-info" style={{ padding: '15px' }}>
                    <h6 className='selling-accessory-title'>Customer Details</h6>
                    <TextField label="Name" variant="standard" className='w-100' />
                    <TextField label="Email Id" variant="standard" className='w-100' />
                    <TextField label="Contact Number" variant="standard" className='w-100' />
                    <TextField label="Address" variant="standard" className='w-100' />
                </div>
                <div className="col-md-9">
                    <div className="row selling-accessory-form">
                        <div className='col-md-4'>
                            <TextField label="Accessory Name" variant="standard" className='w-100' />
                        </div>
                        <div className='col-md-4'>
                            <TextField label="Quantity" variant="standard" className='w-100' />
                        </div>
                        <div className='col-md-4'>
                            <Button variant='contained' color='info'>Add To Details</Button>
                        </div>
                    </div>
                    <h6 className='mt-4 selling-accessory-title'>Accessory Details</h6>
                    <table className='table table-border'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Oil XYZ</td>
                                <td>10</td>
                                <td>500</td>
                                <td>5000</td>
                                <td>
                                    <CloseIcon />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default EmployeeSellingAccessoryForm;
