import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaFilePdf, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
//import { useGetProductsQuery } from '../../redux/api/productsApiSlice';
//import { useDeleteProductMutation } from '../../redux/api/adminApiSlice';
//import Loader from '../../components/Loader';
//import Message from '../../components/Message';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ProductList = () => {
    // 1. State for the search term input
    const [searchTerm, setSearchTerm] = useState('');
    // 2. State for the debounced search term that will be sent to the API
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const { data: products, isLoading, error } = useGetProductsQuery({ keyword: debouncedSearchTerm });
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const navigate = useNavigate();

    // 3. Debounce effect: waits 300ms after user stops typing to update the search term for the API call
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        // Cleanup function to cancel the timeout if the user types again
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const createProductHandler = () => {
        navigate('/admin/product/create');
    };

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Product deleted successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const generateReport = () => {
        if (!products || products.length === 0) {
            toast.info('No products available to generate a report.');
            return;
        }

        try {
            const doc = new jsPDF('landscape');
            
            doc.setFontSize(18);
            doc.text('Tech Store - Product Inventory Report', 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);
            const reportDate = `Generated on: ${new Date().toLocaleDateString('en-LK')}`;
            doc.text(reportDate, 14, 29);

            const tableColumn = ['ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', 'IN STOCK'];
            
            const tableRows = products.map(p => [
                p._id,
                p.name,
                `Rs: ${p.price.toFixed(2)}`,
                p.category,
                p.brand,
                p.countInStock
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 35,
                headStyles: { fillColor: [37, 99, 235] },
                styles: { font: 'helvetica', fontSize: 9 },
            });

            const fileName = `Product_Report_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            toast.success('Report download started!');

        } catch (err) {
            console.error("PDF Generation Error: ", err);
            toast.error('Failed to generate PDF report.');
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="text-3xl font-bold">Products</h1>
                {/* 4. Search input field added */}
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute top-3 left-3 text-gray-400" />
                </div>
                <div className="flex gap-2">
                    <button onClick={createProductHandler} className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                        <FaPlus className="mr-2" /> Add Product
                    </button>
                    <button onClick={generateReport} className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-green-700 transition-colors">
                        <FaFilePdf className="mr-2" /> Generate Report
                    </button>
                </div>
            </div>

            {isDeleting && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">ID</th>
                                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Name</th>
                                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Price</th>
                                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Category</th>
                                <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Brand</th>
                                <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {products.map(product => (
                                <tr key={product._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4" title={product._id}>{product._id.substring(0, 12)}...</td>
                                    <td className="py-3 px-4">{product.name}</td>
                                    <td className="py-3 px-4">Rs: {product.price.toFixed(2)}</td>
                                    <td className="py-3 px-4">{product.category}</td>
                                    <td className="py-3 px-4">{product.brand}</td>
                                    <td className="py-3 px-4 flex items-center justify-center space-x-2">
                                        <button onClick={() => navigate(`/admin/product/${product._id}/edit`)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => deleteProductHandler(product._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;
