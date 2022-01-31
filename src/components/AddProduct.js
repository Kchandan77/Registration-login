import React, { useEffect, useState } from 'react'
import { Row, Form, Col, Button, Table, Tooltip, Overlay, OverlayTrigger } from 'react-bootstrap';

import editIcon from './assets/edit-solid.svg';
import deleteIcon from './assets/trash-alt-solid.svg';



const getProductDetails = () => {
    const productDetails = localStorage.getItem('productList');
    if (productDetails) {
        return JSON.parse(localStorage.getItem('productList'));
    } else
        return [];
}

export const AddProduct = () => {


    const loginData = JSON.parse(localStorage.getItem('loginUsers'))
    const userEmailId = loginData.map(v => v.userName)
    const userData = JSON.parse(localStorage.getItem('users'));
    const emaiId = userData.filter((data) => data.email === userEmailId[0])
    const roleName = emaiId[0].role

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [files, setFiles] = useState("");
    const [toggleBtn, setToggleBtn] = useState(true)

    const [isEdit, setIsEdit] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [productList, setProductList] = useState(getProductDetails());


    useEffect(() => {
        localStorage.setItem('productList', JSON.stringify(productList))
    }, [productList])

    const onEdit = (id) => {
        let newEditProduct = productList.find((elem) => {
            return elem.id === id;
        })
        // console.log(newEditProduct)
        // console.log('edit', id);
        setToggleBtn(false)
        setIsEdit(id);
        setProductName(newEditProduct.productName);
        setPrice(newEditProduct.price);
        setQuantity(newEditProduct.quantity);

    }



    const AddProduct = (e) => {
        e.preventDefault();
        formValidation();
        if (!(productName && price && quantity)) {

        } else if ((productName || price || quantity) && !toggleBtn) {
            setProductList(
                productList.map((data) => {
                    if (data.id === isEdit) {
                        return {
                            ...data,
                            productName: productName,
                            price: price,
                            quantity: quantity,
                            files:files
                        }

                    }
                    return data;
                })
            )
            setToggleBtn(true)
            setIsEdit('');
            setProductName('');
            setPrice(0);
            setQuantity(0);


        } else {
            alert('Product added successfully..!')
            window.location.reload();
            let product = {
                id: new Date().getTime().toString(),
                productName: productName,
                price: price,
                quantity: quantity,
                files:files
            }

            setProductList([...productList, product])
        }

    }



    const formValidation = () => {
        const formErrors = {};
        let isFormValid = true;

        //for product name
        if (!productName) {
            isFormValid = false;
            formErrors.productNameError = 'Product name is required';
        }
        //for price
        if (!price) {
            isFormValid = false;
            formErrors.priceError = 'Price is required';
        }
        //for quantity 
        if (!quantity) {
            isFormValid = false;
            formErrors.quantityError = 'Quantity is required';
        }
        //for  upload document 
        if (!files) {
            isFormValid = false;
            formErrors.uploadDocumentError = 'Document is required';
        }
        setFormErrors(formErrors)
        return isFormValid;
    }

    const deleteProduct = (id) => {
        const updateProduct = productList.filter((data) => {
            return id !== data.id;
        });
        alert('Product deleted successfully!')
        setProductList(updateProduct);
        window.location.reload();
        console.log('delete', id);
    }


    const renderTooltip = (props, id) => (
        <Tooltip id={id} {...props}>
            {props}
        </Tooltip>
    );

    const onFileChange = async (event) =>{
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setFiles(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    return (
        <div className='container p-3 my-3'>
            <Row >
                <h1 className='d-flex justify-content-center'> Add Product</h1>
                <Form
                    onSubmit={AddProduct}
                >
                    <Form.Group controlId='productName' as={Col} md="12">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            autoFocus
                            name='productName'
                            type="text"
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                        />
                        <span style={{ color: "red" }}>{formErrors.productNameError}</span>
                    </Form.Group>
                    <Form.Group controlId='price' as={Col} md="12">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            autoFocus
                            name='price'
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <span style={{ color: "red" }}>{formErrors.priceError}</span>
                    </Form.Group>
                    <Form.Group controlId='quantity' as={Col} md="12">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            autoFocus
                            name='quantity'
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                        />
                        <span style={{ color: "red" }}>{formErrors.quantityError}</span>
                    </Form.Group>
                        <Form.Group controlId='files' as={Col} md="12">
                            <Form.Label>Upload Document</Form.Label>
                            <Form.Control
                                autoFocus
                                name='files'
                                type="file"
                                onChange={onFileChange}
                                // accept="image/*"
                                accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                            />
                            <span style={{ color: "red" }}>{formErrors.uploadDocumentError}</span>
                        </Form.Group>
                    {
                        toggleBtn ? <Row className='d-flex justify-content-center'>
                            <Col className='col-md-6 d-flex justify-content-center'><Button size="lg" className='mt-3 mb-2' type="submit"
                            >
                                Add Product
                            </Button></Col>

                        </Row> :
                            <Row className='d-flex justify-content-center'>
                                <Col className='col-md-6 d-flex justify-content-center'><Button size="lg" className='mt-3 mb-2' type="submit"
                                >
                                    Edit Product
                                </Button></Col>

                            </Row>
                    }
                </Form>
            </Row>
            {/* <Row className='d-flex justify-content-center'>{files.map(f => {
                return (
                    <div className='d-flex justify-content-center'>

                        <img src={f.url} height="100" width="100" alt='img' />
                    </div>
                );
            })}</Row> */}
            <Row >
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Quantity</th>
                            <th >Document</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.length > 0 && productList.map(x =>
                            <tr key={x.id}>
                                <td>{x.productName}</td>
                                <td>{x.price}</td>
                                <td>{x.quantity}</td>
                                <td className='document'>{x.files}</td>

                                {roleName !== 'User' && ( 
                                <td >
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 50, hide: 40 }}
                                        overlay={renderTooltip('Edit', 'Edit')}
                                    >
                                        <img className='image-icon' src={editIcon} alt='edit icon' onClick={() => onEdit(x.id)} />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 50, hide: 40 }}
                                        overlay={renderTooltip('Delete', 'Delete')}
                                    >
                                        <img className='image-icon' src={deleteIcon} alt='delete icon' onClick={() => deleteProduct(x.id)} />
                                    </OverlayTrigger>

                                </td>
                                 )} 
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </div>
    )
}
