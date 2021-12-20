import React, {useState} from 'react'
import MaterialTable from 'material-table'
import InfoIcon from '@material-ui/icons/Info'
import Modal from '../Modal/Modal'
import {useDispatch, useSelector} from 'react-redux'
import {getPopularProducts, getTopProduct, editProduct} from '../../app/reducers/products'

export default function ProductTable({products}) {
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState({});
    const dispatch = useDispatch()
    console.log('products', products);

    const seeDetails = (selectedProduct) => {
        setProduct(selectedProduct)
        setOpen(true)
    }

    return (
        <div>
         {open &&  
            <Modal product={product} openModal = {()=>setOpen(true)} closeModal={()=>setOpen(false)} />   
        }
        <MaterialTable
          columns={[
            { title: 'Name', field: 'ProductName' },
            // { title: 'Product #', field: 'ProductNumber' },
            { title: 'Original Price', field: 'OriginalPrice', type: 'currency', align:'left' },
            { title: 'Current Price', field: 'Price', type: 'currency', align:'left' },
            { title: 'Condition', field: 'Condition'},
            // { title: 'SKU', field: 'SKU'},
            { title: 'Gross Sales', field: 'grossSales', editable: 'never'}
          ]}
          actions={[
            {
              icon: InfoIcon,
              tooltip: 'See Details',
              onClick: (event, rowData) => {
                // Open details modal
                seeDetails(rowData);
              }
            }
          ]}
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
                // Update the product

                let editedProduct = {...rowData, [columnDef.field]: newValue}
                // let editedProduct = {
                //     id: rowData._id,
                //     ProductName: rowData.ProductName,
                //     OriginalPrice: rowData.OriginalPrice,
                // }
                // editedProduct[columnDef.field] = newValue
                dispatch(editProduct(editedProduct));
            }
        }}
          data={products}
          title="Popular Products"
        />
      </div>
    )
}
